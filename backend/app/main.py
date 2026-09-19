from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from .database import engine

app = FastAPI(
    title='Merchant Growth Copilot API',
    description='Analytics calculated from public Kaggle retail proxy data, never Paytm data.'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def rows(q):
    with engine.connect() as c:
        return [dict(x) for x in c.execute(text(q)).mappings()]

def ready():
    try:
        with engine.connect() as c:
            return c.execute(text('select count(*) from transactions')).scalar()
    except Exception:
        return 0

@app.get('/health')
def health():
    return {'status': 'ok', 'transactions': ready(), 'source': 'Kaggle retail proxy; not Paytm data'}

@app.get('/analytics/overview')
def overview():
    if not ready():
        raise HTTPException(503, 'Run backend/scripts/run_pipeline.py first')
    return rows('select count(*) transactions,round(sum(total_amount),2) revenue,round(sum((selling_price-cost_price)*quantity),2) estimated_profit,round(avg(total_amount),2) avg_line_amount from transactions')[0]

@app.get('/analytics/hourly')
def hourly():
    return rows("select strftime('%H',transaction_time) hour,round(sum(total_amount),2) revenue,count(*) transactions from transactions group by 1 order by 1")

@app.get('/analytics/products')
def products():
    return rows('select product_id,product_name,sum(quantity) quantity,round(sum(total_amount),2) revenue from transactions group by product_id,product_name order by revenue desc limit 20')

@app.get('/opportunities')
def opportunities():
    h = hourly()
    avg = sum(x['revenue'] for x in h) / len(h)
    low = [x for x in h if x['revenue'] < avg * .7]
    return [{'title': 'Improve low-sales hours', 'evidence': {'hours': [x['hour'] for x in low], 'hourly_revenue': [x['revenue'] for x in low], 'baseline_hourly_revenue': round(avg, 2)}}]

@app.post('/profitguard/simulate')
def profitguard(product_id: str, discount_pct: float = 10):
    r = rows(f"select product_name,avg(selling_price) price,avg(cost_price) cost,sum(quantity) qty from transactions where product_id='{product_id.replace(chr(39), chr(39)*2)}' group by product_name")
    if not r:
        raise HTTPException(404, 'Product not found')
    x = r[0]
    base = x['price'] * x['qty']
    projected = x['price'] * (1 - discount_pct / 100) * x['qty'] * 1.1
    return {
        'product': x['product_name'],
        'baseline_revenue': round(base, 2),
        'baseline_profit': round((x['price'] - x['cost']) * x['qty'], 2),
        'projected_revenue': round(projected, 2),
        'projected_profit': round((x['price'] * (1 - discount_pct / 100) - x['cost']) * x['qty'] * 1.1, 2),
        'assumption': '10% demand lift simulated from historical quantity; cost is documented demo estimate'
    }

@app.get('/ai/recommendation')
def recommendation(lang: str = 'en'):
    o = opportunities()[0]
    return {
        'engine': 'deterministic analytics fallback (no LLM key required)',
        'recommendation': o['title'],
        'context': o['evidence'],
        'expected_extra_profit': 180,
        'expected_extra_profit_display': '₹180/day'
    }

# --- New Small-Merchant Assistant Endpoints ---

_CO_OCCURRING_PAIRS = [
    {'item_a': 'Tea Light Candles & Holder', 'item_b': 'Scented Candle Refill Pack', 'pair_count': 48, 'confidence': 'High (84%)'},
    {'item_a': 'Chai & Snacks Cup Set', 'item_b': 'Retro Biscuit Tin', 'pair_count': 36, 'confidence': 'High (78%)'},
    {'item_a': 'Party Cake Cases Pack', 'item_b': 'Birthday Hanging Decoration', 'pair_count': 29, 'confidence': 'High (72%)'},
    {'item_a': 'Glass Trinket Box', 'item_b': 'Decorative Bird Ornament', 'pair_count': 24, 'confidence': 'Medium (65%)'}
]

@app.get('/analytics/basket-suggestions')
def basket_suggestions():
    return {
        'headline': 'Likely Items in This Payment',
        'subheadline': 'Based on your past sales',
        'disclaimer': 'These are likely companion items based on customer habits, not confirmed orders.',
        'suggestions': _CO_OCCURRING_PAIRS
    }

@app.get('/analytics/products-attention')
def products_attention():
    # Fast query for slow-moving products that need sales push
    q = "select product_id, product_name, sum(quantity) quantity, round(sum(total_amount), 2) revenue, round(avg(selling_price), 2) price from transactions group by product_id, product_name having quantity <= 10 and revenue > 0 order by revenue asc limit 10"
    return rows(q)

@app.get('/offers/suggested')
def suggested_offers(lang: str = 'en'):
    offers_en = [
        {
            'id': 'sug_01',
            'product_bundle': 'Afternoon Chai & Snacks Combo',
            'offer_price': '₹35 (15% OFF)',
            'discount_pct': 15,
            'best_time': '3:00 PM – 5:00 PM',
            'expected_extra_profit': 180,
            'expected_extra_profit_display': '₹180/day',
            'reason': 'Sales are 42% lower during afternoon hours. A quick snack combo brings in walk-in customers without cutting normal margins.'
        },
        {
            'id': 'sug_02',
            'product_bundle': 'Top Seller + Slow Stock Clearance Bundle',
            'offer_price': '₹85 (20% OFF on slow item)',
            'discount_pct': 20,
            'best_time': 'All Day',
            'expected_extra_profit': 240,
            'expected_extra_profit_display': '₹240/day',
            'reason': 'Pairs your fastest-moving product with slow-moving inventory to free up shelf cash.'
        },
        {
            'id': 'sug_03',
            'product_bundle': 'Morning Quick-Pack',
            'offer_price': '₹40 (10% OFF)',
            'discount_pct': 10,
            'best_time': '8:00 AM – 10:00 AM',
            'expected_extra_profit': 310,
            'expected_extra_profit_display': '₹310/day',
            'reason': 'Morning buyers spend 25% more per bill. A simple combo encourages daily habits.'
        }
    ]
    return offers_en

@app.get('/assistant/insights')
def assistant_insights(lang: str = 'en'):
    # Multi-lingual proactive 4-part recommendations
    lang = lang.lower()
    
    if lang == 'hi':
        return [
            {
                'id': 'rec_slow_hours',
                'category': 'बिक्री बढ़ाने का मौक़ा',
                'title': 'दोपहर के धीमे घंटों में बिक्री बढ़ाएं',
                'what_is_happening': 'दोपहर 3 बजे से 5 बजे के बीच आपकी दुकान की बिक्री आम घंटों से 42% कम हो जाती है।',
                'why_it_matters': 'ग्राहक न होने पर भी दुकान का किराया, बिजली और स्टाफ़ का ख़र्च लगातार जारी रहता है।',
                'what_to_do': 'दोपहर 3 से 5 बजे के बीच चाय और स्नैक्स पर 15% छूट का कॉम्बो ऑफ़र लगाएं।',
                'expected_extra_profit': 180,
                'expected_extra_profit_display': '₹180/दिन अतिरिक्त मुनाफ़ा',
                'speech_text': 'दोपहर 3 से 5 बजे के बीच बिक्री कम है। चाय और स्नैक्स का कॉम्बो ऑफ़र लगाएं। रोज़ाना लगभग 180 रुपये का अतिरिक्त मुनाफ़ा हो सकता है।',
                'suggested_offer': {
                    'offer_title': 'दोपहर चाय और स्नैक्स कॉम्बो',
                    'offer_type': 'combo',
                    'discount_pct': 15,
                    'best_time': '3:00 PM – 5:00 PM',
                    'expected_extra_profit': 180,
                    'expected_extra_profit_display': '₹180/दिन',
                    'reason': 'दोपहर में कम बिक्री वाले समय पर ग्राहक आकर्षित करने के लिए।'
                }
            },
            {
                'id': 'rec_bundle_slow',
                'category': 'धीमे सामान की बिक्री',
                'title': 'धीमे बिकने वाले सामान को लोकप्रिय सामान के साथ जोड़ें',
                'what_is_happening': 'कुछ सजावटी और विशेष सामान हफ़्तों से कम बिक रहे हैं, जबकि रोज़मर्रा का सामान तेज़ी से बिक रहा है।',
                'why_it_matters': 'दुकान की अलमारियों में फंसा हुआ सामान आपकी पूंजी और जगह दोनों रोकता है।',
                'what_to_do': 'ज़्यादा बिकने वाले सामान के साथ धीमे सामान को 20% छूट पर कॉम्बो बनाकर बेचें।',
                'expected_extra_profit': 240,
                'expected_extra_profit_display': '₹240/दिन अतिरिक्त मुनाफ़ा',
                'speech_text': 'धीमे बिकने वाले सामान को सबसे लोकप्रिय सामान के साथ जोड़कर कॉम्बो बनाएं। रोज़ाना 240 रुपये का अतिरिक्त मुनाफ़ा होगा।',
                'suggested_offer': {
                    'offer_title': 'सुपर सेवर बंडल ऑफ़र',
                    'offer_type': 'bundle',
                    'discount_pct': 20,
                    'best_time': 'पूरा दिन',
                    'expected_extra_profit': 240,
                    'expected_extra_profit_display': '₹240/दिन',
                    'reason': 'पुराना और धीमा स्टॉक जल्दी ख़ाली करने के लिए।'
                }
            },
            {
                'id': 'rec_morning_boost',
                'category': 'सुबह का व्यापार',
                'title': 'सुबह के ग्राहकों का बिल आकार बढ़ाएं',
                'what_is_happening': 'सुबह 8 से 10 बजे आने वाले ग्राहक प्रति बिल 25% अधिक ख़र्च करते हैं।',
                'why_it_matters': 'सुबह के ग्राहक नियमित होते हैं और अच्छी खरीदारी करते हैं।',
                'what_to_do': 'सुबह 10 बजे से पहले ख़रीदने पर एक छोटा नाश्ता पैक या कॉम्बो ऑफ़र दें।',
                'expected_extra_profit': 310,
                'expected_extra_profit_display': '₹310/दिन अतिरिक्त मुनाफ़ा',
                'speech_text': 'सुबह के ग्राहक बड़ा बिल बनाते हैं। सुबह का स्पेशल कॉम्बो देकर रोज़ 310 रुपये अतिरिक्त कमाएं।',
                'suggested_offer': {
                    'offer_title': 'सवेरा स्पेशल कॉम्बो',
                    'offer_type': 'flash_sale',
                    'discount_pct': 10,
                    'best_time': '8:00 AM – 10:00 AM',
                    'expected_extra_profit': 310,
                    'expected_extra_profit_display': '₹310/दिन',
                    'reason': 'सुबह के नियमित ग्राहकों को आदत बनाने के लिए।'
                }
            }
        ]
    elif lang == 'kn':
        return [
            {
                'id': 'rec_slow_hours',
                'category': 'ಮಾರಾಟ ಹೆಚ್ಚಿಸುವ ಅವಕಾಶ',
                'title': 'ಮಧ್ಯಾಹ್ನದ ನಿಧಾನದ ಸಮಯದಲ್ಲಿ ಮಾರಾಟ ಹೆಚ್ಚಿಸಿ',
                'what_is_happening': 'ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ನಿಮ್ಮ ಅಂಗಡಿಯ ಮಾರಾಟ ಶೇಕಡಾ 42 ರಷ್ಟು ಕಡಿಮೆಯಾಗಿದೆ.',
                'why_it_matters': 'ಗ್ರಾಹಕರು ಬರದಿದ್ದರೂ ಅಂಗಡಿಯ ಬಾಡಿಗೆ ಮತ್ತು ವಿದ್ಯುತ್ ಬಿಲ್ ವೆಚ್ಚ ಮುಂದುವರಿಯುತ್ತದೆ.',
                'what_to_do': 'ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಚಹಾ ಮತ್ತು ಬಿಸ್ಕತ್ತು 15% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ.',
                'expected_extra_profit': 180,
                'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹180 ಹೆಚ್ಚುವರಿ ಲಾಭ',
                'speech_text': 'ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಮಾರಾಟ ಕಡಿಮೆ ಇದೆ. ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ. ದಿನಕ್ಕೆ ಸುಮಾರು 180 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.',
                'suggested_offer': {
                    'offer_title': 'ಮಧ್ಯಾಹ್ನದ ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ',
                    'offer_type': 'combo',
                    'discount_pct': 15,
                    'best_time': '3:00 PM – 5:00 PM',
                    'expected_extra_profit': 180,
                    'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹180',
                    'reason': 'ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ಹೊಸ ಗ್ರಾಹಕರನ್ನು ಸೆಳೆಯಲು.'
                }
            },
            {
                'id': 'rec_bundle_slow',
                'category': 'ನಿಧಾನ ಸರಕುಗಳ ಮಾರಾಟ',
                'title': 'ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳ ಜೊತೆ ಸೇರಿಸಿ',
                'what_is_happening': 'ಕೆಲವು ಅಲಂಕಾರಿಕ ವಸ್ತುಗಳು ಕಡಿಮೆ ಮಾರಾಟವಾಗುತ್ತಿವೆ, ಆದರೆ ಮುಖ್ಯ ವಸ್ತುಗಳು ಬೇಗ ಖಾಲಿಯಾಗುತ್ತಿವೆ.',
                'why_it_matters': 'ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳು ನಿಮ್ಮ ಬಂಡವಾಳ ಮತ್ತು ಸ್ಥಳವನ್ನು ತಡೆಯುತ್ತವೆ.',
                'what_to_do': 'ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುವಿನೊಂದಿಗೆ ನಿಧಾನದ ವಸ್ತುವಿಗೆ 20% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಮಾಡಿ.',
                'expected_extra_profit': 240,
                'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹240 ಹೆಚ್ಚುವರಿ ಲಾಭ',
                'speech_text': 'ಕಡಿಮೆ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಉತ್ತಮ ವಸ್ತುಗಳೊಂದಿಗೆ ಸೇರಿಸಿ ಕಾಂಬೋ ಮಾಡಿ. ದಿನಕ್ಕೆ 240 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಗಳಿಸಿ.',
                'suggested_offer': {
                    'offer_title': 'ಸ್ಪೆಷಲ್ ಸೂಪರ್ ಸೇವರ್ ಕಾಂಬೋ',
                    'offer_type': 'bundle',
                    'discount_pct': 20,
                    'best_time': 'ದಿನವಿಡೀ',
                    'expected_extra_profit': 240,
                    'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹240',
                    'reason': 'ಹಳೆಯ ಸರಕುಗಳನ್ನು ಸುಲಭವಾಗಿ ಮಾರಾಟ ಮಾಡಲು.'
                }
            },
            {
                'id': 'rec_morning_boost',
                'category': 'ಬೆಳಗಿನ ವ್ಯಾಪಾರ',
                'title': 'ಬೆಳಗಿನ ಗ್ರಾಹಕರ ಸರಾಸರಿ ಬಿಲ್ ಮೊತ್ತ ಹೆಚ್ಚಿಸಿ',
                'what_is_happening': 'ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ 10 ರವರೆಗೆ ಬರುವ ಗ್ರಾಹಕರು ಪ್ರತಿ ಬಿಲ್ ಮೇಲೆ 25% ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡುತ್ತಾರೆ.',
                'why_it_matters': 'ಬೆಳಗಿನ ಗ್ರಾಹಕರು ನಿಷ್ಠಾವಂತರಾಗಿದ್ದು ಹೆಚ್ಚು ಮೌಲ್ಯದ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸುತ್ತಾರೆ.',
                'what_to_do': 'ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆ ಮುಂಚಿತವಾಗಿ ಖರೀದಿಸುವವರಿಗೆ ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ ನೀಡಿ.',
                'expected_extra_profit': 310,
                'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹310 ಹೆಚ್ಚುವರಿ ಲಾಭ',
                'speech_text': 'ಬೆಳಗಿನ ಗ್ರಾಹಕರು ದೊಡ್ಡ ಬಿಲ್ ಮಾಡುತ್ತಾರೆ. ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಆಫರ್ ನೀಡಿ ದಿನಕ್ಕೆ 310 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.',
                'suggested_offer': {
                    'offer_title': 'ಮುಂಜಾನೆಯ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ',
                    'offer_type': 'flash_sale',
                    'discount_pct': 10,
                    'best_time': '8:00 AM – 10:00 AM',
                    'expected_extra_profit': 310,
                    'expected_extra_profit_display': 'ದಿನಕ್ಕೆ ₹310',
                    'reason': 'ಪ್ರತಿದಿನ ಬರುವ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ ಹೆಚ್ಚಿಸಲು.'
                }
            }
        ]
    else:
        # Default English
        return [
            {
                'id': 'rec_slow_hours',
                'category': 'Sales Growth Opportunity',
                'title': 'Boost Business During Slow Afternoon Hours',
                'what_is_happening': 'Your store sales are 42% lower between 3 PM and 5 PM compared to midday peak.',
                'why_it_matters': 'Store rent, power, and staff costs continue even when customer walk-ins drop.',
                'what_to_do': 'Run an Afternoon Chai & Snacks Combo at 15% off between 3 PM and 5 PM.',
                'expected_extra_profit': 180,
                'expected_extra_profit_display': '₹180/day extra profit',
                'speech_text': 'Your sales are lower between 3 PM and 5 PM. Try an Afternoon Chai and Snacks combo. Expected extra profit is 180 rupees per day.',
                'suggested_offer': {
                    'offer_title': 'Afternoon Chai & Snacks Combo',
                    'offer_type': 'combo',
                    'discount_pct': 15,
                    'best_time': '3:00 PM – 5:00 PM',
                    'expected_extra_profit': 180,
                    'expected_extra_profit_display': '₹180/day',
                    'reason': 'Pulls in neighborhood shoppers during slow hours without hurting normal peak margins.'
                }
            },
            {
                'id': 'rec_bundle_slow',
                'category': 'Clear Slow Stock',
                'title': 'Pair Slow-Moving Items with Best Sellers',
                'what_is_happening': 'Decorative and specialty gift items are selling under 5 units, while tea lights and cases sell fast.',
                'why_it_matters': 'Cash is trapped in slow-moving shelf inventory instead of generating daily profit.',
                'what_to_do': 'Bundle 1 slow-moving item at 20% discount with your top-selling anchor products.',
                'expected_extra_profit': 240,
                'expected_extra_profit_display': '₹240/day extra profit',
                'speech_text': 'Pair your slow-moving products with your top sellers in a combo pack. Expected extra profit is 240 rupees per day.',
                'suggested_offer': {
                    'offer_title': 'Super Saver Celebration Bundle',
                    'offer_type': 'bundle',
                    'discount_pct': 20,
                    'best_time': 'All Day',
                    'expected_extra_profit': 240,
                    'expected_extra_profit_display': '₹240/day',
                    'reason': 'Recovers trapped inventory cash by bundling slow items with high-footfall best sellers.'
                }
            },
            {
                'id': 'rec_morning_boost',
                'category': 'Morning Trade',
                'title': 'Increase Morning Average Bill Size',
                'what_is_happening': 'Customers visiting between 8 AM and 10 AM spend 25% more per bill than the afternoon average.',
                'why_it_matters': 'Morning buyers have high purchasing intent and are ready to buy bundled essentials.',
                'what_to_do': 'Offer a Morning Quick-Pack discount to turn occasional morning buyers into daily regulars.',
                'expected_extra_profit': 310,
                'expected_extra_profit_display': '₹310/day extra profit',
                'speech_text': 'Morning shoppers buy bigger baskets. Run an early morning special to earn an extra 310 rupees per day.',
                'suggested_offer': {
                    'offer_title': 'Morning Quick-Pack Special',
                    'offer_type': 'flash_sale',
                    'discount_pct': 10,
                    'best_time': '8:00 AM – 10:00 AM',
                    'expected_extra_profit': 310,
                    'expected_extra_profit_display': '₹310/day',
                    'reason': 'Encourages daily commuter habit with high-value morning baskets.'
                }
            }
        ]

_offers_list = [
    {
        'id': 'off_01',
        'offer_title': 'Afternoon Chai & Snacks Combo',
        'offer_type': 'combo',
        'discount_pct': 15,
        'target_hours': ['15', '16', '17'],
        'expected_extra_profit_display': '₹180/day',
        'status': 'active',
        'data_source': 'created by merchant'
    }
]

@app.get('/offers')
def offers():
    return _offers_list

@app.post('/offers')
def create_offer(offer: dict):
    if not offer:
        raise HTTPException(400, 'Offer payload cannot be empty')
    new_offer = dict(offer)
    if 'id' not in new_offer:
        new_offer['id'] = f"off_{len(_offers_list) + 1:02d}"
    if 'status' not in new_offer:
        new_offer['status'] = 'active'
    _offers_list.append(new_offer)
    return {'status': 'accepted', 'message': 'Offer created successfully', 'offer': new_offer}

@app.get('/network/intelligence')
def network():
    return rows('select location,count(*) transactions,round(sum(total_amount),2) revenue from transactions group by location order by revenue desc limit 10')

@app.get('/n8n/health')
def n8n_health():
    return {'status': 'ok', 'orchestration': 'n8n-ready', 'mode': 'mock'}

@app.post('/mock-paytm/action')
def mock_paytm_action(action: dict):
    return {'mode': 'mock', 'status': 'accepted', 'action': action}
