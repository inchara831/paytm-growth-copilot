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
      { text: '📅 How did my business perform last year?', q: 'How did my business perform last year?' },
      { text: '🔄 Compare this month with last month', q: 'Compare this month with last month.' },
      { text: '❓ Have I had this slow-hour problem before?', q: 'Have I had this slow-hour problem before?' },
    ],
    hi: [
      { text: '🔥 सबसे ज़्यादा बिकने वाला सामान कौन सा है?', q: 'सबसे ज़्यादा बिकने वाला सामान कौन सा है?' },
      { text: '⚠️ किन सामानों पर ध्यान देने की ज़रूरत है?', q: 'किन सामानों पर ध्यान देने की ज़रूरत है?' },
      { text: '💰 मेरी कुल बिक्री और मुनाफ़ा कितना है?', q: 'मेरी कुल बिक्री और मुनाफ़ा कितना है?' },
      { text: '📉 दोपहर में बिक्री कम क्यों होती है?', q: 'दोपहर में बिक्री कम क्यों होती है?' },
      { text: '⏰ दोपहर की बिक्री कैसे बढ़ाएं?', q: 'दोपहर की बिक्री कैसे बढ़ाएं?' },
      { text: '🎁 कौन सा ऑफ़र या कॉम्बो बनाना चाहिए?', q: 'कौन सा ऑफ़र या कॉम्बो बनाना चाहिए?' },
      { text: '📅 पिछले साल मेरा व्यापार कैसा रहा?', q: 'पिछले साल मेरा व्यापार कैसा रहा?' },
      { text: '🔄 पिछले महीने से तुलना करें', q: 'पिछले महीने से तुलना करें।' },
      { text: '❓ क्या यह मंदी पहले भी हुई है?', q: 'क्या दोपहर में मंदी पहले भी हुई है?' },
    ],
    kn: [
      { text: '🔥 ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು ಯಾವುವು?', q: 'ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು ಯಾವುವು?' },
      { text: '⚠️ ಯಾವ ಸರಕುಗಳಿಗೆ ಗಮನ ಹರಿಸಬೇಕು?', q: 'ಯಾವ ಸರಕುಗಳಿಗೆ ಗಮನ ಹರಿಸಬೇಕು?' },
      { text: '💰 ನನ್ನ ಮಾರಾಟ ಮತ್ತು ಅಂದಾಜು ಲಾಭ ಎಷ್ಟು?', q: 'ನನ್ನ ಮಾರಾಟ ಮತ್ತು ಅಂದಾಜು ಲಾಭ ಎಷ್ಟು?' },
      { text: '📉 ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವೇನು?', q: 'ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಲು ಕಾರಣವೇನು?' },
      { text: '⏰ ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು?', q: 'ಮಧ್ಯಾಹ್ನದ ಮಾರಾಟ ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು?' },
      { text: '🎁 ನಾನು ಯಾವ ಆಫರ್ ಆರಂಭಿಸಬೇಕು?', q: 'ನಾನು ಯಾವ ಆಫರ್ ಆರಂಭಿಸಬೇಕು?' },
      { text: '📅 ಕಳೆದ ವರ್ಷ ನನ್ನ ವ್ಯಾಪಾರ ಹೇಗಿತ್ತು?', q: 'ಕಳೆದ ವರ್ಷ ನನ್ನ ವ್ಯಾಪಾರ ಹೇಗಿತ್ತು?' },
      { text: '🔄 ಈ ತಿಂಗಳು ಮತ್ತು ಕಳೆದ ತಿಂಗಳ ಹೋಲಿಕೆ', q: 'ಈ ತಿಂಗಳು ಮತ್ತು ಕಳೆದ ತಿಂಗಳ ಹೋಲಿಕೆ ಮಾಡಿ.' },
      { text: '❓ ಈ ಮಧ್ಯಾಹ್ನದ ಸಮಸ್ಯೆ ಈ ಹಿಂದೆ ಬಂದಿತ್ತೇ?', q: 'ಈ ಮಧ್ಯಾಹ್ನದ ಸಮಸ್ಯೆ ಈ ಹಿಂದೆ ಬಂದಿತ್ತೇ?' },
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

  // Real LLM Copilot Chat Handler
  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: `msg_${Date.now()}_user`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputText('');
    setIsTyping(true);

    try {
      // Build conversation history payload for multi-turn follow-ups
      const historyPayload = updatedHistory.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      // Call REAL backend LLM endpoint with verified analytics and Cognee memory
      const response = await apiService.chatCopilot({
        message: query,
        conversation_history: historyPayload,
        language: 'auto', // Let backend auto-detect language from user's message
      });

      const botMsg = {
        id: `msg_${Date.now()}_bot`,
        sender: 'copilot',
        text: response.reply,
        structured_insight: response.structured_insight,
        language: response.language || 'en',
        provider: response.provider,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Copilot chat error:', err);
      const errorMsg = {
        id: `msg_${Date.now()}_bot`,
        sender: 'copilot',
        text: "I'm having trouble connecting to the business assistant. Please ensure the backend is running and try again.",
        language: 'en',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleListenMessage = (msgText, msgLang) => {
    if (isSpeaking && speakingText === msgText) {
      stopSpeaking();
    } else {
      speak(msgText, msgLang || language);
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

                      {/* Structured Insight Highlights if present */}
                      {isCopilot && m.structured_insight && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                          {m.structured_insight.what_to_do && (
                            <div>
                              <span className="text-[10px] font-bold text-[#002970] uppercase tracking-wider block">
                                Recommended Action
                              </span>
                              <span className="text-[11px] font-semibold text-slate-800">
                                {m.structured_insight.what_to_do}
                              </span>
                            </div>
                          )}
                          {m.structured_insight.expected_extra_profit_display && (
                            <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold text-[11px]">
                              <span>Expected Extra Profit:</span>
                              <span className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">
                                {m.structured_insight.expected_extra_profit_display}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Voice Listen Button on Copilot responses */}
                      {isCopilot && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleListenMessage(m.text, m.language)}
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
                          <div className="flex items-center gap-2">
                            {m.provider && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-[#002970] rounded-full uppercase border border-blue-200">
                                {m.provider === 'gemini' ? 'Gemini AI' : 'Copilot AI'}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(m.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
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
