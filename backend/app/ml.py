import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Any, Optional
from sklearn.ensemble import RandomForestClassifier
from backend.app.database import query_df

class BasketInferenceEngine:
    _instance = None

    def __init__(self):
        self.clf = None
        self.classes_ = None
        self.feature_names = ["amount_inr", "hour", "day_of_week", "is_weekend", "segment_code"]
        self.segment_map = {"occasional": 0, "regular": 1, "new": 2}
        self.catalog_map = {}
        self.is_trained = False
        self._train()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def _train(self):
        # Load catalog for price & product metadata
        df_cat = query_df("SELECT product_id, product_name, selling_price, cost_price FROM catalog")
        for _, r in df_cat.iterrows():
            self.catalog_map[r["product_id"]] = {
                "product_name": r["product_name"],
                "selling_price": float(r["selling_price"]),
                "cost_price": float(r["cost_price"]),
            }

        # Load known orders grouped by transaction
        orders = query_df("SELECT transaction_id, product_id, quantity, line_total FROM merchant_orders")
        baskets = orders.groupby("transaction_id")["product_id"].apply(
            lambda s: "+".join(sorted(s))
        ).reset_index()
        baskets.columns = ["transaction_id", "basket"]

        # Merge with UPI transactions and customers
        upi = query_df(
            "SELECT transaction_id, amount_inr, timestamp, customer_id_hash "
            "FROM upi_transactions WHERE status = 'SUCCESS'"
        )
        cust = query_df("SELECT customer_id_hash, segment FROM customers")

        df = pd.merge(upi, baskets, on="transaction_id")
        df = pd.merge(df, cust, on="customer_id_hash", how="left")

        df["timestamp"] = pd.to_datetime(df["timestamp"])
        df["hour"] = df["timestamp"].dt.hour
        df["day_of_week"] = df["timestamp"].dt.dayofweek
        df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)
        df["segment_code"] = df["segment"].map(self.segment_map).fillna(0)

        X = df[self.feature_names]
        y = df["basket"]

        self.clf = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=12)
        self.clf.fit(X, y)
        self.classes_ = list(self.clf.classes_)
        self.is_trained = True

    def infer_basket(
        self,
        amount_inr: float,
        hour: int = 12,
        day_of_week: int = 2,
        customer_segment: str = "occasional",
    ) -> Dict[str, Any]:
        if not self.is_trained:
            self._train()

        is_weekend = 1 if day_of_week in [5, 6] else 0
        seg_code = self.segment_map.get(customer_segment, 0)
        X_df = pd.DataFrame(
            [[amount_inr, hour, day_of_week, is_weekend, seg_code]],
            columns=self.feature_names
        )

        pred_basket = self.clf.predict(X_df)[0]
        probs = self.clf.predict_proba(X_df)[0]
        best_idx = np.argmax(probs)
        confidence = float(probs[best_idx])

        # Convert basket string like "P001+P005" to product list
        pids = pred_basket.split("+")
        items = []
        for pid in pids:
            meta = self.catalog_map.get(pid, {"product_name": pid, "selling_price": 0.0, "cost_price": 0.0})
            items.append({
                "product_id": pid,
                "product_name": meta["product_name"],
                "quantity": 1,
                "unit_price": meta["selling_price"],
                "cost_price": meta["cost_price"],
                "line_total": meta["selling_price"],
            })

        # Top 3 alternatives with probabilities
        top_indices = np.argsort(probs)[::-1][:3]
        alternatives = [
            {"basket": self.classes_[i], "confidence": round(float(probs[i]), 3)}
            for i in top_indices if probs[i] > 0.05
        ]

        return {
            "predicted_basket": pred_basket,
            "product_ids": pids,
            "items": items,
            "confidence": round(confidence, 3),
            "alternatives": alternatives,
        }

    def get_transaction_details(self, transaction_id: str) -> Dict[str, Any]:
        # First check merchant_orders
        exact_orders = query_df(
            "SELECT o.order_id, o.transaction_id, o.product_id, o.quantity, o.unit_price, o.line_total, "
            "c.product_name, c.cost_price "
            "FROM merchant_orders o JOIN catalog c ON o.product_id = c.product_id "
            "WHERE o.transaction_id = :tid",
            params={"tid": transaction_id}
        )

        if not exact_orders.empty:
            items = []
            for _, r in exact_orders.iterrows():
                items.append({
                    "product_id": r["product_id"],
                    "product_name": r["product_name"],
                    "quantity": int(r["quantity"]),
                    "unit_price": float(r["unit_price"]),
                    "cost_price": float(r["cost_price"]),
                    "line_total": float(r["line_total"]),
                })
            return {
                "transaction_id": transaction_id,
                "source": "exact_merchant_orders",
                "inferred": False,
                "confidence": 1.0,
                "items": items,
            }

        # Otherwise infer via ML
        txn = query_df(
            "SELECT t.transaction_id, t.amount_inr, t.timestamp, t.customer_id_hash, c.segment "
            "FROM upi_transactions t LEFT JOIN customers c ON t.customer_id_hash = c.customer_id_hash "
            "WHERE t.transaction_id = :tid",
            params={"tid": transaction_id}
        )

        if txn.empty:
            return {"error": f"Transaction {transaction_id} not found"}

        row = txn.iloc[0]
        ts = pd.to_datetime(row["timestamp"])
        hour = ts.hour
        dow = ts.dayofweek
        seg = row["segment"] if pd.notna(row["segment"]) else "occasional"

        inference = self.infer_basket(
            amount_inr=float(row["amount_inr"]),
            hour=hour,
            day_of_week=dow,
            customer_segment=seg
        )

        return {
            "transaction_id": transaction_id,
            "source": "random_forest_inference",
            "inferred": True,
            "confidence": inference["confidence"],
            "predicted_basket": inference["predicted_basket"],
            "items": inference["items"],
            "alternatives": inference["alternatives"],
        }
