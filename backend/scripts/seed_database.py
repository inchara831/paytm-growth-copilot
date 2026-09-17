from pathlib import Path
import sys
import pandas as pd
ROOT=Path(__file__).resolve().parents[1]; sys.path.insert(0,str(ROOT.parent))
from backend.app.database import Base,engine
from backend.app.models import Transaction
def main():
 p=ROOT/'data/processed/transactions.csv'
 if not p.exists(): raise SystemExit('Processed data absent; seed refused.')
 d=pd.read_csv(p,parse_dates=['transaction_date','transaction_time']); Base.metadata.drop_all(engine); Base.metadata.create_all(engine); d.to_sql('transactions',engine,if_exists='append',index=False,chunksize=5000); print(f'Seeded {len(d):,} transactions')
if __name__=='__main__': main()
