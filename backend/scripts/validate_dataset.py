from pathlib import Path
import pandas as pd
P=Path(__file__).resolve().parents[1]/'data/processed/transactions.csv'; R='transaction_id merchant_id customer_id transaction_date transaction_time product_id product_name category quantity selling_price cost_price discount total_amount payment_method location'.split()
def main():
 d=pd.read_csv(P); e=[]
 if x:=set(R)-set(d): e.append(f'Missing columns: {sorted(x)}')
 if d.transaction_id.duplicated().any(): e.append('Duplicate transaction IDs')
 if d[R].isna().any().any(): e.append('Missing required values')
 if (pd.to_numeric(d.quantity)<=0).any(): e.append('Non-positive quantity')
 if (d[['selling_price','cost_price','total_amount']].apply(pd.to_numeric)<0).any().any(): e.append('Negative monetary value')
 if pd.to_datetime(d.transaction_date,errors='coerce').isna().any(): e.append('Invalid dates')
 print(f'Validation report: rows={len(d):,}; duplicate_rows={d.duplicated().sum()}; errors={len(e)}')
 if e: raise SystemExit('VALIDATION FAILED: '+'; '.join(e))
 print('VALIDATION PASSED')
if __name__=='__main__': main()
