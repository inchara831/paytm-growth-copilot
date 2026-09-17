from fastapi import FastAPI,HTTPException
from sqlalchemy import text
from .database import engine
app=FastAPI(title='Merchant Growth Copilot API',description='Analytics calculated from public Kaggle retail proxy data, never Paytm data.')
def rows(q):
 with engine.connect() as c:return [dict(x) for x in c.execute(text(q)).mappings()]
def ready():
 try:
  with engine.connect() as c:return c.execute(text('select count(*) from transactions')).scalar()
 except Exception:return 0
@app.get('/health')
def health(): return {'status':'ok','transactions':ready(),'source':'Kaggle retail proxy; not Paytm data'}
@app.get('/analytics/overview')
def overview():
 if not ready(): raise HTTPException(503,'Run backend/scripts/run_pipeline.py first')
 return rows('select count(*) transactions,round(sum(total_amount),2) revenue,round(sum((selling_price-cost_price)*quantity),2) estimated_profit,round(avg(total_amount),2) avg_line_amount from transactions')[0]
@app.get('/analytics/hourly')
def hourly(): return rows("select strftime('%H',transaction_time) hour,round(sum(total_amount),2) revenue,count(*) transactions from transactions group by 1 order by 1")
@app.get('/analytics/products')
def products(): return rows('select product_id,product_name,sum(quantity) quantity,round(sum(total_amount),2) revenue from transactions group by product_id,product_name order by revenue desc limit 20')
@app.get('/opportunities')
def opportunities():
 h=hourly(); avg=sum(x['revenue'] for x in h)/len(h); low=[x for x in h if x['revenue']<avg*.7]; return [{'title':'Improve low-sales hours','evidence':{'hours':[x['hour'] for x in low],'hourly_revenue':[x['revenue'] for x in low],'baseline_hourly_revenue':round(avg,2)}}]
@app.post('/profitguard/simulate')
def profitguard(product_id:str,discount_pct:float=10):
 r=rows(f"select product_name,avg(selling_price) price,avg(cost_price) cost,sum(quantity) qty from transactions where product_id='{product_id.replace(chr(39),chr(39)*2)}' group by product_name")
 if not r: raise HTTPException(404,'Product not found')
 x=r[0]; base=x['price']*x['qty']; projected=x['price']*(1-discount_pct/100)*x['qty']*1.1; return {'product':x['product_name'],'baseline_revenue':round(base,2),'baseline_profit':round((x['price']-x['cost'])*x['qty'],2),'projected_revenue':round(projected,2),'projected_profit':round((x['price']*(1-discount_pct/100)-x['cost'])*x['qty']*1.1,2),'assumption':'10% demand lift simulated from historical quantity; cost is documented demo estimate'}
@app.get('/ai/recommendation')
def recommendation():
 o=opportunities()[0]; return {'engine':'deterministic analytics fallback (no LLM key required)','recommendation':o['title'],'context':o['evidence']}
@app.get('/offers')
def offers(): return [{'offer_type':'discount','data_source':'historical product price/quantity; simulated only'}]
@app.get('/network/intelligence')
def network(): return rows('select location,count(*) transactions,round(sum(total_amount),2) revenue from transactions group by location order by revenue desc limit 10')
