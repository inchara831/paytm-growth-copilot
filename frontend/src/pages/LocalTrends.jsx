import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  RefreshCw,
  TrendingUp,
  Users,
  Receipt,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  Tag,
  CheckCircle2,
  MapPin,
  Activity,
} from 'lucide-react';
import apiService from '../services/api';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OfflineState from '../components/common/OfflineState';
import { useLanguage } from '../context/LanguageContext';

export default function LocalTrends() {
  const navigate = useNavigate();
  const { t, language, speak, isSpeaking, stopSpeaking, speakingText } = useLanguage();

  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getNetworkIntelligence();
      setNetworkData(data || []);
    } catch (err) {
      console.error('Failed to load local trends:', err);
      setError(err.message || 'Error fetching local trends from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  // Multi-lingual actionable advice texts
  const adviceContent = {
    en: {
      headline: "💡 What You Can Do in Your Area",
      insight: "High Customer Visits, Small Bills",
      desc: "Your area (BTM Layout) has strong customer footfall with 6,191 visits, but the average bill is ₹31.",
      action: "Offer a ₹20 Tea + Biscuit or Samosa combo to encourage customers to add a snack and lift your average bill to ₹36+.",
      profitBadge: "Expected Extra Profit: ₹180 – ₹240/day",
      speechText: "Your area has high customer footfall, but the average bill is 31 rupees. Try a Tea and Snack combo to lift your average bill. Expected extra profit is 180 to 240 rupees per day.",
      createOffer: "Create Combo Offer",
      listen: "Listen",
      card1Title: "Business Activity Levels",
      card1Sub: "Customer footfall pace",
      card2Title: "Total Customer Visits",
      card2Sub: "Recorded across 10 areas",
      card3Title: "Average Customer Bill",
      card3Sub: "Typical spend per visit",
      card4Title: "Top Spending Hubs",
      card4Sub: "Highest business done",
      breakdownTitle: "Customer Activity by Area",
      breakdownSub: "Traffic-light overview of customer visits in each area",
      highActivity: "High Activity",
      steadyActivity: "Steady Pace",
      slowActivity: "Slower Pace",
      visits: "visits",
      perBill: "/ bill",
    },
    hi: {
      headline: "💡 आपके इलाके के लिए आसान सुझाव",
      insight: "ग्राहक ज़्यादा, लेकिन बिल छोटा",
      desc: "आपके क्षेत्र (BTM लेआउट) में 6,191 ग्राहक आए, लेकिन औसत बिल केवल ₹31 है।",
      action: "चाय के साथ ₹20 का बिस्कुट या समोसा कॉम्बो लगाएं ताकि ग्राहक बिल में स्नैक जोड़ें और औसत बिल ₹36+ हो जाए।",
      profitBadge: "अनुमानित अतिरिक्त मुनाफ़ा: ₹180 – ₹240/दिन",
      speechText: "आपके क्षेत्र में ग्राहकों की भीड़ अच्छी है लेकिन औसत बिल 31 रुपये है। चाय और स्नैक्स का कॉम्बो ऑफ़र दें जिससे बिल का आकार बढ़े। रोज़ाना 180 से 240 रुपये का अतिरिक्त मुनाफ़ा हो सकता है।",
      createOffer: "कॉम्बो ऑफ़र बनाएं",
      listen: "बोलकर सुनें",
      card1Title: "इलाकों में हलचल",
      card1Sub: "ग्राहकों की आवाजाही",
      card2Title: "कुल ग्राहक विज़िट्स",
      card2Sub: "10 इलाकों का कुल जोड़",
      card3Title: "औसत बिल ख़र्च",
      card3Sub: "प्रति ग्राहक औसत ख़रीद",
      card4Title: "सबसे सक्रिय इलाके",
      card4Sub: "जहाँ सबसे ज़्यादा ख़रीद हुई",
      breakdownTitle: "इलाके के हिसाब से ग्राहक संख्या",
      breakdownSub: "ट्रैफ़िक लाइट के साथ देखें कहाँ कैसी बिक्री है",
      highActivity: "ज़्यादा ग्राहक",
      steadyActivity: "मध्यम गति",
      slowActivity: "धीमी गति",
      visits: "विज़िट्स",
      perBill: "/ बिल",
    },
    kn: {
      headline: "💡 ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಸೂಕ್ತ ವ್ಯಾಪಾರ ಸಲಹೆ",
      insight: "ಗ್ರಾಹಕರು ಹೆಚ್ಚು, ಆದರೆ ಸಣ್ಣ ಬಿಲ್",
      desc: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ (BTM ಲೇಔಟ್) 6,191 ಗ್ರಾಹಕರು ಬಂದಿದ್ದಾರೆ, ಆದರೆ ಸರಾಸರಿ ಬಿಲ್ ಕೇವಲ ₹31 ಆಗಿದೆ.",
      action: "ಗ್ರಾಹಕರು ತಿಂಡಿ ಖರೀದಿಸಲು ಪ್ರೇರೇಪಿಸಲು ₹20 ರ ಚಹಾ + ಬಿಸ್ಕತ್ತು ಅಥವಾ ಸಮೋಸಾ ಕಾಂಬೋ ನೀಡಿ, ಸರಾಸರಿ ಬಿಲ್ ₹36+ ಗೆ ಹೆಚ್ಚಿಸಿ.",
      profitBadge: "ನಿರೀಕ್ಷಿತ ಹೆಚ್ಚುವರಿ ಲಾಭ: ದಿನಕ್ಕೆ ₹180 – ₹240",
      speechText: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ ಹೆಚ್ಚಾಗಿದೆ ಆದರೆ ಸರಾಸರಿ ಬಿಲ್ 31 ರೂಪಾಯಿ ಇದೆ. ಬಿಲ್ ಮೊತ್ತ ಹೆಚ್ಚಿಸಲು ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ. ದಿನಕ್ಕೆ 180 ರಿಂದ 240 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.",
      createOffer: "ಕಾಂಬೋ ಆಫರ್ ರಚಿಸಿ",
      listen: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
      card1Title: "ವ್ಯಾಪಾರ ಚಟುವಟಿಕೆ",
      card1Sub: "ಗ್ರಾಹಕರ ಬರುವಿಕೆ ಪ್ರಮಾಣ",
      card2Title: "ಒಟ್ಟು ಗ್ರಾಹಕ ಪಾವತಿಗಳು",
      card2Sub: "10 ಪ್ರದೇಶಗಳ ಒಟ್ಟು ಸಂಖ್ಯೆ",
      card3Title: "ಸರಾಸರಿ ಗ್ರಾಹಕ ಬಿಲ್",
      card3Sub: "ಪ್ರತಿ ಭೇಟಿಯ ಸರಾಸರಿ ಖರ್ಚು",
      card4Title: "ಹೆಚ್ಚು ವ್ಯಾಪಾರವಾದ ಜಾಗಗಳು",
      card4Sub: "ಅತಿ ಹೆಚ್ಚು ಹಣ ಖರ್ಚಾದ ಪ್ರದೇಶ",
      breakdownTitle: "ಪ್ರದೇಶವಾರು ಗ್ರಾಹಕರ ಚಟುವಟಿಕೆ",
      breakdownSub: "ಟ್ರಾಫಿಕ್ ಲೈಟ್ ಸೂಚನೆಯೊಂದಿಗೆ ಗ್ರಾಹಕರ ದಟ್ಟಣೆ ನೋಡಿ",
      highActivity: "ಹೆಚ್ಚು ವ್ಯಾಪಾರ",
      steadyActivity: "ಸ್ಥಿರ ವ್ಯಾಪಾರ",
      slowActivity: "ನಿಧಾನ ವ್ಯಾಪಾರ",
      visits: "ಗ್ರಾಹಕರು",
      perBill: "/ ಬಿಲ್",
    },
    ta: {
      headline: "💡 உங்கள் பகுதிக்கான எளிய வணிக ஆலோசனை",
      insight: "அதிக வாடிக்கையாளர்கள், குறைந்த பில்",
      desc: "உங்கள் பகுதியில் (BTM லேஅவுட்) 6,191 வாடிக்கையாளர்கள் வந்துள்ளனர், ஆனால் சராசரி பில் ₹31 மட்டுமே.",
      action: "டீயுடன் ₹20 பிஸ்கட் அல்லது சமோசா காம்போ ஆஃபர் தந்து சராசரி பில் மதிப்பை ₹36+ ஆக உயர்த்துங்கள்.",
      profitBadge: "எதிர்பார்க்கப்படும் கூடுதல் லாபம்: ₹180 – ₹240/நாள்",
      speechText: "உங்கள் பகுதியில் வாடிக்கையாளர் கூட்டம் அதிகம், ஆனால் சராசரி பில் ₹31 மட்டுமே. பில் மதிப்பை உயர்த்த டீ மற்றும் ஸ்நாக்ஸ் காம்போ ஆஃபர் தரவும். தினமும் ₹180 முதல் ₹240 வரை கூடுதல் லாபம் கிடைக்கும்.",
      createOffer: "காம்போ ஆஃபர் உருவாக்கு",
      listen: "குரலில் கேட்க",
      card1Title: "பகுதிகளின் வணிக வேகம்",
      card1Sub: "வாடிக்கையாளர் வருகை நிலை",
      card2Title: "மொத்த வாடிக்கையாளர்கள்",
      card2Sub: "10 பகுதிகளின் மொத்த எண்ணிக்கை",
      card3Title: "சராசரி பில் மதிப்பு",
      card3Sub: "ஒரு வாடிக்கையாளரின் சராசரி",
      card4Title: "அதிக விற்பனையான பகுதிகள்",
      card4Sub: "அதிக பணம் செலவிடப்பட்ட இடம்",
      breakdownTitle: "பகுதிகள் வாரியாக வாடிக்கையாளர் வருகை",
      breakdownSub: "டிராஃபிக் சிக்னல் குறியீட்டுடன் எளிதாக பாருங்கள்",
      highActivity: "அதிக கூட்டம்",
      steadyActivity: "மிதமான வேகம்",
      slowActivity: "மெதுவான வேகம்",
      visits: "வருகைகள்",
      perBill: "/ பில்",
    },
    te: {
      headline: "💡 మీ ప్రాంతానికి ఉపయోగకరమైన సలహా",
      insight: "ఎక్కువ మంది కస్టమర్లు, చిన్న బిల్లు",
      desc: "మీ ప్రాంతంలో (BTM లేఅవుట్) 6,191 మంది కస్టమర్లు వచ్చారు, కానీ సగటు బిల్లు ₹31 మాత్రమే.",
      action: "కస్టమర్లు స్నాక్స్ కొనేలా ప్రోత్సహించడానికి ₹20 టీ + బిస్కెట్ లేదా సమోసా కాంబో ఇచ్చి సగటు బిల్లును ₹36+ చేయండి.",
      profitBadge: "అదనపు లాభం అంచనా: రోజుకు ₹180 – ₹240",
      speechText: "మీ ప్రాంతంలో కస్టమర్ల రద్దీ ఎక్కువగా ఉంది కానీ సగటు బిల్లు ₹31 మాత్రమే. బిల్లు మొత్తాన్ని పెంచడానికి టీ మరియు స్నాక్స్ కాంబో ఆఫర్ ఇవ్వండి. రోజుకు ₹180 నుండి ₹240 వరకు అదనపు లాభం పొందవచ్చు.",
      createOffer: "కాంబో ఆఫర్ చేయండి",
      listen: "వినండి",
      card1Title: "వ్యాపార కార్యకలాపాలు",
      card1Sub: "కస్టమర్ల రాకపోకల స్థాయి",
      card2Title: "మొత్తం కస్టమర్ చెల్లింపులు",
      card2Sub: "10 ప్రాంతాల మొత్తం లెక్క",
      card3Title: "సగటు కస్టమర్ బిల్లు",
      card3Sub: "ఒక్కో విజిట్ సగటు ఖర్చు",
      card4Title: "ఎక్కువ అమ్మకాలు జరిగిన ప్రాంతాలు",
      card4Sub: "అత్యధిక ఖర్చు చేసిన కేంద్రాలు",
      breakdownTitle: "ప్రాంతాల వారీగా కస్టమర్ రద్దీ",
      breakdownSub: "ట్రాఫిక్ లైట్ రంగులతో కస్టమర్ రద్దీని చూడండి",
      highActivity: "ఎక్కువ రద్దీ",
      steadyActivity: "స్థిరమైన రద్దీ",
      slowActivity: "తక్కువ రద్దీ",
      visits: "కస్టమర్లు",
      perBill: "/ బిల్లు",
    },
    ml: {
      headline: "💡 നിങ്ങളുടെ പ്രദേശത്തിനായുള്ള ബിസിനസ്സ് നിർദ്ദേശം",
      insight: "കൂടുതൽ ആളുകൾ, ചെറിയ ബില്ലുകൾ",
      desc: "നിങ്ങളുടെ പ്രദേശത്ത് (BTM ലേഔട്ട്) 6,191 ആളുകൾ വന്നെങ്കിലും ശരാശരി ബിൽ ₹31 മാത്രമാണ്.",
      action: "ചായയ്ക്കൊപ്പം ₹20 ബിസ്കറ്റ് അല്ലെങ്കിൽ സമോസ കോംബോ നൽകി ശരാശരി ബിൽ ₹36+ ആയി ഉയർത്തുക.",
      profitBadge: "പ്രതീക്ഷിക്കുന്ന അധിക ലാഭം: പ്രതിദിനം ₹180 – ₹240",
      speechText: "നിങ്ങളുടെ പ്രദേശത്ത് ഉപഭോക്താക്കൾ കൂടുതലാണ്, എന്നാൽ ശരാശരി ബിൽ ₹31 മാത്രമാണ്. ബിൽ തുക വർദ്ധിപ്പിക്കാൻ ചായയും ലഘുഭക്ഷണവും ചേർത്ത കോംബോ നൽകുക. ദിവസവും ₹180 മുതൽ ₹240 വരെ അധിക ലാഭം നേടാം.",
      createOffer: "കോംബോ ഓഫർ ഉണ്ടാക്കുക",
      listen: "കേൾക്കുക",
      card1Title: "ബിസിനസ്സ് വേഗത",
      card1Sub: "ആളുകളുടെ തിരക്കിന്റെ അളവ്",
      card2Title: "ആകെ ഉപഭോക്താക്കൾ",
      card2Sub: "10 പ്രദേശങ്ങളിലെ ആകെ കണക്ക്",
      card3Title: "ശരാശരി ബിൽ തുക",
      card3Sub: "ഒരു സന്ദർശനത്തിലെ ശരാശരി ചിലവ്",
      card4Title: "കൂടുതൽ ചിലവഴിച്ച കേന്ദ്രങ്ങൾ",
      card4Sub: "ഏറ്റവും കൂടുതൽ കച്ചവടം നടന്നത്",
      breakdownTitle: "പ്രദേശങ്ങൾ തിരിച്ചുള്ള ആളുകളുടെ തിരക്ക്",
      breakdownSub: "ട്രാഫിക് ലൈറ്റ് സൂചനകളോടെ എളുപ്പത്തിൽ കാണുക",
      highActivity: "കൂടുതൽ തിരക്ക്",
      steadyActivity: "സാധാരണ തിരക്ക്",
      slowActivity: "കുറഞ്ഞ തിരക്ക്",
      visits: "ആളുകൾ",
      perBill: "/ ബിൽ",
    },
    mr: {
      headline: "💡 तुमच्या भागासाठी सोपा व्यावसायिक सल्ला",
      insight: "ग्राहक भरपूर, पण बिल लहान",
      desc: "तुमच्या भागात (BTM लेआउट) ६,१९१ ग्राहक आले, पण सरासरी बिल फक्त ₹३१ आहे.",
      action: "ग्राहकांना स्नॅक्स घेण्यासाठी प्रवृत्त करण्यासाठी ₹२० चा चहा + बिस्किट किंवा समोसा कॉम्बो लावा आणि सरासरी बिल ₹३६+ करा.",
      profitBadge: "अपेक्षित अतिरिक्त नफा: दररोज ₹१८० – ₹२४०",
      speechText: "तुमच्या भागात ग्राहक भरपूर आहेत पण सरासरी बिल ₹३१ आहे. बिलाची रक्कम वाढवण्यासाठी चहा आणि स्नॅक्सचा कॉम्बो लावा. दररोज ₹१८० ते ₹२४० अतिरिक्त नफा मिळवा.",
      createOffer: "कॉम्बो ऑफर बनवा",
      listen: "ऐका",
      card1Title: "भागांमधील गती",
      card1Sub: "ग्राहकांची वर्दळ",
      card2Title: "एकूण ग्राहक खरेदी",
      card2Sub: "१० भागांची एकूण बेरीज",
      card3Title: "सरासरी ग्राहक बिल",
      card3Sub: "प्रत्येक खरेदीचा सरासरी खर्च",
      card4Title: "सर्वात जास्त खरेदी झालेली ठिकाणे",
      card4Sub: "जिथे सर्वात जास्त व्यवसाय झाला",
      breakdownTitle: "भागानुसार ग्राहकांची वर्दळ",
      breakdownSub: "ट्रॅफिक सिग्नल रंगांसह ग्राहकांची गर्दी पहा",
      highActivity: "जास्त गर्दी",
      steadyActivity: "मध्यम गर्दी",
      slowActivity: "कमी गर्दी",
      visits: "ग्राहक",
      perBill: "/ बिल",
    },
    bn: {
      headline: "💡 আপনার এলাকার জন্য সহজ পরামর্শ",
      insight: "ক্রেতা অনেক, কিন্তু বিল ছোট",
      desc: "আপনার এলাকায় (BTM লেআউট) ৬,১৯১ জন ক্রেতা এসেছেন, কিন্তু গড় বিল মাত্র ৩১ টাকা।",
      action: "চায়ের সাথে ২০ টাকার বিস্কুট বা সমোসা কম্বো অফার দিয়ে গড় বিলের পরিমাণ ৩৬+ টাকায় বাড়ান।",
      profitBadge: "প্রত্যাশিত অতিরিক্ত লাভ: প্রতিদিন ₹১৮০ – ₹২৪০",
      speechText: "আপনার এলাকায় খদ্দেরের ভিড় ভালো কিন্তু গড় বিল ৩১ টাকা। বিলের আকার বাড়াতে চা ও স্ন্যাক্স কম্বো অফার দিন। প্রতিদিন ১৮০ থেকে ২৪০ টাকা পর্যন্ত অতিরিক্ত লাভ করুন।",
      createOffer: "কম্বো অফার বানান",
      listen: "শুনুন",
      card1Title: "এলাকাভিত্তিক বেচাকেনার গতি",
      card1Sub: "ক্রেতাদের যাতায়াত ও ভিড়",
      card2Title: "মোট ক্রেতার সংখ্যা",
      card2Sub: "১০টি এলাকার মোট যোগফল",
      card3Title: "গড় ক্রেতার বিল",
      card3Sub: "প্রতি বারের গড় কেনাকাটা",
      card4Title: "সবচেয়ে বেশি বিক্রি হওয়া এলাকা",
      card4Sub: "যেখানে সবচেয়ে বেশি ব্যবসা হয়েছে",
      breakdownTitle: "এলাকা অনুযায়ী ক্রেতার উপস্থিতি",
      breakdownSub: "ট্রাফিক লাইট রঙের মাধ্যমে সহজ নজর",
      highActivity: "বেশি ভিড়",
      steadyActivity: "স্বাভাবিক গতি",
      slowActivity: "ধীর গতি",
      visits: "ক্রেতা",
      perBill: "/ বিল",
    },
  };

  const text = adviceContent[language] || adviceContent.en;

  if (loading) {
    return <LoadingSpinner message={t('loading')} size="lg" />;
  }

  if (error) {
    return (
      <OfflineState
        title="Could Not Load Local Business Pulse"
        message={error}
        onRetry={fetchTrends}
      />
    );
  }

  // Real backend calculations
  const totalOrders = networkData.reduce((acc, row) => acc + (row.transactions || 0), 0);
  const totalSales = networkData.reduce((acc, row) => acc + (row.revenue || 0), 0);
  const maxTxns = Math.max(...networkData.map((r) => r.transactions || 0), 1);

  // Top 2 hubs revenue combined
  const topHubsSales = (networkData[0]?.revenue || 0) + (networkData[1]?.revenue || 0);

  const isCurrentSpeaking = isSpeaking && speakingText === text.speechText;

  const handleListenAdvice = () => {
    if (isCurrentSpeaking) {
      stopSpeaking();
    } else {
      speak(text.speechText, language);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-blue-50 text-[#002970] border border-blue-100">
              <Activity className="w-4 h-4 text-[#0083ca]" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Local Business Pulse
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            What's Happening Around Shops Like Yours
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Understand customer footfall and spending patterns in your neighborhood within 2–3 seconds.
          </p>
        </div>

        <button
          onClick={fetchTrends}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Hero Actionable Insight Card (Convert data into direct profit action) */}
      <div className="bg-gradient-to-br from-white via-blue-50/40 to-sky-50/50 rounded-3xl border-2 border-[#002970] p-6 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Top cyan accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00b9f1] via-[#0083ca] to-[#002970]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#002970] text-white text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#00b9f1]" />
                <span>{text.headline}</span>
              </span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                🟢 {text.insight}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700 leading-snug">
              {text.desc}
            </p>

            <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
              👉 {text.action}
            </p>

            <div className="inline-block bg-white border border-emerald-200 rounded-xl px-3 py-1 text-xs font-black text-emerald-700 shadow-sm mt-1">
              +{text.profitBadge}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() =>
                navigate(
                  `/offers?action=create&bundle=${encodeURIComponent(
                    'Afternoon Tea + Snack Combo'
                  )}`
                )
              }
              className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002970] hover:bg-[#00225c] text-white rounded-xl text-xs font-extrabold shadow-md transition-all"
            >
              <Tag className="w-4 h-4 text-[#00b9f1]" />
              <span>{text.createOffer}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleListenAdvice}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isCurrentSpeaking
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                  : 'bg-white hover:bg-slate-100 text-[#002970] border border-slate-200'
              }`}
            >
              {isCurrentSpeaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#0083ca]" />
              )}
              <span>
                {isCurrentSpeaking ? t('stopSpeaking') : `${text.listen} (${language.toUpperCase()})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 4 Visual Overview Cards (Traffic Lights, Large Numbers, Icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Traffic Light Activity Levels */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              {text.card1Title}
            </span>
            <span className="text-sm">🚦</span>
          </div>

          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span>🟢</span>
                <span>{text.highActivity}</span>
              </span>
              <span className="text-slate-800">2 areas</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-amber-600">
                <span>🟡</span>
                <span>{text.steadyActivity}</span>
              </span>
              <span className="text-slate-800">5 areas</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-rose-600">
                <span>🔴</span>
                <span>{text.slowActivity}</span>
              </span>
              <span className="text-slate-800">3 areas</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-3 border-t border-slate-100 pt-2">
            Your store is in a 🟢 High Activity cluster
          </p>
        </div>

        {/* Card 2: Total Customer Payments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              {text.card2Title}
            </span>
            <Users className="w-4 h-4 text-[#0083ca]" />
          </div>

          <p className="text-3xl font-black text-slate-900 mt-2">
            {totalOrders.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit border border-emerald-100">
            <span>🟢</span>
            <span>BTM Layout: 6,191 visits</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">
            {text.card2Sub}
          </p>
        </div>

        {/* Card 3: Average Customer Bill */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              {text.card3Title}
            </span>
            <Receipt className="w-4 h-4 text-[#002970]" />
          </div>

          <p className="text-3xl font-black text-[#002970] mt-2">
            ₹31 – ₹36
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg w-fit border border-amber-100">
            <span>🟡</span>
            <span>Local average: ₹33 / bill</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">
            {text.card3Sub}
          </p>
        </div>

        {/* Card 4: Top Spending Hubs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              {text.card4Title}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>

          <p className="text-3xl font-black text-slate-900 mt-2">
            ₹{(topHubsSales / 100000).toFixed(2)}L
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-lg w-fit border border-slate-200">
            <span>🏪</span>
            <span>BTM & Koramangala</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2">
            Accounts for 28.5% of neighborhood sales
          </p>
        </div>
      </div>

      {/* 4. Simple Visual Area Activity List (Replaces the large technical table!) */}
      <Card
        title={text.breakdownTitle}
        subtitle={text.breakdownSub}
      >
        <div className="space-y-3 pt-1">
          {networkData.map((row, idx) => {
            const avgBill =
              row.transactions > 0
                ? Math.round(row.revenue / row.transactions)
                : 0;

            const isHigh = row.transactions >= 5000;
            const isMedium = row.transactions >= 3000 && row.transactions < 5000;
            const isSlow = row.transactions < 3000;

            const statusColor = isHigh
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : isMedium
              ? 'text-amber-700 bg-amber-50 border-amber-200'
              : 'text-rose-700 bg-rose-50 border-rose-200';

            const statusDot = isHigh ? '🟢' : isMedium ? '🟡' : '🔴';
            const statusLabel = isHigh
              ? text.highActivity
              : isMedium
              ? text.steadyActivity
              : text.slowActivity;

            const pct = Math.round((row.transactions / maxTxns) * 100);
            const isYourShopArea = idx === 0;

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isYourShopArea
                    ? 'bg-blue-50/50 border-[#002970]/30 shadow-sm ring-1 ring-[#002970]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className="text-base">{statusDot}</span>
                    <div>
                      <span className="text-sm font-extrabold text-slate-900">
                        {row.location}
                      </span>
                      {isYourShopArea && (
                        <span className="ml-2 px-2 py-0.5 bg-[#002970] text-white text-[10px] font-extrabold rounded-full">
                          Your Shop Area
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${statusColor}`}
                    >
                      {statusLabel}
                    </span>

                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">
                        {row.transactions.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          {text.visits}
                        </span>
                      </span>
                      <span className="text-xs text-slate-400 font-semibold ml-2">
                        • ₹{avgBill} {text.perBill}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footfall Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isHigh
                        ? 'bg-emerald-500'
                        : isMedium
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Note at bottom */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
          <span>🔒</span>
          <span>
            {t('realNetworkDataNote')} Showing customer traffic patterns only. No competitor individual accounts are tracked.
          </span>
        </div>
      </Card>
    </div>
  );
}
