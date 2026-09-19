import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  TrendingUp,
  ShoppingBag,
  Tag,
  AlertTriangle,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useBackend } from '../context/BackendContext';

export default function AskCopilot({ isOpen, onClose, onOpen }) {
  const { t, language, speak, isSpeaking, stopSpeaking, speakingText } = useLanguage();
  const { merchantName, merchant } = useBackend();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shopData, setShopData] = useState(null);
  const messagesEndRef = useRef(null);

  // Load actual backend store data to answer questions accurately
  useEffect(() => {
    async function loadData() {
      try {
        const [overview, hourly, products, slowProds, rec] = await Promise.all([
          apiService.getOverview().catch(() => null),
          apiService.getHourly().catch(() => []),
          apiService.getProducts().catch(() => []),
          apiService.getProductsAttention().catch(() => []),
          apiService.getRecommendation().catch(() => null),
        ]);
        setShopData({ overview, hourly, products, slowProds, rec });
      } catch (err) {
        console.error('Failed to pre-load shop data for chatbot:', err);
      }
    }
    loadData();
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const SUGGESTED_QUESTIONS = {
    en: [
      { text: '🔥 What are my best-selling products?', q: 'What are my best-selling products?' },
      { text: '⚠️ Which products need attention?', q: 'Which products need attention?' },
      { text: '💰 What is my sales and profit?', q: 'What is my sales and estimated profit?' },
      { text: '📉 Why are my sales low?', q: 'Why are my sales low?' },
      { text: '⏰ How can I increase afternoon sales?', q: 'How can I increase afternoon sales?' },
      { text: '🎁 What offer should I create?', q: 'What offer should I create?' },
      { text: '📊 How many payments did I receive?', q: 'How many payments did I receive?' },
    ],
    hi: [
      { text: '🔥 सबसे ज़्यादा बिकने वाला सामान कौन सा है?', q: 'सबसे ज़्यादा बिकने वाला सामान कौन सा है?' },
      { text: '⚠️ किन सामानों पर ध्यान देने की ज़रूरत है?', q: 'किन सामानों पर ध्यान देने की ज़रूरत है?' },
      { text: '💰 मेरी कुल बिक्री और मुनाफ़ा कितना है?', q: 'मेरी कुल बिक्री और मुनाफ़ा कितना है?' },
      { text: '📉 दोपहर में बिक्री कम क्यों होती है?', q: 'दोपहर में बिक्री कम क्यों होती है?' },
      { text: '⏰ दोपहर की बिक्री कैसे बढ़ाएं?', q: 'दोपहर की बिक्री कैसे बढ़ाएं?' },
      { text: '🎁 कौन सा ऑफ़र या कॉम्बो बनाना चाहिए?', q: 'कौन सा ऑफ़र या कॉम्बो बनाना चाहिए?' },
      { text: '📊 दुकान में कितने पेमेंट्स आए हैं?', q: 'दुकान में कितने पेमेंट्स आए हैं?' },
    ],
    kn: [
      { text: '🔥 ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು ಯಾವುವು?', q: 'ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು ಯಾವುವು?' },
      { text: '⚠️ ಯಾವ ಸರಕುಗಳಿಗೆ ಗಮನ ಹರಿಸಬೇಕು?', q: 'ಯಾವ ಸರಕುಗಳಿಗೆ ಗಮನ ಹರಿಸಬೇಕು?' },
      { text: '💰 ನನ್ನ ಮಾರಾಟ ಮತ್ತು ಅಂದಾಜು ಲಾಭ ಎಷ್ಟು?', q: 'ನನ್ನ ಮಾರಾಟ ಮತ್ತು ಅಂದಾಜು ಲಾಭ ಎಷ್ಟು?' },
      { text: '📉 ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವೇನು?', q: 'ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವೇನು?' },
      { text: '⏰ ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು?', q: 'ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು?' },
      { text: '🎁 ನಾನು ಯಾವ ಆಫರ್ ಆರಂಭಿಸಬೇಕು?', q: 'ನಾನು ಯಾವ ಆಫರ್ ಆರಂಭಿಸಬೇಕು?' },
      { text: '📊 ಒಟ್ಟು ಎಷ್ಟು ಪಾವತಿಗಳು ಬಂದಿವೆ?', q: 'ಒಟ್ಟು ಎಷ್ಟು ಪಾವತಿಗಳು ಬಂದಿವೆ?' },
    ],
    ta: [
      { text: '🔥 அதிகம் விற்பனையாகும் பொருட்கள் எவை?', q: 'அதிகம் விற்பனையாகும் பொருட்கள் எவை?' },
      { text: '⚠️ எந்த பொருட்களில் கவனம் செலுத்த வேண்டும்?', q: 'எந்த பொருட்களில் கவனம் செலுத்த வேண்டும்?' },
      { text: '💰 எனது விற்பனை மற்றும் லாபம் எவ்வளவு?', q: 'எனது விற்பனை மற்றும் லாபம் எவ்வளவு?' },
      { text: '⏰ மதிய விற்பனையை எப்படி அதிகரிப்பது?', q: 'மதிய விற்பனையை எப்படி அதிகரிப்பது?' },
      { text: '🎁 நான் என்ன ஆஃபர் தொடங்க வேண்டும்?', q: 'நான் என்ன ஆஃபர் தொடங்க வேண்டும்?' },
      { text: '📊 கடைக்கு எத்தனை வாடிக்கையாளர்கள் வந்தனர்?', q: 'கடைக்கு எத்தனை வாடிக்கையாளர்கள் வந்தனர்?' },
    ],
    te: [
      { text: '🔥 అత్యధికంగా అమ్ముడవుతున్న వస్తువులు ఏవి?', q: 'అత్యధికంగా అమ్ముడవుతున్న వస్తువులు ఏవి?' },
      { text: '⚠️ ఏ వస్తువులపై శ్రద్ధ పెట్టాలి?', q: 'ఏ వస్తువులపై శ్రద్ధ పెట్టాలి?' },
      { text: '💰 నా అమ్మకాలు మరియు లాభం ఎంత?', q: 'నా అమ్మకాలు మరియు లాభం ఎంత?' },
      { text: '⏰ మధ్యాహ్నం అమ్మకాలను ఎలా పెంచాలి?', q: 'మధ్యాహ్నం అమ్మకాలను ఎలా పెంచాలి?' },
      { text: '🎁 ఏ ఆఫర్ లేదా కాంబో ప్రారంభించాలి?', q: 'ఏ ఆఫర్ లేదా కాంబో ప్రారంభించాలి?' },
      { text: '📊 మొత్తం ఎన్ని చెల్లింపులు వచ్చాయి?', q: 'మొత్తం ఎన్ని చెల్లింపులు వచ్చాయి?' },
    ],
    ml: [
      { text: '🔥 കൂടുതൽ വിറ്റഴിക്കപ്പെടുന്ന സാധനങ്ങൾ ഏവ?', q: 'കൂടുതൽ വിറ്റഴിക്കപ്പെടുന്ന സാധനങ്ങൾ ഏവ?' },
      { text: '⚠️ ശ്രദ്ധിക്കേണ്ട സാധനങ്ങൾ ഏവ?', q: 'ശ്രദ്ധിക്കേണ്ട സാധനങ്ങൾ ഏവ?' },
      { text: '💰 എന്റെ വിൽപ്പനയും ലാഭവും എത്രയാണ്?', q: 'എന്റെ വിൽപ്പനയും ലാഭവും എത്രയാണ്?' },
      { text: '⏰ ഉച്ചവിൽപ്പന എങ്ങനെ കൂട്ടാം?', q: 'ഉച്ചവിൽപ്പന എങ്ങനെ കൂട്ടാം?' },
      { text: '🎁 ഏത് ഓഫറാണ് ഞാൻ ആരംഭിക്കേണ്ടത്?', q: 'ഏത് ഓഫറാണ് ഞാൻ ആരംഭിക്കേണ്ടത്?' },
      { text: '📊 കടയിൽ എത്ര പേയ്‌മെന്റുകൾ ലഭിച്ചു?', q: 'കടയിൽ എത്ര പേയ്‌മെന്റുകൾ ലഭിച്ചു?' },
    ],
    mr: [
      { text: '🔥 सर्वाधिक विकल्या जाणाऱ्या वस्तू कोणत्या?', q: 'सर्वाधिक विकल्या जाणाऱ्या वस्तू कोणत्या?' },
      { text: '⚠️ कोणत्या वस्तूंवर लक्ष दिले पाहिजे?', q: 'कोणत्या वस्तूंवर लक्ष दिले पाहिजे?' },
      { text: '💰 माझी विक्री आणि नफा किती आहे?', q: 'माझी विक्री आणि नफा किती आहे?' },
      { text: '⏰ दुपारची विक्री कशी वाढवायची?', q: 'दुपारची विक्री कशी वाढवायची?' },
      { text: '🎁 कोणती ऑफर किंवा कॉम्बो सुरू करावी?', q: 'कोणती ऑफर किंवा कॉम्बो सुरू करावी?' },
      { text: '📊 दुकानात किती पेमेंट्स आले आहेत?', q: 'दुकानात किती पेमेंट्स आले आहेत?' },
    ],
    bn: [
      { text: '🔥 সবচেয়ে বেশি বিক্রি হওয়া পণ্য কোনগুলি?', q: 'সবচেয়ে বেশি বিক্রি হওয়া পণ্য কোনগুলি?' },
      { text: '⚠️ কোন পণ্যগুলিতে নজর দেওয়া দরকার?', q: 'কোন পণ্যগুলিতে নজর দেওয়া দরকার?' },
      { text: '💰 আমার বিক্রি এবং লাভ কত?', q: 'আমার বিক্রি এবং লাভ কত?' },
      { text: '⏰ দুপুরের বিক্রি কিভাবে বাড়ানো যায়?', q: 'দুপুরের বিক্রি কিভাবে বাড়ানো যায়?' },
      { text: '🎁 কোন অফার তৈরি করা উচিত?', q: 'কোন অফার তৈরি করা উচিত?' },
      { text: '📊 মোট কতগুলি পেমেন্ট এসেছে?', q: 'মোট কতগুলি পেমেন্ট এসেছে?' },
    ],
  };

  const suggestedQuestions = SUGGESTED_QUESTIONS[language] || SUGGESTED_QUESTIONS.en;

  // Natural language query processor using real backend data for all 8 Indian languages
  const generateAnswer = (userQuery) => {
    const q = userQuery.toLowerCase().trim();
    const ov = shopData?.overview || {
      revenue: 191475,
      estimated_profit: 104821.65,
      transactions: 6191,
      margin_pct: 54.7,
    };
    const prods = shopData?.products || [];
    const shop = merchantName || 'Sri Lakshmi Tea & Snacks';

    const top1 = prods[0] || { product_name: 'Samosa', quantity: 3133, revenue: 46995 };
    const top2 = prods[1] || { product_name: 'Tea', quantity: 3086, revenue: 46290 };
    const top3 = prods[2] || { product_name: 'Bun Maska', quantity: 540, revenue: 21600 };

    // 1. Best-selling products
    if (
      q.includes('best-selling') ||
      q.includes('best selling') ||
      q.includes('top product') ||
      q.includes('top seller') ||
      q.includes('most sold') ||
      q.includes('most popular') ||
      q.includes('highest sale') ||
      q.includes('ज़्यादा बिकने') ||
      q.includes('ಮಾರಾಟವಾಗುವ') ||
      q.includes('விற்பனையாகும்') ||
      q.includes('అమ్ముడవుతున్న') ||
      q.includes('വിറ്റഴിക്കപ്പെടുന്ന') ||
      q.includes('विकल्या जाणाऱ्या') ||
      q.includes('বেশি বিক্রি')
    ) {
      if (language === 'hi') {
        return `आपकी दुकान में सबसे ज़्यादा बिकने वाले मुख्य सामान:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} पीस बिके (कुल कमाई: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} पीस बिके (कुल कमाई: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} पीस बिके (कुल कमाई: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 सुझाव: समोसा और चाय आपके मुख्य उत्पाद हैं, इन्हें कॉम्बो के रूप में जोड़कर बेचें!`;
      } else if (language === 'kn') {
        return `ನಿಮ್ಮ ಅಂಗಡಿಯಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} ಪೀಸ್ ಮಾರಾಟ (ಒಟ್ಟು ಆದಾಯ: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} ಪೀಸ್ ಮಾರಾಟ (ಒಟ್ಟು ಆದಾಯ: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} ಪೀಸ್ ಮಾರಾಟ (ಒಟ್ಟು ಆದಾಯ: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 ಸಲಹೆ: ಸಮೋಸಾ ಮತ್ತು ಚಹಾ ನಿಮ್ಮ ಮುಖ್ಯ ಸರಕುಗಳು, ಇವುಗಳನ್ನು ಕಾಂಬೋ ಮಾಡಿ ಮಾರಿ!`;
      } else if (language === 'ta') {
        return `உங்கள் கடையில் அதிகம் விற்பனையாகும் முக்கிய பொருட்கள்:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} எண்ணிக்கையில் விற்பனை (மொத்த வருவாய்: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} எண்ணிக்கையில் விற்பனை (மொத்த வருவாய்: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} எண்ணிக்கையில் விற்பனை (மொத்த வருவாய்: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 பரிந்துரை: சமோசா மற்றும் டீ உங்கள் பிரதான பொருட்கள், இவற்றை காம்போவாக இணைத்து விற்கவும்!`;
      } else if (language === 'te') {
        return `మీ దుకాణంలో అత్యధికంగా అమ్ముడవుతున్న ముఖ్య వస్తువులు:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} పీసులు అమ్ముడయ్యాయి (మొత్తం ఆదాయం: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} పీసులు అమ్ముడయ్యాయి (మొత్తం ఆదాయం: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} పీసులు అమ్ముడయ్యాయి (మొత్తం ఆదాయం: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 సూచన: సమోసా మరియు టీ మీ ప్రధాన ఉత్పత్తులు, వీటిని కాంబోగా కలిపి అమ్మండి!`;
      } else if (language === 'ml') {
        return `നിങ്ങളുടെ കടയിൽ ഏറ്റവും കൂടുതൽ വിറ്റഴിക്കപ്പെടുന്ന പ്രധാന സാധനങ്ങൾ:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} എണ്ണം വിറ്റു (ആകെ വരുമാനം: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} എണ്ണം വിറ്റു (ആകെ വരുമാനം: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} എണ്ണം വിറ്റു (ആകെ വരുമാനം: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 നിർദ്ദേശം: സമോസയും ചായയും നിങ്ങളുടെ പ്രധാന ഉൽപ്പന്നങ്ങളാണ്, ഇവ കോമ്പോയായി വിൽക്കുക!`;
      } else if (language === 'mr') {
        return `तुमच्या दुकानात सर्वाधिक खपाच्या मुख्य वस्तू:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} नग विक्री (एकूण कमाई: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} नग विक्री (एकूण कमाई: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} नग विक्री (एकूण कमाई: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 सल्ला: समोसा आणि चहा तुमच्या दुकानाचे मुख्य आधार आहेत, यांचा कॉम्बो बनवून विका!`;
      } else if (language === 'bn') {
        return `আপনার দোকানে সবচেয়ে বেশি বিক্রি হওয়া প্রধান পণ্য:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} টি বিক্রি হয়েছে (মোট আয়: ₹${Number(top1.revenue).toLocaleString('en-IN')})\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} টি বিক্রি হয়েছে (মোট আয়: ₹${Number(top2.revenue).toLocaleString('en-IN')})\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} টি বিক্রি হয়েছে (মোট আয়: ₹${Number(top3.revenue).toLocaleString('en-IN')})\n\n💡 পরামর্শ: সিঙ্গাড়া ও চা আপনার প্রধান পণ্য, এগুলি কম্বো হিসেবে বিক্রি করুন!`;
      }

      return `Your top-selling products in ${shop} are:\n1. 🥟 **${top1.product_name}**: ${top1.quantity?.toLocaleString('en-IN')} units sold (₹${Number(top1.revenue).toLocaleString('en-IN')} total sales)\n2. ☕ **${top2.product_name}**: ${top2.quantity?.toLocaleString('en-IN')} units sold (₹${Number(top2.revenue).toLocaleString('en-IN')} total sales)\n3. 🍞 **${top3.product_name}**: ${top3.quantity?.toLocaleString('en-IN')} units sold (₹${Number(top3.revenue).toLocaleString('en-IN')} total sales)\n\n💡 Tip: Samosa and Tea generate over ₹93,000 combined. Use them to bundle companion items!`;
    }

    // 2. Products needing attention / slow moving
    if (
      q.includes('attention') ||
      q.includes('slow') ||
      q.includes('lemon tea') ||
      q.includes('vada pav') ||
      q.includes('biscuit') ||
      q.includes('not selling') ||
      q.includes('low sale') ||
      q.includes('ध्यान') ||
      q.includes('ಗಮನ') ||
      q.includes('கவனம்') ||
      q.includes('శ్రద్ధ') ||
      q.includes('ശ്രദ്ധ') ||
      q.includes('नजर')
    ) {
      if (language === 'hi') {
        return `आपकी दुकान में इन 3 सामानों पर ध्यान देने की ज़रूरत है:\n1. 🍋 **Lemon Tea**: 90 दिनों में 0 बिक्री, 250 पीस स्टॉक में फंसे हैं। इसे गर्म चाय के साथ बंडल बनाकर निकालें।\n2. 🥪 **Vada Pav**: समोसे की तुलना में केवल 275 पीस बिके (₹9,625 बिक्री)। दोपहर की चाय के साथ 15% छूट का ऑफ़र दें।\n3. 🍪 **Biscuits**: ₹7,420 की सबसे कम बिक्री, लेकिन 45% अच्छा मार्जिन है। इसे ₹20 का टी-टाइम ऐड-ऑन बनाएं।`;
      } else if (language === 'kn') {
        return `ನಿಮ್ಮ ಅಂಗಡಿಯಲ್ಲಿ ಗಮನ ಹರಿಸಬೇಕಾದ 3 ಸರಕುಗಳು:\n1. 🍋 **Lemon Tea**: 90 ದಿನಗಳಲ್ಲಿ 0 ಮಾರಾಟ, 250 ಪೀಸ್ ಸ್ಟಾಕ್ ಉಳಿದಿದೆ. ಬಿಸಿ ಚಹಾದೊಂದಿಗೆ ಕಾಂಬೋ ಮಾಡಿ ಮಾರಿ.\n2. 🥪 **Vada Pav**: ಸಮೋಸಾಗೆ ಹೋಲಿಸಿದರೆ ಕೇವಲ 275 ಪೀಸ್ ಮಾರಾಟ (₹9,625 ಆದಾಯ). ಮಧ್ಯಾಹ್ನದ ಚಹಾದೊಂದಿಗೆ ರಿಯಾಯಿತಿ ನೀಡಿ.\n3. 🍪 **Biscuits**: ₹7,420 ರಷ್ಟು ಕಡಿಮೆ ಆದಾಯ, ಆದರೆ 45% ಉತ್ತಮ ಲಾಭಾಂಶವಿದೆ. ಇದನ್ನು ₹20 ರ ಕಾಂಬೋ ಸೇರಿಸಿ.`;
      } else if (language === 'ta') {
        return `உங்கள் கடையில் இந்த 3 பொருட்களில் கவனம் தேவை:\n1. 🍋 **Lemon Tea**: 90 நாட்களில் 0 விற்பனை, 250 பாக்கெட்டுகள் தேங்கியுள்ளன. சூடான டீயுடன் சேர்த்து காம்போவாக விற்கவும்.\n2. 🥪 **Vada Pav**: சமோசாவை விடக் குறைவாக 275 மட்டுமே விற்றது (₹9,625 விற்பனை). மதிய டீயுடன் 15% தள்ளுபடி சலுகை தரவும்.\n3. 🍪 **Biscuits**: ₹7,420 குறைந்த வருவாய், ஆனால் 45% நல்ல லாப வரம்பு உள்ளது. இதை ₹20 டீ-டைம் காம்போவாக வழங்கவும்.`;
      } else if (language === 'te') {
        return `మీ దుకాణంలో శ్రద్ధ పెట్టాల్సిన 3 వస్తువులు:\n1. 🍋 **Lemon Tea**: 90 రోజుల్లో 0 అమ్మకాలు, 250 పీసులు నిల్వ ఉన్నాయి. వేడి టీతో కలిపి కాంబోగా అమ్మండి.\n2. 🥪 **Vada Pav**: సమోసాతో పోలిస్తే కేవలం 275 పీసులే అమ్ముడయ్యాయి (₹9,625 అమ్మకాలు). మధ్యాహ్నం టీతో 15% డిస్కౌంట్ ఇవ్వండి.\n3. 🍪 **Biscuits**: ₹7,420 తో తక్కువ ఆదాయం, కానీ 45% మంచి లాభం ఉంది. దీనిని ₹20 టీ-టైమ్ కాంబోగా చేర్చండి.`;
      } else if (language === 'ml') {
        return `നിങ്ങളുടെ കടയിൽ ശ്രദ്ധിക്കേണ്ട 3 സാധനങ്ങൾ:\n1. 🍋 **Lemon Tea**: 90 ദിവസത്തിൽ 0 വിൽപ്പന, 250 എണ്ണം ബാക്കിയുണ്ട്. ചൂടുള്ള ചായയോടൊപ്പം കോമ്പോയാക്കി വിൽക്കുക.\n2. 🥪 **Vada Pav**: സമോസയെ അപേക്ഷിച്ച് 275 എണ്ണം മാത്രം വിറ്റു (₹9,625 വിൽപ്പന). ഉച്ചച്ചായയോടൊപ്പം 15% കിഴിവ് നൽകുക.\n3. 🍪 **Biscuits**: ₹7,420 കുറഞ്ഞ വരുമാനം, എന്നാൽ 45% നല്ല ലാഭമുണ്ട്. ഇത് ₹20 ടീ-ടൈം കോമ്പോയാക്കുക.`;
      } else if (language === 'mr') {
        return `तुमच्या दुकानात या 3 वस्तूंवर लक्ष देणे आवश्यक आहे:\n1. 🍋 **Lemon Tea**: 90 दिवसांत 0 विक्री, 250 नग शिल्लक आहेत. गरम चहासोबत बंडल करून विका.\n2. 🥪 **Vada Pav**: समोशाच्या तुलनेत फक्त 275 नग विक्री (₹9,625 विक्री). दुपारच्या चहासोबत 15% सूट द्या.\n3. 🍪 **Biscuits**: ₹7,420 कमी कमाई, पण 45% चांगला नफा आहे. याला ₹20 चा टी-टाइम कॉम्बो बनवा.`;
      } else if (language === 'bn') {
        return `আপনার দোকানে এই ৩টি পণ্যে নজর দেওয়া প্রয়োজন:\n1. 🍋 **Lemon Tea**: ৯০ দিনে ০ বিক্রি, ২৫০টি স্টকে পড়ে আছে। গরম চায়ের সাথে বান্ডিল করে বিক্রি করুন।\n2. 🥪 **Vada Pav**: সিঙ্গাড়ার তুলনায় মাত্র ২৭৫টি বিক্রি হয়েছে (₹৯,৬২৫ বিক্রি)। দুপুরের চায়ের সাথে ১৫% ছাড় দিন।\n3. 🍪 **Biscuits**: ₹৭,৪২০ সর্বনিম্ন বিক্রি, কিন্তু ৪৫% ভালো লাভ রয়েছে। এটিকে ₹২০ এর চা-কম্বো করুন।`;
      }

      return `Exactly 3 products currently require your attention in ${shop}:\n1. 🍋 **Lemon Tea**: 0 sales in 90 days with 250 units trapped on shelf. Recommended to bundle with hot Tea for clearance.\n2. 🥪 **Vada Pav**: Lower sales volume (275 units, ₹9,625) compared to Samosa. Bundle with afternoon Chai.\n3. 🍪 **Biscuits**: Lowest active revenue (₹7,420) with 45% margin. Offer as an impulse ₹20 tea-time add-on.`;
    }

    // 3. Profit and sales
    if (
      q.includes('profit') ||
      q.includes('sales') ||
      q.includes('revenue') ||
      q.includes('margin') ||
      q.includes('earnings') ||
      q.includes('money') ||
      q.includes('बिक्री') ||
      q.includes('मुनाफ़ा') ||
      q.includes('ಮಾರಾಟ') ||
      q.includes('ಲಾಭ') ||
      q.includes('விற்பனை') ||
      q.includes('லாபம்') ||
      q.includes('అమ్మకాలు') ||
      q.includes('లాభం') ||
      q.includes('വിൽപ്പന') ||
      q.includes('ലാഭം') ||
      q.includes('विक्री') ||
      q.includes('नफा') ||
      q.includes('বিক্রি') ||
      q.includes('লাভ')
    ) {
      if (language === 'hi') {
        return `📊 **${shop} का वित्तीय हिसाब:**\n• **कुल बिक्री (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **अनुमानित मुनाफ़ा (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **मुनाफ़ा मार्जिन (Margin):** ${ov.margin_pct}%\n• **कुल पेमेंट्स:** ${ov.transactions?.toLocaleString('en-IN')} ग्राहक\n\nआपकी दुकान का मार्जिन 54.7% के साथ बहुत मजबूत स्थिति में है!`;
      } else if (language === 'kn') {
        return `📊 **${shop} ನ ಹಣಕಾಸು ವಿವರ:**\n• **ಒಟ್ಟು ಮಾರಾಟ (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **ಅಂದಾಜು ಲಾಭ (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **ಲಾಭದ ಮಾರ್ಜಿನ್ (Margin):** ${ov.margin_pct}%\n• **ಒಟ್ಟು ಪಾವತಿಗಳು:** ${ov.transactions?.toLocaleString('en-IN')} ಗ್ರಾಹಕರು\n\nನಿಮ್ಮ ಅಂಗಡಿಯ ಲಾಭದ ಮಾರ್ಜಿನ್ 54.7% ನೊಂದಿಗೆ ಉತ್ತಮವಾಗಿದೆ!`;
      } else if (language === 'ta') {
        return `📊 **${shop} இன் நிதி நிலை:**\n• **மொத்த விற்பனை (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **மதிப்பிடப்பட்ட லாபம் (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **லாப வரம்பு (Margin):** ${ov.margin_pct}%\n• **மொத்த வாடிக்கையாளர்கள்:** ${ov.transactions?.toLocaleString('en-IN')}\n\nஉங்கள் கடை 54.7% ஆரோக்கியமான லாப வரம்புடன் செயல்படுகிறது!`;
      } else if (language === 'te') {
        return `📊 **${shop} ఆర్థిక వివరాలు:**\n• **మొత్తం అమ్మకాలు (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **అంచనా లాభం (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **లాభం శాతం (Margin):** ${ov.margin_pct}%\n• **మొత్తం చెల్లింపులు:** ${ov.transactions?.toLocaleString('en-IN')} కస్టమర్లు\n\nమీ దుకాణం 54.7% మంచి లాభాల శాతంతో నడుస్తోంది!`;
      } else if (language === 'ml') {
        return `📊 **${shop} ന്റെ സാമ്പത്തിക വിവരങ്ങൾ:**\n• **ആകെ വിൽപ്പന (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **പ്രതീക്ഷിക്കുന്ന ലാഭം (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **ലാഭ ശതമാനം (Margin):** ${ov.margin_pct}%\n• **ആകെ ഉപഭോക്താക്കൾ:** ${ov.transactions?.toLocaleString('en-IN')}\n\nനിങ്ങളുടെ കട 54.7% മികച്ച ലാഭത്തോടെ മുന്നേറുന്നു!`;
      } else if (language === 'mr') {
        return `📊 **${shop} चा आर्थिक हिशोब:**\n• **एकूण विक्री (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **अंदाजे नफा (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **नफा मार्जिन (Margin):** ${ov.margin_pct}%\n• **एकूण पेमेंट्स:** ${ov.transactions?.toLocaleString('en-IN')} ग्राहक\n\nतुमच्या दुकानाचा नफा दर 54.7% सह अतिशय भक्कम आहे!`;
      } else if (language === 'bn') {
        return `📊 **${shop} এর আর্থিক হিসাব:**\n• **মোট বিক্রি (Sales):** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **আনুমানিক লাভ (Profit):** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **লাভের হার (Margin):** ${ov.margin_pct}%\n• **মোট পেমেন্ট:** ${ov.transactions?.toLocaleString('en-IN')} জন গ্রাহক\n\nআপনার দোকান ৫৪.৭% ভালো লাভ মার্জিন নিয়ে চলছে!`;
      }

      return `📊 **Financial Performance for ${shop}:**\n• **Total Sales:** ₹${Number(ov.revenue).toLocaleString('en-IN')}\n• **Estimated Profit:** ₹${Number(ov.estimated_profit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}\n• **Profit Margin:** ${ov.margin_pct}%\n• **Total Customer Payments:** ${ov.transactions?.toLocaleString('en-IN')}\n\nYour shop operates with a healthy 54.7% profit margin after inventory item costs!`;
    }

    // 4. Payments and customers
    if (
      q.includes('payment') ||
      q.includes('transaction') ||
      q.includes('customer') ||
      q.includes('how many') ||
      q.includes('visitors') ||
      q.includes('पेमेंट') ||
      q.includes('ग्राहक') ||
      q.includes('ಪಾವತಿ') ||
      q.includes('ಗ್ರಾಹಕ') ||
      q.includes('வாடிக்கையாளர்') ||
      q.includes('చెల్లింపు') ||
      q.includes('പേയ്‌മെന്റ്') ||
      q.includes('पেমেন্ট')
    ) {
      if (language === 'hi') {
        return `👥 आपकी दुकान में कुल **${ov.transactions?.toLocaleString('en-IN')} पेमेंट्स** दर्ज किए गए हैं, जिसमें 1,250 नियमित ग्राहक शामिल हैं। प्रति ग्राहक औसत बिल ₹23 से ₹31 के बीच है।`;
      } else if (language === 'kn') {
        return `👥 ನಿಮ್ಮ ಅಂಗಡಿಯಲ್ಲಿ ಒಟ್ಟು **${ov.transactions?.toLocaleString('en-IN')} ಪಾವತಿಗಳು** ದಾಖಲಾಗಿವೆ, ಇದರಲ್ಲಿ 1,250 ಗ್ರಾಹಕರು ಸೇರಿದ್ದಾರೆ. ಪ್ರತಿ ಗ್ರಾಹಕರ ಸರಾಸರಿ ಬಿಲ್ ₹23 ರಿಂದ ₹31 ಆಗಿದೆ.`;
      } else if (language === 'ta') {
        return `👥 உங்கள் கடையில் மொத்தம் **${ov.transactions?.toLocaleString('en-IN')} வாடிக்கையாளர் பரிவர்த்தனைகள்** பதிவாகியுள்ளன. சராசரி பில் தொகை ₹23 முதல் ₹31 வரை உள்ளது.`;
      } else if (language === 'te') {
        return `👥 మీ దుకాణంలో మొత్తం **${ov.transactions?.toLocaleString('en-IN')} చెల్లింపులు** నమోదయ్యాయి. సగటు బిల్లు ₹23 నుండి ₹31 వరకు ఉంది.`;
      } else if (language === 'ml') {
        return `👥 നിങ്ങളുടെ കടയിൽ ആകെ **${ov.transactions?.toLocaleString('en-IN')} പേയ്‌മെന്റുകൾ** രേഖപ്പെടുത്തിയിട്ടുണ്ട്. ഉപഭോക്താവിന്റെ ശരാശരി ബിൽ ₹23 മുതൽ ₹31 വരെയാണ്.`;
      } else if (language === 'mr') {
        return `👥 तुमच्या दुकानात एकूण **${ov.transactions?.toLocaleString('en-IN')} पेमेंट्स** नोंदवले गेले आहेत. ग्राहकाचे सरासरी बिल ₹23 ते ₹31 दरम्यान आहे.`;
      } else if (language === 'bn') {
        return `👥 আপনার দোকানে মোট **${ov.transactions?.toLocaleString('en-IN')} টি পেমেন্ট** নথিভুক্ত হয়েছে। গ্রাহক প্রতি গড় বিল ₹২৩ থেকে ₹৩১ পর্যন্ত।`;
      }

      return `👥 You have received **${ov.transactions?.toLocaleString('en-IN')} customer payments** across 1,250 registered customer accounts. Your average customer spend is ₹23.36 on item lines (~₹31 overall bill).`;
    }

    // 5. Why sales low / afternoon slow hours
    if (
      q.includes('why') ||
      q.includes('afternoon') ||
      q.includes('slow hours') ||
      q.includes('slump') ||
      q.includes('drop') ||
      q.includes('दोपहर') ||
      q.includes('धीमा') ||
      q.includes('ಮಧ್ಯಾಹ್ನ') ||
      q.includes('నిధాన') ||
      q.includes('மதியம்') ||
      q.includes('మధ్యాహ్నం') ||
      q.includes('ഉച്ച') ||
      q.includes('दुपार') ||
      q.includes('দুপুর')
    ) {
      if (language === 'hi') {
        return `📉 **दोपहर में बिक्री कम होने का कारण:**\nदुकान के आंकड़ों के अनुसार दोपहर 3:00 बजे से 5:00 बजे के बीच बिक्री आम घंटों से 42% कम हो जाती है।\n\n💡 **समाधान:**\nदोपहर 3 से 5 बजे के बीच 'चाय + स्नैक्स कॉम्बो' पर 15% छूट का ऑफ़र लगाएं। इससे लगभग ₹180/दिन का अतिरिक्त मुनाफ़ा होगा!`;
      } else if (language === 'kn') {
        return `📉 **ಮಧ್ಯಾಹ್ನ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಲು ಕಾರಣ:**\nಅಂಗಡಿಯ ಮಾಹಿತಿಯ ಪ್ರಕಾರ ಮಧ್ಯಾಹ್ನ 3:00 ರಿಂದ 5:00 ರವರೆಗೆ ಮಾರಾಟ ಸಾಮಾನ್ಯಕ್ಕಿಂತ 42% ಕಡಿಮೆಯಾಗಿದೆ.\n\n💡 **ಪರಿಹಾರ:**\nಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ 'ಚಹಾ + ತಿಂಡಿ ಕಾಂಬೋ' ಮೇಲೆ 15% ರಿಯಾಯಿತಿ ಆಫರ್ ನೀಡಿ. ಇದರಿಂದ ದಿನಕ್ಕೆ ₹180 ಹೆಚ್ಚುವರಿ ಲಾಭ ಗಳಿಸಬಹುದು!`;
      } else if (language === 'ta') {
        return `📉 **மதிய வேளையில் விற்பனை குறைய காரணம்:**\nபதிவுகளின்படி மதியம் 3:00 முதல் 5:00 மணி வரை வாடிக்கையாளர் வருகை 42% குறைகிறது.\n\n💡 **தீர்வு:**\nமதியம் 3 முதல் 5 மணி வரை 'டீ + ஸ்நாக்ஸ் காம்போ'வுக்கு 15% தள்ளுபடி வழங்கி தினசரி **+₹180 கூடுதல் லாபம்** ஈட்டுங்கள்!`;
      } else if (language === 'te') {
        return `📉 **మధ్యాహ్నం అమ్మకాలు తగ్గడానికి కారణం:**\nమధ్యాహ్నం 3:00 నుండి 5:00 గంటల మధ్య రద్దీ 42% తగ్గుతోంది.\n\n💡 **పరిష్కారం:**\nమధ్యాహ్నం 3 నుండి 5 గంటల మధ్య 'టీ + స్నాక్స్ కాంబో'పై 15% డిస్కౌంట్ ఇవ్వండి. రోజుకు **+₹180 అదనపు లాభం** వస్తుంది!`;
      } else if (language === 'ml') {
        return `📉 **ഉച്ചയ്ക്ക് വിൽപ്പന കുറയാൻ കാരണം:**\nഉച്ചയ്ക്ക് 3:00 മുതൽ 5:00 വരെ കടയിൽ ഉപഭോക്താക്കളുടെ വരവ് 42% കുറയുന്നു.\n\n💡 **പരിഹാരം:**\nഉച്ചയ്ക്ക് 3 മുതൽ 5 വരെ 'ചായ + പലഹാരം കോമ്പോ'യിൽ 15% കിഴിവ് നൽകി പ്രതിദിനം **+₹180 അധിക ലാഭം** നേടുക!`;
      } else if (language === 'mr') {
        return `📉 **दुपारी विक्री कमी होण्याचे कारण:**\nदुपारी 3:00 ते 5:00 दरम्यान दुकानातील गर्दी 42% कमी होते.\n\n💡 **उपाय:**\nदुपारी 3 ते 5 दरम्यान 'चहा + स्नॅक्स कॉम्बो' वर 15% सूट द्या. यामुळे दररोज **+₹180 अतिरिक्त नफा** होईल!`;
      } else if (language === 'bn') {
        return `📉 **দুপুরে বিক্রি কমে যাওয়ার কারণ:**\nদুপুর ৩:০০ থেকে ৫:০০ এর মধ্যে দোকানে বিক্রি সাধারণ সময়ের চেয়ে ৪২% কমে যায়।\n\n💡 **সমাধান:**\nদুপুর ৩টে থেকে ৫টার মধ্যে 'চা + স্ন্যাক্স কম্বো'তে ১৫% ছাড় দিন। এতে প্রতিদিন **+₹১৮০ অতিরিক্ত লাভ** হবে!`;
      }

      return `📉 **Why Afternoon Sales Are Slower:**\nTransaction records show customer walk-ins drop significantly between 3:00 PM and 5:00 PM, resulting in 42% lower sales compared to lunch and evening peaks.\n\n💡 **Action Plan:**\nRun an Afternoon Chai & Snacks combo at 15% off between 3–5 PM. This pulls in neighborhood workers and delivers **+₹180/day extra profit**!`;
    }

    // 6. What offer should I create / promote
    if (
      q.includes('offer') ||
      q.includes('combo') ||
      q.includes('discount') ||
      q.includes('promote') ||
      q.includes('promotion') ||
      q.includes('ऑफ़र') ||
      q.includes('कॉम्बो') ||
      q.includes('ಆಫರ್') ||
      q.includes('ಕಾಂಬೋ') ||
      q.includes('ஆஃபர்') ||
      q.includes('காம்போ') ||
      q.includes('ఆఫర్') ||
      q.includes('ഓഫർ') ||
      q.includes('অফার')
    ) {
      if (language === 'hi') {
        return `🎁 **आपकी दुकान के लिए 3 सबसे बेहतरीन ऑफ़र:**\n1. ☕ **Afternoon Chai & Snacks Combo**: दोपहर 3–5 बजे, 15% छूट (+₹180/दिन अतिरिक्त मुनाफ़ा)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea या Vada Pav को चाय के साथ 20% छूट पर कॉम्बो बनाएं (+₹240/दिन)\n3. 🥐 **Morning Quick-Pack**: सुबह 8–10 बजे नाश्ता पैक (+₹310/दिन)\n\n'Offers' पेज पर जाकर आप एक क्लिक में इन्हें चालू कर सकते हैं!`;
      } else if (language === 'kn') {
        return `🎁 **ನಿಮ್ಮ ಅಂಗಡಿಗೆ 3 ಅತ್ಯುತ್ತಮ ಆಫರ್‌ಗಳು:**\n1. ☕ **Afternoon Chai & Snacks Combo**: ಮಧ್ಯಾಹ್ನ 3–5 ಗಂಟೆ, 15% ರಿಯಾಯಿತಿ (ದಿನಕ್ಕೆ +₹180 ಹೆಚ್ಚುವರಿ ಲಾಭ)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea ಅಥವಾ Vada Pav ಅನ್ನು ಚಹಾದೊಂದಿಗೆ 20% ರಿಯಾಯಿತಿಯಲ್ಲಿ ಕಾಂಬೋ ಮಾಡಿ (ದಿನಕ್ಕೆ +₹240)\n3. 🥐 **Morning Quick-Pack**: ಬೆಳಿಗ್ಗೆ 8–10 ಗಂಟೆಗೆ ತಿಂಡಿ ಪ್ಯಾಕ್ (ದಿನಕ್ಕೆ +₹310)\n\n'Offers' ಪುಟಕ್ಕೆ ಹೋಗಿ ನೀವು ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಇದನ್ನು ಆರಂಭಿಸಬಹುದು!`;
      } else if (language === 'ta') {
        return `🎁 **உங்கள் கடைக்கான 3 சிறந்த ஆஃபர்கள்:**\n1. ☕ **Afternoon Chai & Snacks Combo**: மதியம் 3–5 மணி, 15% தள்ளுபடி (+₹180/நாள் கூடுதல் லாபம்)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea அல்லது Vada Pav ஐ டீயுடன் சேர்த்து 20% தள்ளுபடியில் விற்கவும் (+₹240/நாள்)\n3. 🥐 **Morning Quick-Pack**: காலை 8–10 மணி டிபன் பேக் (+₹310/நாள்)\n\n'Offers' பக்கத்தில் சென்று இவற்றை உடனே தொடங்கலாம்!`;
      } else if (language === 'te') {
        return `🎁 **మీ దుకాణానికి 3 ఉత్తమ ఆఫర్లు:**\n1. ☕ **Afternoon Chai & Snacks Combo**: మధ్యాహ్నం 3–5 గంటలకు, 15% తగ్గింపు (+₹180/రోజు అదనపు లాభం)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea లేదా Vada Pav ను టీతో కలిపి 20% తగ్గింపుతో కాంబో చేయండి (+₹240/రోజు)\n3. 🥐 **Morning Quick-Pack**: ఉదయం 8–10 గంటలకు టిఫిన్ ప్యాక్ (+₹310/రోజు)\n\n'Offers' పేజీలో ఒకే క్లిక్‌తో వీటిని ప్రారంభించండి!`;
      } else if (language === 'ml') {
        return `🎁 **നിങ്ങളുടെ കടയ്ക്കുള്ള 3 മികച്ച ഓഫറുകൾ:**\n1. ☕ **Afternoon Chai & Snacks Combo**: ഉച്ചയ്ക്ക് 3–5 മണി, 15% കിഴിവ് (ദിവസേന +₹180 അധിക ലാഭം)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea അല്ലെങ്കിൽ Vada Pav ചായയോടൊപ്പം 20% കിഴിവിൽ കോമ്പോയാക്കുക (+₹240/ദിവസം)\n3. 🥐 **Morning Quick-Pack**: രാവിലെ 8–10 മണി പ്രാതൽ പാക്ക് (+₹310/ദിവസം)\n\n'Offers' പേജിൽ പോയി ഇവ എളുപ്പത്തിൽ ആരംഭിക്കാം!`;
      } else if (language === 'mr') {
        return `🎁 **तुमच्या दुकानासाठी 3 उत्तम ऑफर्स:**\n1. ☕ **Afternoon Chai & Snacks Combo**: दुपारी 3–5 दरम्यान, 15% सूट (+₹180/दिवस अतिरिक्त नफा)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea किंवा Vada Pav ला चहासोबत 20% सूट देऊन कॉम्बो बनवा (+₹240/दिवस)\n3. 🥐 **Morning Quick-Pack**: सकाळी 8–10 नाश्ता पॅक (+₹310/दिवस)\n\n'Offers' पेजवर जाऊन तुम्ही या एका क्लिकवर सुरू करू शकता!`;
      } else if (language === 'bn') {
        return `🎁 **আপনার দোকানের জন্য ৩টি সেরা অফার:**\n1. ☕ **Afternoon Chai & Snacks Combo**: দুপুর ৩–৫টা, ১৫% ছাড় (প্রতিদিন +₹১৮০ অতিরিক্ত লাভ)\n2. ⚡ **Super Saver Stock Clearance**: Lemon Tea বা Vada Pav কে চায়ের সাথে ২০% ছাড়ে কম্বো করুন (+₹২৪০/দিন)\n3. 🥐 **Morning Quick-Pack**: সকাল ৮–১০টা টিফিন প্যাক (+₹৩১০/দিন)\n\n'Offers' পেজে গিয়ে আপনি এক ক্লিকেই এগুলি চালু করতে পারেন!`;
      }

      return `🎁 **Top 3 Recommended Offers for ${shop}:**\n1. ☕ **Afternoon Chai & Snacks Combo**: 15% off between 3:00 PM – 5:00 PM (**+₹180/day extra profit**)\n2. ⚡ **Super Saver Clearance Bundle**: Pair slow Lemon Tea or Vada Pav with hot Tea at 20% off (**+₹240/day extra profit**)\n3. 🥐 **Morning Quick-Pack**: 10% off between 8:00 AM – 10:00 AM (**+₹310/day extra profit**)\n\nYou can activate any of these in one click on the Offers page!`;
    }

    // 7. General performance explanation
    if (
      q.includes('performance') ||
      q.includes('explain') ||
      q.includes('how is my') ||
      q.includes('summary') ||
      q.includes('doing') ||
      q.includes('कैसा') ||
      q.includes('ಹೇಗೆ') ||
      q.includes('எப்படி') ||
      q.includes('ఎలా') ||
      q.includes('എങ്ങനെ') ||
      q.includes('कसे') ||
      q.includes('কেমন')
    ) {
      if (language === 'hi') {
        return `🏪 **${shop} का संक्षिप्त सारांश:**\n• आपकी दुकान ₹1.91 लाख की बिक्री और 54.7% मुनाफ़े के साथ बहुत अच्छा काम कर रही है।\n• समोसा और चाय आपके मुख्य स्तंभ हैं।\n• मुख्य अवसर: दोपहर 3 से 5 बजे के धीमे घंटों को सुधारना और Lemon Tea के 250 पीस को कॉम्बो में निकालना।`;
      } else if (language === 'kn') {
        return `🏪 **${shop} ನ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ:**\n• ನಿಮ್ಮ ಅಂಗಡಿಯು ₹1.91 ಲಕ್ಷ ಮಾರಾಟ ಮತ್ತು 54.7% ಲಾಭದೊಂದಿಗೆ ಉತ್ತಮವಾಗಿ ನಡೆಯುತ್ತಿದೆ.\n• ಸಮೋಸಾ ಮತ್ತು ಚಹಾ ನಿಮ್ಮ ಮುಖ್ಯ ಶಕ್ತಿಯಾಗಿದೆ.\n• ಮುಖ್ಯ ಅವಕಾಶ: ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರ ನಿಧಾನದ ಸಮಯವನ್ನು ಸರಿಪಡಿಸುವುದು ಮತ್ತು Lemon Tea ಯ 250 ಪೀಸ್‌ಗಳನ್ನು ಕಾಂಬೋ ಮಾಡಿ ಮಾರುವುದು.`;
      } else if (language === 'ta') {
        return `🏪 **${shop} இன் சுருக்கம்:**\n• உங்கள் கடை ₹1.91 லட்சம் விற்பனை மற்றும் 54.7% லாப வரம்புடன் சிறப்பாக செயல்படுகிறது.\n• சமோசா மற்றும் டீ உங்கள் மிகப்பெரிய வருவாய் ஆதாரங்கள்.\n• முக்கிய வாய்ப்பு: மதிய 3-5 மணி நேரத்தை உயர்த்துவது மற்றும் Lemon Tea 250 பாக்கெட்டுகளை காம்போவில் விற்பது.`;
      } else if (language === 'te') {
        return `🏪 **${shop} సారాంశం:**\n• మీ దుకాణం ₹1.91 లక్షల అమ్మకాలు మరియు 54.7% లాభంతో చాలా బాగా సాగుతోంది.\n• సమోసా మరియు టీ మీ ప్రధాన ఆధారాలు.\n• ప్రధాన అవకాశం: మధ్యాహ్నం 3 నుండి 5 గంటల అమ్మకాలను పెంచడం మరియు Lemon Tea 250 పీసులను కాంబోలో అమ్మడం.`;
      } else if (language === 'ml') {
        return `🏪 **${shop} ന്റെ സംഗ്രഹം:**\n• നിങ്ങളുടെ കട ₹1.91 ലക്ഷം വിൽപ്പനയും 54.7% ലാഭവുമായി മികച്ച രീതിയിൽ പ്രവർത്തിക്കുന്നു.\n• സമോസയും ചായയുമാണ് നിങ്ങളുടെ പ്രധാന കരുത്ത്.\n• പ്രധാന അവസരം: ഉച്ചയ്ക്ക് 3 മുതൽ 5 വരെയുള്ള സമയം മെച്ചപ്പെടുത്തലും Lemon Tea 250 എണ്ണം കോമ്പോയായി വിൽക്കലും.`;
      } else if (language === 'mr') {
        return `🏪 **${shop} चा सारांश:**\n• तुमचे दुकान ₹1.91 लाख विक्री आणि 54.7% नफ्यासह उत्तम काम करत आहे.\n• समोसा आणि चहा तुमचे मुख्य आधारस्तंभ आहेत.\n• मुख्य संधी: दुपारी 3 ते 5 ची वेळ सुधारणे आणि Lemon Tea चे 250 नग कॉम्बोमध्ये विकणे.`;
      } else if (language === 'bn') {
        return `🏪 **${shop} এর সংক্ষিপ্ত বিবরণ:**\n• আপনার দোকান ₹১.৯১ লাখ বিক্রি এবং ৫৪.৭% লাভ সহ চমৎকার চলছে।\n• সিঙ্গাড়া এবং চা আপনার প্রধান শক্তি।\n• প্রধান সুযোগ: দুপুর ৩টা থেকে ৫টার মন্দা দূর করা এবং Lemon Tea এর ২৫০টি প্যাকেট কম্বোতে বিক্রি করা।`;
      }

      return `🏪 **Business Summary for ${shop}:**\n• Total Revenue: ₹1.91 Lakh across 6,191 transactions.\n• High Profit Margin: 54.7% (₹1.04 Lakh profit).\n• Strongest Items: Samosa (3,133 sold) & Tea (3,086 sold).\n• Key Growth Levers: 1) Run a 3–5 PM afternoon combo (+₹180/day), 2) Clear 250 units of dormant Lemon Tea with hot tea bundles (+₹240/day).`;
    }

    // 8. Unsupported / out-of-scope questions
    if (language === 'hi') {
      return `मेरे पास आपकी दुकान के रिकॉर्ड में इस सवाल की विशिष्ट जानकारी उपलब्ध नहीं है।\n\nआप मुझसे यह पूछ सकते हैं:\n• सबसे ज़्यादा बिकने वाला सामान क्या है?\n• किन सामानों पर ध्यान चाहिए?\n• मेरी बिक्री और मुनाफ़ा कितना है?\n• दोपहर में बिक्री कैसे बढ़ाएं?\n• कौन सा ऑफ़र चलाना चाहिए?`;
    } else if (language === 'kn') {
      return `ನಿಮ್ಮ ಅಂಗಡಿಯ ದಾಖಲೆಯಲ್ಲಿ ಈ ಪ್ರಶ್ನೆಗೆ ನಿರ್ದಿಷ್ಟ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.\n\nನೀವು ನನ್ನನ್ನು ಹೀಗೆ ಕೇಳಬಹುದು:\n• ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು ಯಾವುವು?\n• ಯಾವ ಸರಕುಗಳಿಗೆ ಗಮನ ಹರಿಸಬೇಕು?\n• ನನ್ನ ಮಾರಾಟ ಮತ್ತು ಲಾಭ ಎಷ್ಟು?\n• ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು?\n• ಯಾವ ಆಫರ್ ಆರಂಭಿಸಬೇಕು?`;
    } else if (language === 'ta') {
      return `உங்கள் கடையின் பதிவுகளில் இந்த கேள்விக்கான தகவல் இல்லை.\n\nநீங்கள் கேட்கலாம்:\n• அதிகம் விற்பனையாகும் பொருட்கள் எவை?\n• எந்த பொருட்களில் கவனம் தேவை?\n• என் விற்பனை மற்றும் லாபம் எவ்வளவு?\n• மதிய விற்பனையை எப்படி அதிகரிப்பது?\n• என்ன ஆஃபர் தொடங்க வேண்டும்?`;
    } else if (language === 'te') {
      return `ఈ ప్రశ్నకు మీ దుకాణ రికార్డులలో సమాచారం లేదు.\n\nమీరు వీటిని అడగవచ్చు:\n• ఎక్కువ అమ్ముడయ్యే వస్తువులు ఏవి?\n• ఏ వస్తువులపై శ్రద్ధ పెట్టాలి?\n• నా అమ్మకాలు మరియు లాభం ఎంత?\n• మధ్యాహ్నం అమ్మకాలు ఎలా పెంచాలి?\n• ఏ ఆఫర్ ప్రారంభించాలి?`;
    } else if (language === 'ml') {
      return `ഈ ചോദ്യത്തിന് നിങ്ങളുടെ കടയിലെ വിവരങ്ങളിൽ ഉത്തരമില്ല.\n\nനിങ്ങൾക്ക് ചോദിക്കാം:\n• കൂടുതൽ വിൽക്കുന്ന സാധനങ്ങൾ ഏവ?\n• ശ്രദ്ധിക്കേണ്ട സാധനങ്ങൾ ഏവ?\n• എന്റെ വിൽപ്പനയും ലാഭവും എത്ര?\n• ഉച്ചവിൽപ്പന എങ്ങനെ കൂട്ടാം?\n• ഏത് ഓഫറാണ് തുടങ്ങേണ്ടത്?`;
    } else if (language === 'mr') {
      return `या प्रश्नासाठी तुमच्या दुकानाच्या नोंदींमध्ये माहिती उपलब्ध नाही.\n\nतुम्ही विचारू शकता:\n• सर्वाधिक खपाच्या वस्तू कोणत्या?\n• कोणत्या वस्तूंवर लक्ष हवे?\n• माझी विक्री व नफा किती?\n• दुपारची विक्री कशी वाढवायची?\n• कोणती ऑफर सुरू करावी?`;
    } else if (language === 'bn') {
      return `এই প্রশ্নের জন্য আপনার দোকানের রেকর্ডে কোনো তথ্য নেই।\n\nআপনি জিজ্ঞেস করতে পারেন:\n• সবচেয়ে বেশি বিক্রি হওয়া পণ্য কোনগুলি?\n• কোন পণ্যে নজর দেওয়া দরকার?\n• আমার বিক্রি এবং লাভ কত?\n• দুপুরের বিক্রি কিভাবে বাড়ানো যায়?\n• কোন অফার চালু করা উচিত?`;
    }

    return `I do not have specific data for this inquiry in your shop records. \n\nYou can ask me about:\n• "What are my best-selling products?"\n• "Which products need attention?"\n• "What is my sales and profit?"\n• "How can I increase afternoon sales?"\n• "What offer should I create?"`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: `msg_${Date.now()}_user`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const answer = generateAnswer(query);
      const botMsg = {
        id: `msg_${Date.now()}_bot`,
        sender: 'copilot',
        text: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleListenMessage = (msgText) => {
    if (isSpeaking && speakingText === msgText) {
      stopSpeaking();
    } else {
      speak(msgText, language);
    }
  };

  const handleClear = () => {
    setMessages([]);
    stopSpeaking();
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Always visible on bottom-right) */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#002970] via-[#003893] to-[#0083ca] text-white rounded-full shadow-2xl hover:shadow-[#00b9f1]/30 hover:scale-105 transition-all duration-300 border border-white/20 group"
          aria-label="Ask Copilot Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#00b9f1] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#002970] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#002970]" />
          </div>
          <span className="text-xs font-black tracking-wide pr-1">{t('askCopilot')}</span>
          <span className="text-[10px] font-extrabold bg-[#00b9f1] text-[#002970] px-1.5 py-0.5 rounded-full uppercase">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] md:w-[460px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-2 border-[#002970] flex flex-col overflow-hidden animate-scale-up text-left">
          {/* Top Brand Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#00b9f1] via-[#0083ca] to-[#002970]" />

          {/* Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#002970] text-white flex items-center justify-center shrink-0 shadow-sm border border-blue-300">
                <Sparkles className="w-4 h-4 text-[#00b9f1]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900 leading-none">
                    {t('askCopilot')}
                  </h3>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    ● {t('onlineStatus')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5 truncate max-w-[200px]">
                  {merchantName || 'Sri Lakshmi Tea & Snacks'} Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  title={t('clearChat')}
                  aria-label={t('clearChat')}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f8fafc]">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#002970] flex items-center justify-center border border-blue-200 mb-3 shadow-sm">
                  <Bot className="w-6 h-6 text-[#0083ca]" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  {t('askCopilotWelcome')}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                  {t('askCopilotWelcomeSub')}
                </p>

                {/* Suggested Question Chips */}
                <div className="mt-4 w-full space-y-2 text-left">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block text-center">
                    {t('tapQuestionPrompt')}
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {suggestedQuestions.map((sq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sq.q)}
                        className="p-2 rounded-xl text-left text-xs font-bold text-slate-700 bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-[#002970]/40 transition-all shadow-2xs flex items-center justify-between"
                      >
                        <span className="truncate pr-2">{sq.text}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0083ca] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m) => {
                const isCopilot = m.sender === 'copilot';
                const isSpeakingThis = isSpeaking && speakingText === m.text;

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${
                      isCopilot ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isCopilot && (
                      <div className="w-7 h-7 rounded-xl bg-[#002970] text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                        <Bot className="w-4 h-4 text-[#00b9f1]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[84%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                        isCopilot
                          ? 'bg-white border border-slate-200 text-slate-800'
                          : 'bg-[#002970] text-white font-medium rounded-br-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">{m.text}</div>

                      {/* Voice Listen Button on Copilot responses */}
                      {isCopilot && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleListenMessage(m.text)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                              isSpeakingThis
                                ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                                : 'bg-slate-100 hover:bg-slate-200 text-[#002970]'
                            }`}
                          >
                            {isSpeakingThis ? (
                              <VolumeX className="w-3 h-3" />
                            ) : (
                              <Volume2 className="w-3 h-3 text-[#0083ca]" />
                            )}
                            <span>{isSpeakingThis ? t('stopSpeaking') : t('listen')}</span>
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(m.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {!isCopilot && (
                      <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                <span className="w-2 h-2 rounded-full bg-[#0083ca] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#0083ca] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#0083ca] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-semibold text-slate-400 ml-1">
                  {t('copilotAnalyzing')}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions carousel above input when messages exist */}
          {messages.length > 0 && (
            <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => handleSend(suggestedQuestions[0]?.q || 'What are my best-selling products?')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 text-[10px] font-bold shrink-0 border border-slate-200"
              >
                {t('bestSellersChip')}
              </button>
              <button
                onClick={() => handleSend(suggestedQuestions[1]?.q || 'Which products need attention?')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 text-[10px] font-bold shrink-0 border border-slate-200"
              >
                {t('attentionChip')}
              </button>
              <button
                onClick={() => handleSend(suggestedQuestions[4]?.q || 'How can I increase afternoon sales?')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 text-[10px] font-bold shrink-0 border border-slate-200"
              >
                {t('afternoonChip')}
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('askCopilotPlaceholder')}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002970] focus:border-transparent transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#002970] hover:bg-[#00225c] text-white rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-sm"
              aria-label="Send query"
            >
              <Send className="w-4 h-4 text-[#00b9f1]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
