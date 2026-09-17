from sqlalchemy import Date, Float, Integer, String, Time
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base
class Transaction(Base):
 __tablename__='transactions'
 transaction_id: Mapped[str]=mapped_column(String,primary_key=True)
 merchant_id: Mapped[str]=mapped_column(String,index=True)
 customer_id: Mapped[str]=mapped_column(String,index=True)
 transaction_date: Mapped[object]=mapped_column(Date)
 transaction_time: Mapped[object]=mapped_column(Time)
 product_id: Mapped[str]=mapped_column(String,index=True)
 product_name: Mapped[str]=mapped_column(String)
 category: Mapped[str]=mapped_column(String)
 quantity: Mapped[int]=mapped_column(Integer)
 selling_price: Mapped[float]=mapped_column(Float)
 cost_price: Mapped[float]=mapped_column(Float)
 discount: Mapped[float]=mapped_column(Float)
 total_amount: Mapped[float]=mapped_column(Float)
 payment_method: Mapped[str]=mapped_column(String)
 location: Mapped[str]=mapped_column(String)
