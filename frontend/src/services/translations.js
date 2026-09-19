// Multilingual Dictionary and Localized Copilot Recommendations
// Supports 8 Indian Languages with Speech Tags:
// en: en-IN (English)
// hi: hi-IN (हिंदी - Hindi)
// kn: kn-IN (ಕನ್ನಡ - Kannada)
// ta: ta-IN (தமிழ் - Tamil)
// te: te-IN (తెలుగు - Telugu)
// ml: ml-IN (മലയാളം - Malayalam)
// mr: mr-IN (मराठी - Marathi)
// bn: bn-IN (বাংলা - Bengali)

export const translations = {
  en: {
    // Navigation
    navYourShop: "Your Shop",
    navWhatYouCanDo: "What You Can Do",
    navProducts: "Products",
    navOffers: "Offers",
    navLocalTrends: "Local Trends",
    navSettings: "Settings",
    navHelp: "Help",
    
    // Taglines & Brand
    appName: "Paytm Merchant",
    appSubname: "Business Assistant",
    tagline: "No Prompts. Just Profits.",
    shopName: "Sharma Tea & General Store",
    shopId: "Shop M001",
    verified: "Verified",
    
    // Header
    selectLanguage: "Language",
    backendConnected: "Connected",
    backendOffline: "Offline",
    listeningNow: "Speaking...",
    stopSpeaking: "Stop Voice",
    
    // Dashboard KPIs
    todaysBusiness: "Today's Business",
    todaysBusinessSub: "Here is how your shop is performing today",
    salesToday: "Today's Sales",
    profitToday: "Estimated Profit",
    paymentsCount: "Number of Payments",
    averageBill: "Average Bill",
    salesDesc: "Total money collected",
    profitDesc: "Profit after item costs",
    paymentsDesc: "Total customers served",
    averageBillDesc: "Average spent per customer",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 What You Can Do Today",
    whatYouCanDoSub: "Automatic suggestions to increase today's profit",
    listen: "Listen",
    createOffer: "Create Offer",
    activateOffer: "Activate Offer",
    viewSuggestion: "View Suggestion",
    expectedProfit: "Expected Extra Profit",
    perDay: "per day",
    
    // Hourly & Products
    salesByHour: "Sales by Hour",
    salesByHourSub: "Green indicates busy peak hours, orange indicates slow hours",
    busyHours: "Busy Hours",
    slowHours: "Slow Hours",
    slowHoursDetected: "Slow hours detected between 3:00 PM – 5:00 PM and early morning.",
    allProducts: "All Products",
    bestSellingProducts: "Best-Selling Products",
    bestSellingSub: "Your top revenue generators ranked by sales",
    productsNeedingAttention: "Products That Need Attention",
    productsNeedingAttentionSub: "Items that need bundling, clearance, or special focus",
    productName: "Product Name",
    quantitySold: "Quantity Sold",
    totalSales: "Total Sales",
    price: "Price",
    attentionReason: "Why It Needs Attention",
    makeCombo: "Make Combo",
    sold: "sold",
    units: "units",
    
    // Specific reasons for attention items
    reasonLemonTea: "Dormant Stock: 0 sales in 90 days with 250 units trapped on shelf. Recommended to bundle with hot Tea.",
    reasonVadaPav: "Low Footfall: Lower sales volume (275 units, ₹9,625) compared to Samosa. Bundle with afternoon Tea.",
    reasonBiscuits: "Lowest Revenue: Generates ₹7,420 total sales with 45% margin. Bundle as ₹20 tea-time add-on.",
    
    // Basket Inference
    likelyItemsTitle: "Likely Items in This Payment",
    likelyItemsSub: "Based on your past sales",
    confidenceHigh: "Confidence: High",
    confidenceMedium: "Confidence: Medium",
    basketDisclaimer: "Note: These are estimated companion items based on purchase habits, not confirmed orders.",
    frequentlyBoughtTogether: "Frequently bought together",
    
    // Copilot 4 parts
    copilotTitle: "💡 What You Can Do (Growth Copilot)",
    copilotSub: "Automatic business advice tailored to your shop. No prompts needed.",
    whatIsHappening: "WHAT IS HAPPENING?",
    whyDoesItMatter: "WHY DOES IT MATTER?",
    whatShouldIDo: "WHAT SHOULD I DO?",
    expectedExtraProfit: "EXPECTED EXTRA PROFIT",
    
    // Offers
    offersTitle: "Offers & Combos",
    offersSub: "Run simple promotions to bring in more customers during slow hours",
    suggestedOffers: "Suggested Offers For You",
    suggestedOffersSub: "Smart combos calculated to boost profit without hurting your margins",
    activeOffers: "Active Offers in Your Shop",
    createSimpleOffer: "Create a Simple Offer",
    offerTitleLabel: "Offer or Combo Name",
    offerTypeLabel: "Offer Type",
    discountLabel: "Discount",
    bestTimeLabel: "Best Time to Run",
    targetProductLabel: "Product or Bundle",
    reasonLabel: "Why this works",
    saveAndActivate: "Save & Activate Offer",
    
    // Local Trends
    localTrendsTitle: "Local Business Trends",
    localTrendsSub: "What's happening around shops like yours in this area",
    realNetworkDataNote: "Based on actual aggregated transaction activity across regions.",
    
    // Alert & Modal
    alertTitle: "💡 Important Opportunity for Your Shop",
    alertDismiss: "Dismiss for Now",
    alertAction: "View Suggestion",
    takeAction: "Take Action",
    closeModal: "Close",
    
    // Voice
    voiceTestSample: "Welcome to Paytm Merchant Assistant. No prompts, just profits.",
    voiceUnavailable: "Voice synthesis for this language is not installed on your device/browser. Text is displayed on screen.",
    
    // Common
    loading: "Loading information...",
    retry: "Retry Connection",
  },
  
  hi: {
    // Navigation
    navYourShop: "आपकी दुकान",
    navWhatYouCanDo: "आज क्या करें",
    navProducts: "सामान (उत्पाद)",
    navOffers: "ऑफ़र और कॉम्बो",
    navLocalTrends: "बाज़ार का रुझान",
    navSettings: "सेटिंग्स",
    navHelp: "मदद",
    
    // Taglines & Brand
    appName: "पेटीएम मर्चेंट",
    appSubname: "बिज़नेस साथी",
    tagline: "कोई झंझट नहीं, सिर्फ़ मुनाफ़ा।",
    shopName: "शर्मा टी एवं जनरल स्टोर",
    shopId: "दुकान M001",
    verified: "वेरिफाइड",
    
    // Header
    selectLanguage: "भाषा",
    backendConnected: "कनेक्टेड",
    backendOffline: "ऑफ़लाइन",
    listeningNow: "बोल रहा है...",
    stopSpeaking: "आवाज़ बंद करें",
    
    // Dashboard KPIs
    todaysBusiness: "आज का कारोबार",
    todaysBusinessSub: "देखें आज आपकी दुकान में कैसा काम चल रहा है",
    salesToday: "आज की कुल बिक्री",
    profitToday: "अनुमानित मुनाफ़ा",
    paymentsCount: "कुल पेमेंट्स",
    averageBill: "औसत बिल",
    salesDesc: "दुकान में आया कुल पैसा",
    profitDesc: "लागत निकालने के बाद की बचत",
    paymentsDesc: "ग्राहकों की संख्या",
    averageBillDesc: "प्रति ग्राहक औसत ख़रीद",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 आज आप क्या कर सकते हैं",
    whatYouCanDoSub: "दुकान की बिक्री और मुनाफ़ा बढ़ाने के आसान सुझाव",
    listen: "सुनें (बोलकर)",
    createOffer: "ऑफ़र बनाएं",
    activateOffer: "ऑफ़र चालू करें",
    viewSuggestion: "सुझाव देखें",
    expectedProfit: "अनुमानित अतिरिक्त मुनाफ़ा",
    perDay: "प्रति दिन",
    
    // Hourly & Products
    salesByHour: "घंटे के हिसाब से बिक्री",
    salesByHourSub: "हरा रंग व्यस्त समय और नारंगी धीमा समय दिखाता है",
    busyHours: "व्यस्त समय",
    slowHours: "धीमा समय",
    slowHoursDetected: "दोपहर 3 बजे से 5 बजे तक दुकान में ग्राहक कम आते हैं।",
    allProducts: "सभी सामान (ऑल प्रोडक्ट्स)",
    bestSellingProducts: "सबसे ज़्यादा बिकने वाला सामान",
    bestSellingSub: "वे सामान जिनसे सबसे ज़्यादा कमाई होती है",
    productsNeedingAttention: "जिन सामानों पर ध्यान चाहिए",
    productsNeedingAttentionSub: "धीमे बिकने वाले सामान जिन्हें कॉम्बो में बेचना बेहतर है",
    productName: "सामान का नाम",
    quantitySold: "बिके पीस",
    totalSales: "कुल बिक्री",
    price: "दाम (मूल्य)",
    attentionReason: "ध्यान क्यों चाहिए (कारण)",
    makeCombo: "कॉम्बो बनाएं",
    sold: "बिके",
    units: "पीस",
    
    // Specific reasons for attention items
    reasonLemonTea: "ठहरा हुआ स्टॉक: 90 दिनों में 0 बिक्री, 250 पीस अलमारी में फंसे हैं। गर्म चाय के साथ कॉम्बो बनाएं।",
    reasonVadaPav: "कम ग्राहक: समोसे (3,133 बिक्री) की तुलना में कम बिक्री (275 पीस)। दोपहर की चाय के साथ जोड़ें।",
    reasonBiscuits: "सबसे कम आमदनी: कुल ₹7,420 की बिक्री और 45% मार्जिन। चाय या कॉफ़ी के साथ ₹20 का कॉम्बो जोड़ें।",
    
    // Basket Inference
    likelyItemsTitle: "इस पेमेंट में संभावित सामान",
    likelyItemsSub: "आपकी पुरानी बिक्री के आधार पर",
    confidenceHigh: "भरोसा: बहुत पक्का (High)",
    confidenceMedium: "भरोसा: मध्यम (Medium)",
    basketDisclaimer: "ध्यान दें: यह ग्राहकों की पुरानी आदतों का अनुमान है, पक्का ऑर्डर नहीं।",
    frequentlyBoughtTogether: "अक्सर साथ में ख़रीदे जाने वाले सामान",
    
    // Copilot 4 parts
    copilotTitle: "💡 आज क्या करें (ग्रोथ साथी)",
    copilotSub: "आपकी दुकान के लिए तैयार की गई व्यापार सलाह। बिना किसी सवाल पूछे।",
    whatIsHappening: "क्या हो रहा है?",
    whyDoesItMatter: "यह क्यों ज़रूरी है?",
    whatShouldIDo: "आपको क्या करना चाहिए?",
    expectedExtraProfit: "अपेक्षित अतिरिक्त मुनाफ़ा",
    
    // Offers
    offersTitle: "ऑफ़र और कॉम्बो",
    offersSub: "धीमे समय में ग्राहकों को खींचने के लिए सरल ऑफ़र चलाएं",
    suggestedOffers: "आपके लिए सुझाए गए ऑफ़र",
    suggestedOffersSub: "मुनाफ़ा सुरक्षित रखते हुए बिक्री बढ़ाने वाले तैयार कॉम्बो",
    activeOffers: "दुकान में चालू ऑफ़र",
    createSimpleOffer: "नया सरल ऑफ़र बनाएं",
    offerTitleLabel: "ऑफ़र या कॉम्बो का नाम",
    offerTypeLabel: "ऑफ़र का प्रकार",
    discountLabel: "छूट (डिस्काउंट)",
    bestTimeLabel: "चलाने का सबसे सही समय",
    targetProductLabel: "सामान या बंडल",
    reasonLabel: "यह क्यों काम करेगा",
    saveAndActivate: "ऑफ़र सहेजें और चालू करें",
    
    // Local Trends
    localTrendsTitle: "आस-पास का बाज़ार रुझान",
    localTrendsSub: "आपकी जैसी अन्य दुकानों में क्या चल रहा है",
    realNetworkDataNote: "वास्तविक क्षेत्रीय लेन-देन आंकड़ों पर आधारित।",
    
    // Alert & Modal
    alertTitle: "💡 आपकी दुकान के लिए एक बड़ा मौक़ा है",
    alertDismiss: "अभी छोड़ें",
    alertAction: "सुझाव देखें",
    takeAction: "कार्रवाई करें",
    closeModal: "बंद करें",
    
    // Voice
    voiceTestSample: "पेटीएम मर्चेंट बिज़नेस साथी में आपका स्वागत है। कोई झंझट नहीं, सिर्फ़ मुनाफ़ा।",
    voiceUnavailable: "आपके डिवाइस या ब्राउज़र में हिंदी आवाज़ (hi-IN) उपलब्ध नहीं है। स्क्रीन पर लिखा अनुवाद दिखाया जा रहा है।",
    
    // Common
    loading: "जानकारी लोड हो रही है...",
    retry: "फिर से कनेक्ट करें",
  },
  
  kn: {
    // Navigation
    navYourShop: "ನಿಮ್ಮ ಅಂಗಡಿ",
    navWhatYouCanDo: "ನೀವು ಏನು ಮಾಡಬಹುದು",
    navProducts: "ಸರಕುಗಳು",
    navOffers: "ಆಫರ್‌ಗಳು ಮತ್ತು ಕಾಂಬೋ",
    navLocalTrends: "ಸ್ಥಳೀಯ ಟ್ರೆಂಡ್‌ಗಳು",
    navSettings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    navHelp: "ಸಹಾಯ",
    
    // Taglines & Brand
    appName: "ಪೇಟಿಎಂ ಮರ್ಚೆಂಟ್",
    appSubname: "ವ್ಯಾಪಾರ ಸಹಾಯಕ",
    tagline: "ಯಾವುದೇ ಗೊಂದಲವಿಲ್ಲ, ಕೇವಲ ಲಾಭ.",
    shopName: "ಶರ್ಮಾ ಟೀ ಮತ್ತು ಜನರಲ್ ಸ್ಟೋರ್",
    shopId: "ಅಂಗಡಿ M001",
    verified: "ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    
    // Header
    selectLanguage: "ಭಾಷೆ",
    backendConnected: "ಸಂಪರ್ಕಿತವಾಗಿದೆ",
    backendOffline: "ಆಫ್‌ಲೈನ್",
    listeningNow: "ಧ್ವನಿ ಓದುತ್ತಿದೆ...",
    stopSpeaking: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    
    // Dashboard KPIs
    todaysBusiness: "ಇಂದಿನ ವ್ಯಾಪಾರ",
    todaysBusinessSub: "ಇಂದು ನಿಮ್ಮ ಅಂಗಡಿಯ ವ್ಯಾಪಾರ ಹೇಗಿದೆ ನೋಡಿ",
    salesToday: "ಇಂದಿನ ಒಟ್ಟು ಮಾರಾಟ",
    profitToday: "ಅಂದಾಜು ಲಾಭ",
    paymentsCount: "ಪಾವತಿಗಳ ಸಂಖ್ಯೆ",
    averageBill: "ಸರಾಸರಿ ಬಿಲ್",
    salesDesc: "ಒಟ್ಟು ಬಂದ ಹಣ",
    profitDesc: "ವೆಚ್ಚ ಕಳೆದ ನಂತರ ಉಳಿದ ಲಾಭ",
    paymentsDesc: "ಬಂದ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ",
    averageBillDesc: "ಪ್ರತಿ ಗ್ರಾಹಕರು ಖರ್ಚು ಮಾಡಿದ ಸರಾಸರಿ",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 ಇಂದು ನೀವು ಏನು ಮಾಡಬಹುದು",
    whatYouCanDoSub: "ಇಂದಿನ ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸಲು ಸುಲಭ ಸಲಹೆಗಳು",
    listen: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
    createOffer: "ಆಫರ್ ರಚಿಸಿ",
    activateOffer: "ಆಫರ್ ಆರಂಭಿಸಿ",
    viewSuggestion: "ಸಲಹೆ ನೋಡಿ",
    expectedProfit: "ನಿರೀಕ್ಷಿತ ಹೆಚ್ಚುವರಿ ಲಾಭ",
    perDay: "ಪ್ರತಿದಿನ",
    
    // Hourly & Products
    salesByHour: "ಗಂಟೆಯ ಪ್ರಕಾರ ಮಾರಾಟ",
    salesByHourSub: "ಹಸಿರು ಬಣ್ಣವು ಬಿಡುವಿಲ್ಲದ ಸಮಯವನ್ನು ಮತ್ತು ಕಿತ್ತಳೆ ಬಣ್ಣವು ನಿಧಾನದ ಸಮಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ",
    busyHours: "ಹೆಚ್ಚು ವ್ಯಾಪಾರದ ಸಮಯ",
    slowHours: "ನಿಧಾನ ವ್ಯಾಪಾರದ ಸಮಯ",
    slowHoursDetected: "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಗ್ರಾಹಕರು ಕಡಿಮೆ ಬರುತ್ತಿದ್ದಾರೆ.",
    allProducts: "ಎಲ್ಲಾ ಸರಕುಗಳು",
    bestSellingProducts: "ಅತಿ ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ಸರಕುಗಳು",
    bestSellingSub: "ಹೆಚ್ಚು ಆದಾಯ ತರುವ ವಸ್ತುಗಳು",
    productsNeedingAttention: "ಗಮನ ಹರಿಸಬೇಕಾದ ಸರಕುಗಳು",
    productsNeedingAttentionSub: "ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಕಾಂಬೋ ಮಾಡಿ ಮಾರಿ",
    productName: "ವಸ್ತುವಿನ ಹೆಸರು",
    quantitySold: "ಮಾರಾಟವಾದ ಪ್ರಮಾಣ",
    totalSales: "ಒಟ್ಟು ಮಾರಾಟ",
    price: "ಬೆಲೆ",
    attentionReason: "ಗಮನ ಹರಿಸಲು ಕಾರಣ",
    makeCombo: "ಕಾಂಬೋ ಮಾಡಿ",
    sold: "ಮಾರಾಟ",
    units: "ಪೀಸ್",
    
    // Specific reasons for attention items
    reasonLemonTea: "ಖಾಲಿಯಾಗದ ಸ್ಟಾಕ್: 90 ದಿನಗಳಲ್ಲಿ 0 ಮಾರಾಟ, 250 ಪೀಸ್ ಸ್ಟಾಕ್ ಉಳಿದಿದೆ. ಬಿಸಿ ಚಹಾದೊಂದಿಗೆ ಕಾಂಬೋ ಮಾಡಿ ಮಾರಿ.",
    reasonVadaPav: "ಕಡಿಮೆ ವ್ಯಾಪಾರ: ಸಮೋಸಾಗೆ (3,133 ಮಾರಾಟ) ಹೋಲಿಸಿದರೆ ಕಡಿಮೆ ಮಾರಾಟ (275 ಪೀಸ್). ಮಧ್ಯಾಹ್ನ ಚಹಾದೊಂದಿಗೆ ಕಾಂಬೋ ಮಾಡಿ.",
    reasonBiscuits: "ಕಡಿಮೆ ಆದಾಯದ ಸರಕು: ಒಟ್ಟು ₹7,420 ಮಾರಾಟ ಮತ್ತು 45% ಲಾಭ. ಚಹಾ ಅಥವಾ ಕಾಫಿಯೊಂದಿಗೆ ₹20 ರ ಕಾಂಬೋ ಸೇರಿಸಿ.",
    
    // Basket Inference
    likelyItemsTitle: "ಈ ಪಾವತಿಯಲ್ಲಿ ಇರುವ ಸಂಭಾವ್ಯ ಸರಕುಗಳು",
    likelyItemsSub: "ಹಿಂದಿನ ಮಾರಾಟದ ಆಧಾರದ ಮೇಲೆ",
    confidenceHigh: "ಖಚಿತತೆ: ಹೆಚ್ಚು (High)",
    confidenceMedium: "ಖಚಿತತೆ: ಮಧ್ಯಮ (Medium)",
    basketDisclaimer: "ಗಮನಿಸಿ: ಇದು ಹಿಂದಿನ ಗ್ರಾಹಕರ ಅಭ್ಯಾಸದ ಅಂದಾಜು, ಖಚಿತ ಆರ್ಡರ್ ಅಲ್ಲ.",
    frequentlyBoughtTogether: "ಸಾಮಾನ್ಯವಾಗಿ ಒಟ್ಟಿಗೆ ಖರೀದಿಸುವ ವಸ್ತುಗಳು",
    
    // Copilot 4 parts
    copilotTitle: "💡 ನೀವು ಏನು ಮಾಡಬಹುದು (ಗ್ರೋತ್ ಸಹಾಯಕ)",
    copilotSub: "ನಿಮ್ಮ ಅಂಗಡಿಗೆ ಸೂಕ್ತವಾದ ಸುಲಭ ವ್ಯಾಪಾರ ಸಲಹೆಗಳು.",
    whatIsHappening: "ಏನು ನಡೆಯುತ್ತಿದೆ?",
    whyDoesItMatter: "ಇದು ಏಕೆ ಮುಖ್ಯ?",
    whatShouldIDo: "ನೀವು ಏನು ಮಾಡಬೇಕು?",
    expectedExtraProfit: "ನಿರೀಕ್ಷಿತ ಹೆಚ್ಚುವರಿ ಲಾಭ",
    
    // Offers
    offersTitle: "ಆಫರ್‌ಗಳು ಮತ್ತು ಕಾಂಬೋಗಳು",
    offersSub: "ನಿಧಾನದ ಸಮಯದಲ್ಲಿ ಗ್ರಾಹಕರನ್ನು ಆಕರ್ಷಿಸಲು ಆಫರ್ ಚಲಾಯಿಸಿ",
    suggestedOffers: "ನಿಮಗಾಗಿ ಸೂಚಿಸಲಾದ ಆಫರ್‌ಗಳು",
    suggestedOffersSub: "ಲಾಭವನ್ನು ರಕ್ಷಿಸುತ್ತಾ ವ್ಯಾಪಾರ ಹೆಚ್ಚಿಸುವ ಸಿದ್ಧ ಕಾಂಬೋಗಳು",
    activeOffers: "ಅಂಗಡಿಯಲ್ಲಿ ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆಫರ್‌ಗಳು",
    createSimpleOffer: "ಸರಳ ಆಫರ್ ರಚಿಸಿ",
    offerTitleLabel: "ಆಫರ್ ಅಥವಾ ಕಾಂಬೋ ಹೆಸರು",
    offerTypeLabel: "ಆಫರ್ ಮಾದರಿ",
    discountLabel: "ರಿಯಾಯಿತಿ (Discount)",
    bestTimeLabel: "ಚಲಾಯಿಸಲು ಉತ್ತಮ ಸಮಯ",
    targetProductLabel: "ಸರಕು ಅಥವಾ ಕಾಂಬೋ",
    reasonLabel: "ಇದು ಏಕೆ ಉಪಯುಕ್ತ",
    saveAndActivate: "ಆಫರ್ ಉಳಿಸಿ & ಆರಂಭಿಸಿ",
    
    // Local Trends
    localTrendsTitle: "ಸ್ಥಳೀಯ ವ್ಯಾಪಾರ ಟ್ರೆಂಡ್‌ಗಳು",
    localTrendsSub: "ನಿಮ್ಮಂತಹ ಇತರ ಅಂಗಡಿಗಳಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ",
    realNetworkDataNote: "ನೈಜ ಸಮಗ್ರ ವಹಿವಾಟು ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ.",
    
    // Alert & Modal
    alertTitle: "💡 ನಿಮ್ಮ ಅಂಗಡಿಗೆ ಒಂದು ಉತ್ತಮ ಅವಕಾಶ",
    alertDismiss: "ಈಗ ಮುಚ್ಚಿ",
    alertAction: "ಸಲಹೆ ನೋಡಿ",
    takeAction: "ಕ್ರಮ ಕೈಗೊಳ್ಳಿ",
    closeModal: "ಮುಚ್ಚಿ",
    
    // Voice
    voiceTestSample: "ಪೇಟಿಎಂ ಮರ್ಚೆಂಟ್ ವ್ಯಾಪಾರ ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ಯಾವುದೇ ಗೊಂದಲವಿಲ್ಲ, ಕೇವಲ ಲಾಭ.",
    voiceUnavailable: "ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ (kn-IN) ಲಭ್ಯವಿಲ್ಲ. ಪರದೆಯ ಮೇಲೆ ಕನ್ನಡ ಪಠ್ಯವನ್ನು ತೋರಿಸಲಾಗಿದೆ.",
    
    // Common
    loading: "ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    retry: "ಮತ್ತೆ ಸಂಪರ್ಕಿಸಿ",
  },
  
  ta: {
    // Navigation
    navYourShop: "உங்கள் கடை",
    navWhatYouCanDo: "நீங்கள் என்ன செய்யலாம்",
    navProducts: "பொருட்கள்",
    navOffers: "ஆஃபர்கள் மற்றும் காம்போ",
    navLocalTrends: "உள்ளூர் வர்த்தக போக்கு",
    navSettings: "அமைப்புகள்",
    navHelp: "உதவி",
    
    // Taglines & Brand
    appName: "பேடிஎம் வணிகர்",
    appSubname: "வர்த்தக உதவியாளர்",
    tagline: "கேள்விகள் இல்லை, லாபம் மட்டுமே.",
    shopName: "சர்மா டீ மற்றும் ஜெனரல் ஸ்டோர்",
    shopId: "கடை M001",
    verified: "சரிபார்க்கப்பட்டது",
    
    // Header
    selectLanguage: "மொழி",
    backendConnected: "இணைக்கப்பட்டுள்ளது",
    backendOffline: "ஆஃப்லைன்",
    listeningNow: "பேசுகிறது...",
    stopSpeaking: "குரலை நிறுத்து",
    
    // Dashboard KPIs
    todaysBusiness: "இன்றைய வர்த்தகம்",
    todaysBusinessSub: "இன்று உங்கள் கடையின் செயல்பாடு எப்படி உள்ளது என பாருங்கள்",
    salesToday: "இன்றைய மொத்த விற்பனை",
    profitToday: "மதிப்பிடப்பட்ட லாபம்",
    paymentsCount: "மொத்த பணப்பரிமாற்றங்கள்",
    averageBill: "சராசரி பில் மதிப்பு",
    salesDesc: "கடைக்கு வந்த மொத்த பணம்",
    profitDesc: "பொருட்களின் செலவு போக எஞ்சிய லாபம்",
    paymentsDesc: "பொருட்கள் வாங்கிய வாடிக்கையாளர்கள்",
    averageBillDesc: "ஒரு வாடிக்கையாளர் சராசரியாக செலவிட்ட தொகை",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 இன்று நீங்கள் என்ன செய்யலாம்",
    whatYouCanDoSub: "இன்றைய லாபத்தை அதிகரிக்க தானியங்கி எளிய பரிந்துரைகள்",
    listen: "குரலில் கேட்க",
    createOffer: "ஆஃபர் உருவாக்கு",
    activateOffer: "ஆஃபர் தொடங்கு",
    viewSuggestion: "பரிந்துரையை பார்க்க",
    expectedProfit: "எதிர்பார்க்கப்படும் கூடுதல் லாபம்",
    perDay: "ஒரு நாளைக்கு",
    
    // Hourly & Products
    salesByHour: "மணிநேர விற்பனை",
    salesByHourSub: "பச்சை நிறம் அதிக விற்பனை நேரத்தையும், ஆரஞ்சு மெதுவான நேரத்தையும் குறிக்கிறது",
    busyHours: "அதிக விற்பனை நேரம்",
    slowHours: "குறைந்த விற்பனை நேரம்",
    slowHoursDetected: "பிற்பகல் 3 முதல் 5 மணி வரை கடையில் கூட்டம் குறைவாக உள்ளது.",
    allProducts: "அனைத்துப் பொருட்கள்",
    bestSellingProducts: "அதிகம் விற்பனையாகும் பொருட்கள்",
    bestSellingSub: "உங்கள் கடைக்கு அதிக வருவாய் ஈட்டித்தரும் பொருட்கள்",
    productsNeedingAttention: "கவனம் செலுத்த வேண்டிய பொருட்கள்",
    productsNeedingAttentionSub: "மெதுவாக விற்கும் பொருட்களை காம்போவாக மாற்றி விற்கவும்",
    productName: "பொருளின் பெயர்",
    quantitySold: "விற்பனையான எண்ணிக்கை",
    totalSales: "மொத்த விற்பனை",
    price: "விலை",
    attentionReason: "கவனம் செலுத்தக் காரணம்",
    makeCombo: "காம்போ உருவாக்கவும்",
    sold: "விற்றது",
    units: "எண்ணிக்கை",
    
    // Specific reasons for attention items
    reasonLemonTea: "விற்பனையாகாத இருப்பு: 90 நாட்களில் விற்பனை இல்லை, 250 பாக்கெட்டுகள் தேங்கியுள்ளன. சூடான டீயுடன் காம்போ ஆஃபர் தரவும்.",
    reasonVadaPav: "குறைந்த விற்பனை: சமோசாவுடன் (3,133 விற்பனை) ஒப்பிடும்போது குறைவு (275 விற்றது). மதிய டீயுடன் காம்போ சேர்க்கவும்.",
    reasonBiscuits: "குறைந்த வருவாய்: மொத்தம் ₹7,420 விற்பனை மற்றும் 45% லாபம். டீ அல்லது காபியுடன் ₹20 காம்போவாக இணைக்கவும்.",
    
    // Basket Inference
    likelyItemsTitle: "இந்த கட்டணத்தில் இருக்கக்கூடிய பொருட்கள்",
    likelyItemsSub: "உங்கள் முந்தைய விற்பனையின் அடிப்படையில்",
    confidenceHigh: "நம்பகத்தன்மை: மிக அதிகம் (High)",
    confidenceMedium: "நம்பகத்தன்மை: நடுத்தரம் (Medium)",
    basketDisclaimer: "குறிப்பு: இது வாடிக்கையாளர்களின் பழக்கவழக்க மதிப்பீடு, உறுதிப்படுத்தப்பட்ட ஆர்டர் அல்ல.",
    frequentlyBoughtTogether: "பொதுவாக ஒன்றாக வாங்கப்படும் பொருட்கள்",
    
    // Copilot 4 parts
    copilotTitle: "💡 நீங்கள் என்ன செய்யலாம் (வளர்ச்சி உதவியாளர்)",
    copilotSub: "உங்கள் கடைக்கேற்ற எளிய வணிக ஆலோசனைகள். எந்தக் கேள்விகளும் தேவையில்லை.",
    whatIsHappening: "என்ன நடக்கிறது?",
    whyDoesItMatter: "இது ஏன் முக்கியம்?",
    whatShouldIDo: "நீங்கள் என்ன செய்ய வேண்டும்?",
    expectedExtraProfit: "எதிர்பார்க்கப்படும் கூடுதல் லாபம்",
    
    // Offers
    offersTitle: "ஆஃபர்கள் மற்றும் காம்போக்கள்",
    offersSub: "மெதுவான நேரங்களில் வாடிக்கையாளர்களை ஈர்க்க எளிய ஆஃபர்களை இயக்கவும்",
    suggestedOffers: "உங்களுக்காக பரிந்துரைக்கப்பட்ட ஆஃபர்கள்",
    suggestedOffersSub: "லாபத்தை பாதிக்காமல் விற்பனையை அதிகரிக்கும் தயார் காம்போக்கள்",
    activeOffers: "கடையில் நடப்பில் உள்ள ஆஃபர்கள்",
    createSimpleOffer: "புதிய ஆஃபர் உருவாக்கவும்",
    offerTitleLabel: "ஆஃபர் அல்லது காம்போ பெயர்",
    offerTypeLabel: "ஆஃபர் வகை",
    discountLabel: "தள்ளுபடி (Discount)",
    bestTimeLabel: "இயக்க சிறந்த நேரம்",
    targetProductLabel: "பொருள் அல்லது காம்போ",
    reasonLabel: "இது ஏன் பயனுள்ளது",
    saveAndActivate: "ஆஃபரை சேமித்து தொடங்கவும்",
    
    // Local Trends
    localTrendsTitle: "உள்ளூர் வணிகப் போக்குகள்",
    localTrendsSub: "உங்கள் பகுதி கடைகளில் என்ன நடக்கிறது",
    realNetworkDataNote: "உண்மையான பிராந்திய பரிவர்த்தனை தகவல்களின் அடிப்படையில்.",
    
    // Alert & Modal
    alertTitle: "💡 உங்கள் கடைக்கு ஒரு அருமையான வாய்ப்பு",
    alertDismiss: "இப்போது வேண்டாம்",
    alertAction: "பரிந்துரையை பார்க்க",
    takeAction: "தொடங்கவும்",
    closeModal: "மூடவும்",
    
    // Voice
    voiceTestSample: "பேடிஎம் வணிகர் வர்த்தக உதவியாளருக்கு நல்வரவு. கேள்விகள் இல்லை, லாபம் மட்டுமே.",
    voiceUnavailable: "உங்கள் சாதனத்தில் தமிழ் குரல் (ta-IN) இல்லை. திரையில் தமிழ் உரை காட்டப்பட்டுள்ளது.",
    
    // Common
    loading: "விவரங்கள் ஏற்றப்படுகின்றன...",
    retry: "மீண்டும் இணைக்கவும்",
  },
  
  te: {
    // Navigation
    navYourShop: "మీ దుకాణం",
    navWhatYouCanDo: "మీరు ఏమి చేయవచ్చు",
    navProducts: "ఉత్పత్తులు",
    navOffers: "ఆఫర్లు & కాంబోలు",
    navLocalTrends: "స్థానిక పోకడలు",
    navSettings: "సెట్టింగులు",
    navHelp: "సహాయం",
    
    // Taglines & Brand
    appName: "పేటీఎం మర్చంట్",
    appSubname: "వ్యాపార సహాయకుడు",
    tagline: "ప్రశ్నలు లేవు, లాభాలే లాభాలు.",
    shopName: "శర్మ టీ & జనరల్ స్టోర్",
    shopId: "షాప్ M001",
    verified: "ధృవీకరించబడింది",
    
    // Header
    selectLanguage: "భాష",
    backendConnected: "కనెక్ట్ అయింది",
    backendOffline: "ఆఫ్‌లైన్",
    listeningNow: "మాట్లాడుతోంది...",
    stopSpeaking: "వాయిస్ ఆపు",
    
    // Dashboard KPIs
    todaysBusiness: "నేటి వ్యాపారం",
    todaysBusinessSub: "ఈరోజు మీ దుకాణం పనితీరు ఎలా ఉందో చూడండి",
    salesToday: "నేటి మొత్తం అమ్మకాలు",
    profitToday: "అంచనా లాభం",
    paymentsCount: "చెల్లింపుల సంఖ్య",
    averageBill: "సగటు బిల్లు",
    salesDesc: "వచ్చిన మొత్తం నగదు",
    profitDesc: "ఖర్చులు తీసివేసిన తర్వాత మిగిలిన లాభం",
    paymentsDesc: "వచ్చిన కస్టమర్ల సంఖ్య",
    averageBillDesc: "ఒక్కో కస్టమర్ చేసిన సగటు ఖర్చు",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 ఈరోజు మీరు ఏమి చేయవచ్చు",
    whatYouCanDoSub: "నేటి లాభాన్ని పెంచడానికి స్వయంచాలక వ్యాపార సలహాలు",
    listen: "వినండి",
    createOffer: "ఆఫర్ సృష్టించండి",
    activateOffer: "ఆఫర్ ప్రారంభించండి",
    viewSuggestion: "సలహా చూడండి",
    expectedProfit: "అదనపు లాభం అంచనా",
    perDay: "రోజుకు",
    
    // Hourly & Products
    salesByHour: "గంటల వారీ అమ్మకాలు",
    salesByHourSub: "ఆకుపచ్చ రంగు రద్దీ సమయాన్ని, నారింజ రంగు తక్కువ అమ్మకాల సమయాన్ని చూపుతుంది",
    busyHours: "రద్దీ సమయం",
    slowHours: "నెమ్మది సమయం",
    slowHoursDetected: "మధ్యాహ్నం 3 నుండి 5 గంటల మధ్య దుకాణంలో కస్టమర్లు తక్కువగా ఉన్నారు.",
    allProducts: "అన్ని ఉత్పత్తులు",
    bestSellingProducts: "ఎక్కువగా అమ్ముడయ్యే వస్తువులు",
    bestSellingSub: "మీకు అత్యధిక ఆదాయాన్ని తెచ్చే వస్తువులు",
    productsNeedingAttention: "దృష్టి పెట్టాల్సిన వస్తువులు",
    productsNeedingAttentionSub: "నెమ్మదిగా అమ్ముడయ్యే వస్తువులను కాంబో ఆఫర్లలో అమ్మండి",
    productName: "వస్తువు పేరు",
    quantitySold: "అమ్మిన పరిమాణం",
    totalSales: "మొత్తం అమ్మకాలు",
    price: "ధర",
    attentionReason: "ఎందుకు దృష్టి పెట్టాలి",
    makeCombo: "కాంబో చేయండి",
    sold: "అమ్మకాలు",
    units: "పీసులు",
    
    // Specific reasons for attention items
    reasonLemonTea: "మిగిలిపోయిన స్టాక్: 90 రోజుల్లో జీరో అమ్మకాలు, 250 ప్యాకెట్లు అలాగే ఉన్నాయి. వేడి టీతో కాంబో ఆఫర్ ఇవ్వండి.",
    reasonVadaPav: "తక్కువ అమ్మకాలు: సమోసాతో (3,133 అమ్మకాలు) పోలిస్తే తక్కువ అమ్మకాలు (275 పీసులు). మధ్యాహ్నం టీతో కాంబో చేయండి.",
    reasonBiscuits: "తక్కువ ఆదాయం: మొత్తం ₹7,420 అమ్మకాలు మరియు 45% మార్జిన్. టీ లేదా కాఫీతో ₹20 కాంబోగా జోడించండి.",
    
    // Basket Inference
    likelyItemsTitle: "ఈ చెల్లింపులో ఉండే అవకాశం ఉన్న వస్తువులు",
    likelyItemsSub: "మీ గత అమ్మకాల ఆధారంగా",
    confidenceHigh: "ఖచ్చితత్వం: చాలా ఎక్కువ (High)",
    confidenceMedium: "ఖచ్చితత్వం: మధ్యస్థం (Medium)",
    basketDisclaimer: "గమనిక: ఇది కస్టమర్ల అలవాట్ల అంచనా మాత్రమే, ఖచ్చితమైన ఆర్డర్ కాదు.",
    frequentlyBoughtTogether: "సాధారణంగా కలిపి కొనుగోలు చేసే వస్తువులు",
    
    // Copilot 4 parts
    copilotTitle: "💡 మీరు ఏమి చేయవచ్చు (గ్రోత్ సహాయకుడు)",
    copilotSub: "మీ దుకాణానికి తగిన సాధారణ వ్యాపార సలహాలు. ఎలాంటి ప్రశ్నలు అవసరం లేదు.",
    whatIsHappening: "ఏమి జరుగుతోంది?",
    whyDoesItMatter: "ఇది ఎందుకు ముఖ్యం?",
    whatShouldIDo: "మీరు ఏమి చేయాలి?",
    expectedExtraProfit: "అంచనా వేసిన అదనపు లాభం",
    
    // Offers
    offersTitle: "ఆఫర్లు మరియు కాంబోలు",
    offersSub: "తక్కువ రద్దీ ఉన్న సమయాల్లో కస్టమర్లను ఆకర్షించడానికి ఆఫర్లు నడపండి",
    suggestedOffers: "మీ కోసం సూచించిన ఆఫర్లు",
    suggestedOffersSub: "లాభాన్ని తగ్గించకుండా వ్యాపారాన్ని పెంచే సిద్ధ కాంబోలు",
    activeOffers: "దుకాణంలో నడుస్తున్న ఆఫర్లు",
    createSimpleOffer: "కొత్త ఆఫర్ సృష్టించండి",
    offerTitleLabel: "ఆఫర్ లేదా కాంబో పేరు",
    offerTypeLabel: "ఆఫర్ రకం",
    discountLabel: "డిస్కౌంట్ (Discount)",
    bestTimeLabel: "నడపడానికి ఉత్తమ సమయం",
    targetProductLabel: "వస్తువు లేదా కాంబో",
    reasonLabel: "ఇది ఎందుకు ఉపయోగపడుతుంది",
    saveAndActivate: "ఆఫర్ సేవ్ చేసి ప్రారంభించండి",
    
    // Local Trends
    localTrendsTitle: "స్థానిక వ్యాపార ధోరణులు",
    localTrendsSub: "మీ ప్రాంతంలోని ఇతర దుకాణాలలో ఏమి జరుగుతోంది",
    realNetworkDataNote: "వాస్తవ ప్రాంతీయ లావాదేవీల డేటా ఆధారంగా.",
    
    // Alert & Modal
    alertTitle: "💡 మీ దుకాణానికి మంచి లాభదాయక అవకాశం",
    alertDismiss: "ఇప్పుడు వద్దు",
    alertAction: "సలహా చూడండి",
    takeAction: "ప్రారంభించండి",
    closeModal: "మూసివేయి",
    
    // Voice
    voiceTestSample: "పేటీఎం మర్చంట్ వ్యాపార సహాయకుడికి స్వాగతం. ప్రశ్నలు లేవు, లాభాలే లాభాలు.",
    voiceUnavailable: "మీ పరికరంలో తెలుగు వాయిస్ (te-IN) లేదు. స్క్రీన్ పై తెలుగు సమాచారం కనిపిస్తోంది.",
    
    // Common
    loading: "సమాచారం లోడ్ అవుతోంది...",
    retry: "మళ్ళీ కనెక్ట్ చేయండి",
  },
  
  ml: {
    // Navigation
    navYourShop: "നിങ്ങളുടെ കട",
    navWhatYouCanDo: "നിങ്ങൾക്ക് എന്ത് ചെയ്യാം",
    navProducts: "ഉൽപ്പന്നങ്ങൾ",
    navOffers: "ഓഫറുകളും കോമ്പോയും",
    navLocalTrends: "പ്രാദേശിക ട്രെൻഡുകൾ",
    navSettings: "ക്രമീകരണങ്ങൾ",
    navHelp: "സഹായം",
    
    // Taglines & Brand
    appName: "പേടിഎം മർച്ചന്റ്",
    appSubname: "ബിസിനസ്സ് സഹായി",
    tagline: "ചോദ്യങ്ങളില്ല, ലാഭം മാത്രം.",
    shopName: "ശർമ്മ ടീ & ജനറൽ സ്റ്റോർ",
    shopId: "ഷോപ്പ് M001",
    verified: "സ്ഥിരീകരിച്ചു",
    
    // Header
    selectLanguage: "ഭാഷ",
    backendConnected: "ബന്ധിപ്പിച്ചു",
    backendOffline: "ഓഫ്‌ലൈൻ",
    listeningNow: "സംസാരിക്കുന്നു...",
    stopSpeaking: "ശബ്ദം നിർത്തുക",
    
    // Dashboard KPIs
    todaysBusiness: "ഇന്നത്തെ ബിസിനസ്സ്",
    todaysBusinessSub: "ഇന്ന് നിങ്ങളുടെ കടയിലെ കച്ചവടം എങ്ങനെ പോകുന്നുവെന്ന് കാണുക",
    salesToday: "ഇന്നത്തെ ആകെ വിൽപ്പന",
    profitToday: "കണക്കാക്കിയ ലാഭം",
    paymentsCount: "പേയ്‌മെന്റുകളുടെ എണ്ണം",
    averageBill: "ശരാശരി ബിൽ തുക",
    salesDesc: "ലഭിച്ച ആകെ വരുമാനം",
    profitDesc: "ചിലവുകൾ കഴിഞ്ഞ് മിച്ചം വരുന്ന ലാഭം",
    paymentsDesc: "വന്ന ഇടപാടുകാരുടെ എണ്ണം",
    averageBillDesc: "ഒരു ഉപഭോക്താവ് ശരാശരി ചിലവഴിച്ച തുക",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 ഇന്ന് നിങ്ങൾക്ക് എന്ത് ചെയ്യാം",
    whatYouCanDoSub: "ഇന്നത്തെ ലാഭം വർദ്ധിപ്പിക്കാൻ എളുപ്പമുള്ള നിർദ്ദേശങ്ങൾ",
    listen: "കേൾക്കുക",
    createOffer: "ഓഫർ ഉണ്ടാക്കുക",
    activateOffer: "ഓഫർ തുടങ്ങുക",
    viewSuggestion: "നിർദ്ദേശം കാണുക",
    expectedProfit: "പ്രതീക്ഷിക്കുന്ന അധിക ലാഭം",
    perDay: "പ്രതിദിനം",
    
    // Hourly & Products
    salesByHour: "മണിക്കൂർ തിരിച്ചുള്ള വിൽപ്പന",
    salesByHourSub: "പച്ച നിറം തിരക്കുള്ള സമയത്തെയും ഓറഞ്ച് നിറം തിരക്ക് കുറഞ്ഞ സമയത്തെയും കാണിക്കുന്നു",
    busyHours: "കൂടുതൽ തിരക്കുള്ള സമയം",
    slowHours: "തിരക്ക് കുറഞ്ഞ സമയം",
    slowHoursDetected: "ഉച്ചകഴിഞ്ഞ് 3 മുതൽ 5 വരെ കടയിൽ ആളുകൾ കുറവാണ്.",
    allProducts: "എല്ലാ ഉൽപ്പന്നങ്ങളും",
    bestSellingProducts: "കൂടുതൽ വിറ്റുപോകുന്ന ഉൽപ്പന്നങ്ങൾ",
    bestSellingSub: "കടയ്ക്ക് കൂടുതൽ വരുമാനം നൽകുന്ന ഉൽപ്പന്നങ്ങൾ",
    productsNeedingAttention: "ശ്രദ്ധിക്കേണ്ട ഉൽപ്പന്നങ്ങൾ",
    productsNeedingAttentionSub: "പതുക്കെ വിൽക്കുന്ന സാധനങ്ങൾ കോമ്പോ ഓഫർ നൽകി വിൽക്കുക",
    productName: "ഉൽപ്പന്നത്തിന്റെ പേര്",
    quantitySold: "വിറ്റ അളവ്",
    totalSales: "ആകെ വിൽപ്പന",
    price: "വില",
    attentionReason: "ശ്രദ്ധിക്കേണ്ടതിന്റെ കാരണം",
    makeCombo: "കോമ്പോ ആക്കുക",
    sold: "വിറ്റു",
    units: "എണ്ണം",
    
    // Specific reasons for attention items
    reasonLemonTea: "വിൽപ്പനയില്ലാത്ത സ്റ്റോക്ക്: 90 ദിവസത്തിൽ വിൽപ്പനയില്ല, 250 എണ്ണം കെട്ടിക്കിടക്കുന്നു. ചൂടുള്ള ചായക്കൊപ്പം കോംബോ ഓഫർ നൽകുക.",
    reasonVadaPav: "കുറഞ്ഞ വിൽപ്പന: സമോസയെ അപേക്ഷിച്ച് (3,133 എണ്ണം) കുറഞ്ഞ വിൽപ്പന (275 എണ്ണം). ചായയ്ക്കൊപ്പം കോംബോ ആക്കുക.",
    reasonBiscuits: "കുറഞ്ഞ വരുമാനം: ആകെ ₹7,420 വിൽപ്പനയും 45% ലാഭവും. ചായയ്ക്കോ കാപ്പിക്കോ ഒപ്പം ₹20 കോംബോ നൽകുക.",
    
    // Basket Inference
    likelyItemsTitle: "ഈ പേയ്‌മെന്റിൽ ഉണ്ടാകാൻ സാധ്യതയുള്ള സാധനങ്ങൾ",
    likelyItemsSub: "കഴിഞ്ഞകാല വിൽപ്പനയുടെ അടിസ്ഥാനത്തിൽ",
    confidenceHigh: "വിശ്വാസ്യത: വളരെ ഉയർന്നത് (High)",
    confidenceMedium: "വിശ്വാസ്യത: ഇടത്തരം (Medium)",
    basketDisclaimer: "ശ്രദ്ധിക്കുക: ഇത് ഉപഭോക്താക്കളുടെ സ്വഭാവത്തിന്റെ അനുമാനമാണ്, ഉറപ്പുള്ള ഓർഡർ അല്ല.",
    frequentlyBoughtTogether: "സാധാരണയായി ഒന്നിച്ച് വാങ്ങുന്നവ",
    
    // Copilot 4 parts
    copilotTitle: "💡 നിങ്ങൾക്ക് എന്ത് ചെയ്യാം (ഗ്രോത്ത് അസിസ്റ്റന്റ്)",
    copilotSub: "നിങ്ങളുടെ കടയ്ക്ക് അനുയോജ്യമായ ലളിതമായ ബിസിനസ്സ് ഉപദേശങ്ങൾ.",
    whatIsHappening: "എന്താണ് നടക്കുന്നത്?",
    whyDoesItMatter: "ഇത് എന്തുകൊണ്ട് പ്രധാനം?",
    whatShouldIDo: "നിങ്ങൾ എന്ത് ചെയ്യണം?",
    expectedExtraProfit: "പ്രതീക്ഷിക്കുന്ന അധിക ലാഭം",
    
    // Offers
    offersTitle: "ഓഫറുകളും കോമ്പോകളും",
    offersSub: "തിരക്ക് കുറഞ്ഞ സമയത്ത് കച്ചവടം കൂട്ടാൻ ലളിതമായ ഓഫറുകൾ നൽകുക",
    suggestedOffers: "നിങ്ങൾക്കായി നിർദ്ദേശിച്ച ഓഫറുകൾ",
    suggestedOffersSub: "ലാഭത്തെ ബാധിക്കാതെ വിൽപ്പന കൂട്ടുന്ന കോമ്പോ ഓഫറുകൾ",
    activeOffers: "കടയിൽ നിലവിലുള്ള ഓഫറുകൾ",
    createSimpleOffer: "പുതിയ ഓഫർ ഉണ്ടാക്കുക",
    offerTitleLabel: "ഓഫറിന്റെ പേര്",
    offerTypeLabel: "ഓഫർ തരം",
    discountLabel: "കിഴിവ് (Discount)",
    bestTimeLabel: "നടത്താൻ അനുയോജ്യമായ സമയം",
    targetProductLabel: "ഉൽപ്പന്നം അല്ലെങ്കിൽ കോമ്പോ",
    reasonLabel: "ഇത് എന്ത് കൊണ്ട് ഫലപ്രദമാണ്",
    saveAndActivate: "ഓഫർ സേവ് ചെയ്ത് ആരംഭിക്കുക",
    
    // Local Trends
    localTrendsTitle: "പ്രാദേശിക ബിസിനസ്സ് ട്രെൻഡുകൾ",
    localTrendsSub: "നിങ്ങളുടെ പ്രദേശത്തെ മറ്റ് കടകളിൽ എന്താണ് നടക്കുന്നത്",
    realNetworkDataNote: "യഥാർത്ഥ പ്രാദേശിക ഇടപാട് വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ.",
    
    // Alert & Modal
    alertTitle: "💡 നിങ്ങളുടെ കടയ്ക്ക് ഒരു മികച്ച അവസരം",
    alertDismiss: "ഇപ്പോൾ വേണ്ട",
    alertAction: "നിർദ്ദേശം കാണുക",
    takeAction: "നടപ്പിലാക്കുക",
    closeModal: "അടയ്ക്കുക",
    
    // Voice
    voiceTestSample: "പേടിഎം മർച്ചന്റ് ബിസിനസ്സ് അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം. ചോദ്യങ്ങളില്ല, ലാഭം മാത്രം.",
    voiceUnavailable: "നിങ്ങളുടെ ഫോണിൽ മലയാളം വോയ്‌സ് (ml-IN) ലഭ്യമല്ല. എഴുതിയ വിവരങ്ങൾ സ്ക്രീനിൽ കാണാം.",
    
    // Common
    loading: "വിവരങ്ങൾ ലഭ്യമാക്കുന്നു...",
    retry: "വീണ്ടും ബന്ധിപ്പിക്കുക",
  },
  
  mr: {
    // Navigation
    navYourShop: "तुमचे दुकान",
    navWhatYouCanDo: "तुम्ही काय करू शकता",
    navProducts: "उत्पादने (सामान)",
    navOffers: "ऑफर आणि कॉम्बो",
    navLocalTrends: "स्थानिक ट्रेंड",
    navSettings: "सेटिंग्ज",
    navHelp: "मदत",
    
    // Taglines & Brand
    appName: "पेटीएम मर्चंट",
    appSubname: "बिझनेस साथी",
    tagline: "कोणतीही अडचण नाही, फक्त नफा.",
    shopName: "शर्मा टी अँड जनरल स्टोअर",
    shopId: "दुकान M001",
    verified: "व्हेरिफाय केले आहे",
    
    // Header
    selectLanguage: "भाषा",
    backendConnected: "कनेक्ट झाले",
    backendOffline: "ऑफलाइन",
    listeningNow: "आवाज सुरू आहे...",
    stopSpeaking: "आवाज बंद करा",
    
    // Dashboard KPIs
    todaysBusiness: "आजचा व्यवसाय",
    todaysBusinessSub: "आज तुमच्या दुकानात कसा व्यवसाय सुरू आहे ते पहा",
    salesToday: "आजची एकूण विक्री",
    profitToday: "अंदाजे नफा",
    paymentsCount: "एकूण पेमेंट्स",
    averageBill: "सरासरी बिल",
    salesDesc: "गल्ल्यात जमा झालेले एकूण पैसे",
    profitDesc: "खर्च वजा जाता उरलेला नफा",
    paymentsDesc: "आलेल्या ग्राहकांची संख्या",
    averageBillDesc: "प्रत्येक ग्राहकाचा सरासरी खर्च",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 आज तुम्ही काय करू शकता",
    whatYouCanDoSub: "आजचा नफा वाढवण्यासाठी सोपे आणि उपयुक्त सल्ले",
    listen: "ऐका (बोलून)",
    createOffer: "ऑफर तयार करा",
    activateOffer: "ऑफर सुरू करा",
    viewSuggestion: "सल्ला पहा",
    expectedProfit: "अपेक्षित अतिरिक्त नफा",
    perDay: "दररोज",
    
    // Hourly & Products
    salesByHour: "तासानुसार विक्री",
    salesByHourSub: "हिरवा रंग जास्त गर्दी आणि केशरी रंग मंद वेळ दाखवतो",
    busyHours: "गर्दीची वेळ",
    slowHours: "मंद विक्रीची वेळ",
    slowHoursDetected: "दुपारी ३ ते ५ दरम्यान दुकानात ग्राहक कमी येतात.",
    allProducts: "सर्व उत्पादने",
    bestSellingProducts: "सर्वात जास्त खप असलेले सामान",
    bestSellingSub: "ज्या सामानातून दुकानाला सर्वात जास्त कमाई होते",
    productsNeedingAttention: "ज्या सामानावर लक्ष दिले पाहिजे",
    productsNeedingAttentionSub: "कमी खप असलेले सामान कॉम्बो ऑफरमध्ये विका",
    productName: "सामानाचे नाव",
    quantitySold: "विकलेले नग",
    totalSales: "एकूण विक्री",
    price: "किंमत",
    attentionReason: "लक्षात घेण्याचे कारण",
    makeCombo: "कॉम्बो बनवा",
    sold: "विक्री",
    units: "नग",
    
    // Specific reasons for attention items
    reasonLemonTea: "अडकलेला साठा: ९० दिवसांत ० विक्री, २५० नग शिल्लक आहेत. गरम चहासोबत बंडल करून विका.",
    reasonVadaPav: "कमी खप: समोशाच्या (३,१३३ विक्री) तुलनेत कमी खप (२७५ नग). दुपारच्या चहासोबत कॉम्बो बनवा.",
    reasonBiscuits: "कमी उत्पन्न: एकूण ₹७,४२० विक्री आणि ४५% नफा. चहा किंवा कॉफीसोबत ₹२० चा कॉम्बो जोडा.",
    
    // Basket Inference
    likelyItemsTitle: "या पेमेंटमध्ये असण्याची शक्यता असलेले सामान",
    likelyItemsSub: "तुमच्या जुन्या विक्रीच्या आधारे",
    confidenceHigh: "विश्वास: खूप खात्रीशीर (High)",
    confidenceMedium: "विश्वास: मध्यम (Medium)",
    basketDisclaimer: "टीप: हा ग्राहकांच्या जुन्या सवयींचा अंदाज आहे, पक्की ऑर्डर नाही.",
    frequentlyBoughtTogether: "नेहमी एकत्र खरेदी केले जाणारे सामान",
    
    // Copilot 4 parts
    copilotTitle: "💡 आज काय करावे (ग्रोथ साथी)",
    copilotSub: "तुमच्या दुकानासाठी तयार केलेले व्यावसायिक सल्ले. विचारण्याची गरज नाही.",
    whatIsHappening: "काय घडत आहे?",
    whyDoesItMatter: "हे का महत्त्वाचे आहे?",
    whatShouldIDo: "तुम्ही काय केले पाहिजे?",
    expectedExtraProfit: "अपेक्षित अतिरिक्त नफा",
    
    // Offers
    offersTitle: "ऑफर आणि कॉम्बो",
    offersSub: "मंद वेळेत ग्राहकांना आकर्षित करण्यासाठी सोप्या ऑफर चालवा",
    suggestedOffers: "तुमच्यासाठी सुचवलेल्या ऑफर्स",
    suggestedOffersSub: "नफा कमी न होता विक्री वाढवणारे तयार कॉम्बो",
    activeOffers: "दुकानात सुरू असलेल्या ऑफर्स",
    createSimpleOffer: "नवीन ऑफर बनवा",
    offerTitleLabel: "ऑफर किंवा कॉम्बोचे नाव",
    offerTypeLabel: "ऑफरचा प्रकार",
    discountLabel: "सूट (Discount)",
    bestTimeLabel: "चालवण्याची योग्य वेळ",
    targetProductLabel: "उत्पादन किंवा बंडल",
    reasonLabel: "हे का फायदेशीर ठरेल",
    saveAndActivate: "ऑफर सेव्ह करून सुरू करा",
    
    // Local Trends
    localTrendsTitle: "स्थानिक बाजाराचा कल",
    localTrendsSub: "तुमच्या परिसरातील इतर दुकानांमध्ये काय सुरू आहे",
    realNetworkDataNote: "वास्तविक व्यवहार आकडेवारीवर आधारित.",
    
    // Alert & Modal
    alertTitle: "💡 तुमच्या दुकानासाठी एक उत्तम संधी",
    alertDismiss: "आता नको",
    alertAction: "सल्ला पहा",
    takeAction: "सुरू करा",
    closeModal: "बंद करा",
    
    // Voice
    voiceTestSample: "पेटीएम मर्चंट बिझनेस साथीमध्ये आपले स्वागत आहे. कोणतीही अडचण नाही, फक्त नफा.",
    voiceUnavailable: "तुमच्या उपकरणावर मराठी आवाज (mr-IN) उपलब्ध नाही. स्क्रीनवर मराठी मजकूर दिसत आहे.",
    
    // Common
    loading: "माहिती लोड होत आहे...",
    retry: "पुन्हा कनेक्ट करा",
  },
  
  bn: {
    // Navigation
    navYourShop: "আপনার দোকান",
    navWhatYouCanDo: "আপনি কি করতে পারেন",
    navProducts: "পণ্যসামগ্রী",
    navOffers: "অফার ও কম্বো",
    navLocalTrends: "স্থানীয় প্রবণতা",
    navSettings: "সেটিংস",
    navHelp: "সাহায্য",
    
    // Taglines & Brand
    appName: "পেটিএম মার্চেন্ট",
    appSubname: "বিজনেস সহকারী",
    tagline: "কোনো ঝামেলা নেই, শুধুই লাভ।",
    shopName: "শর্মা টি অ্যান্ড জেনারেল স্টোর",
    shopId: "দোকান M001",
    verified: "ভেরিফায়েড",
    
    // Header
    selectLanguage: "ভাষা",
    backendConnected: "সংযুক্ত",
    backendOffline: "অফলাইন",
    listeningNow: "কথা বলছে...",
    stopSpeaking: "ভয়েস বন্ধ করুন",
    
    // Dashboard KPIs
    todaysBusiness: "আজকের ব্যবসা",
    todaysBusinessSub: "আজ আপনার দোকানে কেমন বেচাকেনা চলছে দেখে নিন",
    salesToday: "আজকের মোট বিক্রি",
    profitToday: "আনুমানিক লাভ",
    paymentsCount: "পেমেন্টের সংখ্যা",
    averageBill: "গড় বিল",
    salesDesc: "দোকানে জমা হওয়া মোট টাকা",
    profitDesc: "খরচ বাদ দিয়ে আনুমানিক মোট লাভ",
    paymentsDesc: "দোকানে আসা গ্রাহকের সংখ্যা",
    averageBillDesc: "গ্রাহক প্রতি গড় কেনাকাটা",
    
    // Hero What You Can Do
    whatYouCanDoToday: "💡 আজ আপনি কি করতে পারেন",
    whatYouCanDoSub: "আজকের লাভ বাড়ানোর সহজ ও স্বয়ংক্রিয় পরামর্শ",
    listen: "শুনুন",
    createOffer: "অফার তৈরি করুন",
    activateOffer: "অফার চালু করুন",
    viewSuggestion: "পরামর্শ দেখুন",
    expectedProfit: "প্রত্যাশিত অতিরিক্ত লাভ",
    perDay: "প্রতিদিন",
    
    // Hourly & Products
    salesByHour: "ঘণ্টা অনুযায়ী বিক্রি",
    salesByHourSub: "সবুজ রঙ ব্যস্ত সময় এবং কমলা রঙ ধীর বিক্রির সময় নির্দেশ করে",
    busyHours: "ব্যস্ত সময়",
    slowHours: "ধীর বিক্রির সময়",
    slowHoursDetected: "বিকেল ৩টা থেকে ৫টার মধ্যে দোকানে বিক্রি কম থাকে।",
    allProducts: "সমস্ত পণ্য",
    bestSellingProducts: "সবচেয়ে বেশি বিক্রিত পণ্য",
    bestSellingSub: "যেসব পণ্য থেকে সবচেয়ে বেশি আয় হয়",
    productsNeedingAttention: "যেসব পণ্যে নজর দেওয়া দরকার",
    productsNeedingAttentionSub: "কম বিক্রিত পণ্য কম্বো অফারে বিক্রি বাড়ান",
    productName: "পণ্যের নাম",
    quantitySold: "বিক্রি হওয়া পরিমাণ",
    totalSales: "মোট বিক্রি",
    price: "দাম",
    attentionReason: "নজর দেওয়ার কারণ",
    makeCombo: "কম্বো বানান",
    sold: "বিক্রি",
    units: "পিস",
    
    // Specific reasons for attention items
    reasonLemonTea: "আটকে থাকা স্টক: ৯০ দিনে ০ বিক্রি, ২৫০ পিস স্টকে আটকে আছে। গরম চায়ের সাথে কম্বো বানিয়ে বিক্রি করুন।",
    reasonVadaPav: "কম খদ্দের: সমোসার (৩,১৩৩ বিক্রি) তুলনায় কম বিক্রি (২৭৫ পিস)। বিকেলের চায়ের সাথে কম্বো অফার দিন।",
    reasonBiscuits: "কম আয়ের পণ্য: মোট ₹৭,৪২০ বিক্রি এবং ৪৫% লাভ। চা বা কফির সাথে ₹২০ কম্বো অ্যাড-অন করুন।",
    
    // Basket Inference
    likelyItemsTitle: "এই পেমেন্টে সম্ভাব্য কেনা জিনিস",
    likelyItemsSub: "আপনার আগের বিক্রির তথ্যের ভিত্তিতে",
    confidenceHigh: "নিশ্চয়তা: খুব বেশি (High)",
    confidenceMedium: "নিশ্চয়তা: মাঝারি (Medium)",
    basketDisclaimer: "মনে রাখবেন: এটি ক্রেতাদের অভ্যাসের ওপর ভিত্তি করে অনুমান, নিশ্চিত অর্ডার নয়।",
    frequentlyBoughtTogether: "প্রায়ই একসাথে কেনা হয় এমন জিনিস",
    
    // Copilot 4 parts
    copilotTitle: "💡 আজ কি করবেন (গ্রোথ সহকারী)",
    copilotSub: "আপনার দোকানের জন্য তৈরি বিশেষ ব্যবসায়িক পরামর্শ। কোনো প্রশ্ন ছাড়াই।",
    whatIsHappening: "কি ঘটছে?",
    whyDoesItMatter: "এটা কেন গুরুত্বপূর্ণ?",
    whatShouldIDo: "আপনার কি করা উচিত?",
    expectedExtraProfit: "প্রত্যাশিত অতিরিক্ত লাভ",
    
    // Offers
    offersTitle: "অফার এবং কম্বো",
    offersSub: "ধীর সময়ে ক্রেতা টানতে সহজ অফার চালান",
    suggestedOffers: "আপনার জন্য প্রস্তাবিত অফার",
    suggestedOffersSub: "লাভ বজায় রেখে বিক্রি বাড়ানোর তৈরি কম্বো",
    activeOffers: "দোকানে চালু থাকা অফার",
    createSimpleOffer: "নতুন অফার তৈরি করুন",
    offerTitleLabel: "অফার বা কম্বোর নাম",
    offerTypeLabel: "অফারের ধরন",
    discountLabel: "ছাড় (Discount)",
    bestTimeLabel: "চালানোর উপযুক্ত সময়",
    targetProductLabel: "পণ্য বা বান্ডিল",
    reasonLabel: "এটি কেন কার্যকর",
    saveAndActivate: "অফার সেভ ও চালু করুন",
    
    // Local Trends
    localTrendsTitle: "স্থানীয় ব্যবসার প্রবণতা",
    localTrendsSub: "আপনার এলাকার অন্যান্য দোকানে কি চলছে",
    realNetworkDataNote: "প্রকৃত আঞ্চলিক লেনদেনের তথ্যের ওপর ভিত্তি করে।",
    
    // Alert & Modal
    alertTitle: "💡 আপনার দোকানের জন্য একটি দুর্দান্ত সুযোগ",
    alertDismiss: "এখন নয়",
    alertAction: "পরামর্শ দেখুন",
    takeAction: "শুরু করুন",
    closeModal: "বন্ধ করুন",
    
    // Voice
    voiceTestSample: "পেটিএম মার্চেন্ট বিজনেস অ্যাসিস্ট্যান্টে স্বাগতম। কোনো ঝামেলা নেই, শুধুই লাভ।",
    voiceUnavailable: "আপনার ডিভাইসে বাংলা ভয়েস (bn-IN) নেই। স্ক্রিনে তথ্য বাংলায় দেখানো হচ্ছে।",
    
    // Common
    loading: "তথ্য লোড হচ্ছে...",
    retry: "আবার চেষ্টা করুন",
  },
};

// Localized 4-Part Insights for all 8 languages
export const LOCALIZED_INSIGHTS = {
  en: [
    {
      id: "rec_slow_hours",
      category: "Sales Growth Opportunity",
      title: "Boost Business During Slow Afternoon Hours",
      what_is_happening: "Your store sales are 42% lower between 3 PM and 5 PM compared to midday peak.",
      why_it_matters: "Store rent, power, and staff costs continue even when customer walk-ins drop.",
      what_to_do: "Run an Afternoon Chai & Snacks Combo at 15% off between 3 PM and 5 PM.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/day extra profit",
      speech_text: "Your sales are lower between 3 PM and 5 PM. Try an Afternoon Chai and Snacks combo. Expected extra profit is 180 rupees per day.",
      suggested_offer: {
        offer_title: "Afternoon Chai & Snacks Combo",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹180/day",
        reason: "Pulls in neighborhood shoppers during slow hours without hurting normal peak margins."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "Clear Slow Stock",
      title: "Pair Slow-Moving Items with Best Sellers",
      what_is_happening: "Slow-moving inventory items are staying on shelves, while tea and daily snacks sell fast.",
      why_it_matters: "Cash is trapped in slow-moving shelf inventory instead of generating daily profit.",
      what_to_do: "Bundle 1 slow-moving item at 20% discount with your top-selling anchor products.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/day extra profit",
      speech_text: "Bundle slow-moving stock with your top selling items. Expected extra profit is 240 rupees per day.",
      suggested_offer: {
        offer_title: "Super Saver Bundle Offer",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "All Day",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹240/day",
        reason: "Converts idle inventory into immediate working capital."
      }
    },
    {
      id: "rec_morning_boost",
      category: "Morning Business",
      title: "Increase Morning Customer Bill Size",
      what_is_happening: "Morning 8 AM to 10 AM visitors spend 25% more per bill than afternoon shoppers.",
      why_it_matters: "Morning buyers are routine commuters with higher willingness to buy quick add-ons.",
      what_to_do: "Introduce a Quick Morning Breakfast pack before 10 AM to drive basket size.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/day extra profit",
      speech_text: "Morning customers spend more per bill. Offer a morning quick breakfast combo to earn 310 rupees more per day.",
      suggested_offer: {
        offer_title: "Morning Quick-Pack Combo",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹310/day",
        reason: "Encourages routine morning buyers to purchase high-margin companion snacks."
      }
    }
  ],
  hi: [
    {
      id: "rec_slow_hours",
      category: "बिक्री बढ़ाने का मौक़ा",
      title: "दोपहर के धीमे घंटों में बिक्री बढ़ाएं",
      what_is_happening: "दोपहर 3 बजे से 5 बजे के बीच आपकी दुकान की बिक्री आम घंटों से 42% कम हो जाती है।",
      why_it_matters: "ग्राहक न होने पर भी दुकान का किराया, बिजली और स्टाफ़ का ख़र्च लगातार जारी रहता है।",
      what_to_do: "दोपहर 3 से 5 बजे के बीच चाय और स्नैक्स पर 15% छूट का कॉम्बो ऑफ़र लगाएं।",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/दिन अतिरिक्त मुनाफ़ा",
      speech_text: "दोपहर 3 से 5 बजे के बीच बिक्री कम है। चाय और स्नैक्स का कॉम्बो ऑफ़र लगाएं। रोज़ाना लगभग 180 रुपये का अतिरिक्त मुनाफ़ा हो सकता है।",
      suggested_offer: {
        offer_title: "दोपहर चाय और स्नैक्स कॉम्बो",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹180/दिन",
        reason: "दोपहर में कम बिक्री वाले समय पर ग्राहक आकर्षित करने के लिए।"
      }
    },
    {
      id: "rec_bundle_slow",
      category: "धीमे सामान की बिक्री",
      title: "धीमे बिकने वाले सामान को लोकप्रिय सामान के साथ जोड़ें",
      what_is_happening: "कुछ विशेष सामान हफ़्तों से कम बिक रहे हैं, जबकि चाय और स्नैक्स तेज़ी से बिक रहे हैं।",
      why_it_matters: "दुकान की अलमारियों में फंसा हुआ सामान आपकी पूंजी और जगह दोनों रोकता है।",
      what_to_do: "ज़्यादा बिकने वाले सामान के साथ धीमे सामान को 20% छूट पर कॉम्बो बनाकर बेचें।",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/दिन अतिरिक्त मुनाफ़ा",
      speech_text: "धीमे बिकने वाले सामान को सबसे लोकप्रिय सामान के साथ जोड़कर कॉम्बो बनाएं। रोज़ाना 240 रुपये का अतिरिक्त मुनाफ़ा होगा।",
      suggested_offer: {
        offer_title: "सुपर सेवर बंडल ऑफ़र",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "पूरा दिन",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹240/दिन",
        reason: "पुराना और धीमा स्टॉक जल्दी ख़ाली करने के लिए।"
      }
    },
    {
      id: "rec_morning_boost",
      category: "सुबह का व्यापार",
      title: "सुबह के ग्राहकों का बिल आकार बढ़ाएं",
      what_is_happening: "सुबह 8 से 10 बजे आने वाले ग्राहक प्रति बिल 25% अधिक ख़र्च करते हैं।",
      why_it_matters: "सुबह के ग्राहक नियमित होते हैं और अच्छी खरीदारी करते हैं।",
      what_to_do: "सुबह 10 बजे से पहले ख़रीदने पर एक छोटा नाश्ता पैक या कॉम्बो ऑफ़र दें।",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/दिन अतिरिक्त मुनाफ़ा",
      speech_text: "सुबह के ग्राहक बड़ा बिल बनाते हैं। सुबह का स्पेशल कॉम्बो देकर रोज़ 310 रुपये अतिरिक्त कमाएं।",
      suggested_offer: {
        offer_title: "सवेरा स्पेशल कॉम्बो",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹310/दिन",
        reason: "सुबह के नियमित ग्राहकों को आदत बनाने के लिए।"
      }
    }
  ],
  kn: [
    {
      id: "rec_slow_hours",
      category: "ಮಾರಾಟ ಹೆಚ್ಚಿಸುವ ಅವಕಾಶ",
      title: "ಮಧ್ಯಾಹ್ನದ ನಿಧಾನದ ಸಮಯದಲ್ಲಿ ಮಾರಾಟ ಹೆಚ್ಚಿಸಿ",
      what_is_happening: "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ನಿಮ್ಮ ಅಂಗಡಿಯ ಮಾರಾಟ ಶೇಕಡಾ 42 ರಷ್ಟು ಕಡಿಮೆಯಾಗಿದೆ.",
      why_it_matters: "ಗ್ರಾಹಕರು ಬರದಿದ್ದರೂ ಅಂಗಡಿಯ ಬಾಡಿಗೆ ಮತ್ತು ವಿದ್ಯುತ್ ಬಿಲ್ ವೆಚ್ಚ ಮುಂದುವರಿಯುತ್ತದೆ.",
      what_to_do: "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಚಹಾ ಮತ್ತು ಬಿಸ್ಕತ್ತು 15% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹180 ಹೆಚ್ಚುವರಿ ಲಾಭ",
      speech_text: "ಮಧ್ಯಾಹ್ನ 3 ರಿಂದ 5 ರವರೆಗೆ ಮಾರಾಟ ಕಡಿಮೆ ಇದೆ. ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ ಆಫರ್ ನೀಡಿ. ದಿನಕ್ಕೆ ಸುಮಾರು 180 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.",
      suggested_offer: {
        offer_title: "ಮಧ್ಯಾಹ್ನದ ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹180",
        reason: "ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ಹೊಸ ಗ್ರಾಹಕರನ್ನು ಸೆಳೆಯಲು."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "ನಿಧಾನ ಸರಕುಗಳ ಮಾರಾಟ",
      title: "ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳ ಜೊತೆ ಸೇರಿಸಿ",
      what_is_happening: "ಕೆಲವು ವಸ್ತುಗಳು ಕಡಿಮೆ ಮಾರಾಟವಾಗುತ್ತಿವೆ, ಆದರೆ ಮುಖ್ಯ ವಸ್ತುಗಳು ಬೇಗ ಖಾಲಿಯಾಗುತ್ತಿವೆ.",
      why_it_matters: "ನಿಧಾನವಾಗಿ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳು ನಿಮ್ಮ ಬಂಡವಾಳ ಮತ್ತು ಸ್ಥಳವನ್ನು ತಡೆಯುತ್ತವೆ.",
      what_to_do: "ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುವಿನೊಂದಿಗೆ ನಿಧಾನದ ವಸ್ತುವಿಗೆ 20% ರಿಯಾಯಿತಿ ಕಾಂಬೋ ಮಾಡಿ.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹240 ಹೆಚ್ಚುವರಿ ಲಾಭ",
      speech_text: "ಕಡಿಮೆ ಮಾರಾಟವಾಗುವ ವಸ್ತುಗಳನ್ನು ಉತ್ತಮ ವಸ್ತುಗಳೊಂದಿಗೆ ಸೇರಿಸಿ ಕಾಂಬೋ ಮಾಡಿ. ದಿನಕ್ಕೆ 240 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಗಳಿಸಿ.",
      suggested_offer: {
        offer_title: "ಸ್ಪೆಷಲ್ ಸೂಪರ್ ಸೇವರ್ ಕಾಂಬೋ",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "ದಿನವಿಡೀ",
        expected_extra_profit: 240,
        expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹240",
        reason: "ಹಳೆಯ ಸರಕುಗಳನ್ನು ಸುಲಭವಾಗಿ ಮಾರಾಟ ಮಾಡಲು."
      }
    },
    {
      id: "rec_morning_boost",
      category: "ಬೆಳಗಿನ ವ್ಯಾಪಾರ",
      title: "ಬೆಳಗಿನ ಗ್ರಾಹಕರ ಸರಾಸರಿ ಬಿಲ್ ಮೊತ್ತ ಹೆಚ್ಚಿಸಿ",
      what_is_happening: "ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ 10 ರವರೆಗೆ ಬರುವ ಗ್ರಾಹಕರು ಪ್ರತಿ ಬಿಲ್ ಮೇಲೆ 25% ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡುತ್ತಾರೆ.",
      why_it_matters: "ಬೆಳಗಿನ ಗ್ರಾಹಕರು ನಿಷ್ಠಾವಂತರಾಗಿದ್ದು ಹೆಚ್ಚು ಮೌಲ್ಯದ ವಸ್ತುಗಳನ್ನು ಖರೀದಿಸುತ್ತಾರೆ.",
      what_to_do: "ಬೆಳಿಗ್ಗೆ 10 ಗಂಟೆ ಮುಂಚಿತವಾಗಿ ಖರೀದಿಸುವವರಿಗೆ ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ ನೀಡಿ.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹310 ಹೆಚ್ಚುವರಿ ಲಾಭ",
      speech_text: "ಬೆಳಗಿನ ಗ್ರಾಹಕರು ದೊಡ್ಡ ಬಿಲ್ ಮಾಡುತ್ತಾರೆ. ಬೆಳಗಿನ ಸ್ಪೆಷಲ್ ಆಫರ್ ನೀಡಿ ದಿನಕ್ಕೆ 310 ರೂಪಾಯಿ ಹೆಚ್ಚುವರಿ ಲಾಭ ಪಡೆಯಿರಿ.",
      suggested_offer: {
        offer_title: "ಮುಂಜಾನೆಯ ಸ್ಪೆಷಲ್ ಕಾಂಬೋ",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹310",
        reason: "ಪ್ರತಿದಿನ ಬರುವ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ ಹೆಚ್ಚಿಸಲು."
      }
    }
  ],
  ta: [
    {
      id: "rec_slow_hours",
      category: "விற்பனை வாய்ப்பு",
      title: "பிற்பகல் மந்தமான நேரத்தில் விற்பனையை அதிகரிக்கவும்",
      what_is_happening: "பிற்பகல் 3 முதல் 5 மணி வரை உங்கள் கடை விற்பனை மற்ற நேரங்களை விட 42% குறைகிறது.",
      why_it_matters: "வாடிக்கையாளர் வராவிட்டாலும் கடையின் வாடகை, மின் கட்டணம் தொடர்கிறது.",
      what_to_do: "பிற்பகல் 3 முதல் 5 மணி வரை டீ மற்றும் ஸ்நாக்ஸ் காம்போவிற்கு 15% தள்ளுபடி ஆஃபர் வழங்கவும்.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "ஒரு நாளைக்கு ₹180 கூடுதல் லாபம்",
      speech_text: "பிற்பகல் 3 முதல் 5 மணி வரை விற்பனை குறைவாக உள்ளது. டீ மற்றும் ஸ்நாக்ஸ் காம்போ ஆஃபர் தரவும். தினமும் சுமார் 180 ரூபாய் கூடுதல் லாபம் கிடைக்கும்.",
      suggested_offer: {
        offer_title: "மதிய டீ மற்றும் ஸ்நாக்ஸ் காம்போ",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹180/நாள்",
        reason: "மதிய நேரத்தில் வாடிக்கையாளர்களை எளிதாக ஈர்க்க."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "தேங்கிய பொருட்கள் விற்பனை",
      title: "மெதுவாக விற்கும் பொருட்களை அதிகம் விற்கும் பொருட்களோடு இணைக்கவும்",
      what_is_happening: "சில பொருட்கள் வாரக்கணக்கில் தேங்கியுள்ளன, ஆனால் டீ மற்றும் ஸ்நாக்ஸ் உடனே விற்றுத் தீர்கின்றன.",
      why_it_matters: "தேங்கிய பொருட்கள் உங்கள் முதலீட்டையும் இடத்தையும் முடக்குகின்றன.",
      what_to_do: "அதிகம் விற்கும் பொருட்களுடன் தேங்கிய பொருளை 20% தள்ளுபடியில் காம்போவாக விற்கவும்.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "ஒரு நாளைக்கு ₹240 கூடுதல் லாபம்",
      speech_text: "மெதுவாக விற்கும் பொருட்களை நல்ல பொருட்களுடன் காம்போ ஆக்குங்கள். தினமும் 240 ரூபாய் கூடுதல் லாபம் பெறலாம்.",
      suggested_offer: {
        offer_title: "சூப்பர் சேவர் பண்டில் ஆஃபர்",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "நாள் முழுவதும்",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹240/நாள்",
        reason: "பழைய இருப்பை விரைவாக விற்று பணமாக்க."
      }
    },
    {
      id: "rec_morning_boost",
      category: "காலை வர்த்தகம்",
      title: "காலை வாடிக்கையாளர்களின் பில் தொகையை உயர்த்தவும்",
      what_is_happening: "காலை 8 முதல் 10 மணி வரை வரும் வாடிக்கையாளர்கள் சராசரியாக 25% அதிகம் செலவிடுகிறார்கள்.",
      why_it_matters: "காலை வாடிக்கையாளர்கள் வழக்கமாக வருபவர்கள் மற்றும் நல்ல பில் போடுபவர்கள்.",
      what_to_do: "காலை 10 மணிக்குள் வாங்குவோருக்கு விரைவு காலை உணவு காம்போ ஆஃபர் வழங்கவும்.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "ஒரு நாளைக்கு ₹310 கூடுதல் லாபம்",
      speech_text: "காலை வாடிக்கையாளர்கள் அதிக தொகைக்கு வாங்குகிறார்கள். காலை ஸ்பெஷல் காம்போ தந்து தினமும் 310 ரூபாய் கூடுதல் லாபம் ஈட்டுங்கள்.",
      suggested_offer: {
        offer_title: "காலை ஸ்பெஷல் காம்போ",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹310/நாள்",
        reason: "வழக்கமான வாடிக்கையாளர்களை கவர."
      }
    }
  ],
  te: [
    {
      id: "rec_slow_hours",
      category: "అమ్మకాల అవకాశం",
      title: "మధ్యాహ్నం నెమ్మదిగా ఉన్న సమయంలో అమ్మకాలను పెంచండి",
      what_is_happening: "మధ్యాహ్నం 3 నుండి 5 గంటల మధ్య మీ దుకాణం అమ్మకాలు 42% తగ్గుతున్నాయి.",
      why_it_matters: "కస్టమర్లు రాకపోయినా దుకాణం అద్దె, విద్యుత్ బిల్లు ఖర్చులు కొనసాగుతాయి.",
      what_to_do: "మధ్యాహ్నం 3 నుండి 5 మధ్య టీ మరియు స్నాక్స్ పై 15% డిస్కౌంట్ కాంబో ఆఫర్ ఇవ్వండి.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "రోజుకు ₹180 అదనపు లాభం",
      speech_text: "మధ్యాహ్నం 3 నుండి 5 మధ్య అమ్మకాలు తక్కువగా ఉన్నాయి. టీ మరియు స్నాక్స్ కాంబో ఆఫర్ ఇవ్వండి. రోజుకు 180 రూపాయల అదనపు లాభం పొందవచ్చు.",
      suggested_offer: {
        offer_title: "మధ్యాహ్నం టీ & స్నాక్స్ కాంబో",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹180/రోజు",
        reason: "మధ్యాహ్నం వేళల్లో కొత్త కస్టమర్లను ఆకర్షించడానికి."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "స్టాక్ క్లియరెన్స్",
      title: "నెమ్మదిగా అమ్ముడయ్యే వస్తువులను ఎక్కువ అమ్మకాల వస్తువులతో కలపండి",
      what_is_happening: "కొన్ని వస్తువులు చాలా రోజులుగా అమ్ముడవటం లేదు, కానీ టీ మరియు స్నాక్స్ వేగంగా అమ్ముడవుతున్నాయి.",
      why_it_matters: "మిగిలిపోయిన స్టాక్ మీ పెట్టుబడిని మరియు స్థలాన్ని ఆపేస్తుంది.",
      what_to_do: "ఎక్కువగా అమ్ముడయ్యే వస్తువుతో నెమ్మది వస్తువును 20% డిస్కౌంట్‌తో కాంబోగా అమ్మండి.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "రోజుకు ₹240 అదనపు లాభం",
      speech_text: "నెమ్మది వస్తువులను బెస్ట్ సెల్లింగ్ వస్తువులతో కలిపి కాంబో చేయండి. రోజుకు 240 రూపాయల అదనపు లాభం పొందండి.",
      suggested_offer: {
        offer_title: "సూపర్ సేవర్ బండిల్ ఆఫర్",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "రోజంతా",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹240/రోజు",
        reason: "పాత స్టాక్‌ను త్వరగా ఖాళీ చేసి డబ్బుగా మార్చడానికి."
      }
    },
    {
      id: "rec_morning_boost",
      category: "ఉదయపు వ్యాపారం",
      title: "ఉదయపు కస్టమర్ల బిల్లు పరిమాణాన్ని పెంచండి",
      what_is_happening: "ఉదయం 8 నుండి 10 గంటల మధ్య వచ్చే కస్టమర్లు సగటున 25% ఎక్కువ ఖర్చు చేస్తారు.",
      why_it_matters: "ఉదయపు కస్టమర్లు రెగ్యులర్ గా వస్తారు మరియు ఎక్కువ కొనుగోలు చేస్తారు.",
      what_to_do: "ఉదయం 10 గంటల లోపు క్విక్ బ్రేక్‌ఫాస్ట్ కాంబో ఆఫర్ ప్రవేశపెట్టండి.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "రోజుకు ₹310 అదనపు లాభం",
      speech_text: "ఉదయపు కస్టమర్లు పెద్ద బిల్లులు చేస్తారు. మార్నింగ్ స్పెషల్ కాంబో ఇచ్చి రోజుకు 310 రూపాయలు ఎక్కువగా సంపాదించండి.",
      suggested_offer: {
        offer_title: "మార్నింగ్ స్పెషల్ కాంబో",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹310/రోజు",
        reason: "రెగ్యులర్ కస్టమర్లను మరింత ఆకర్షించడానికి."
      }
    }
  ],
  ml: [
    {
      id: "rec_slow_hours",
      category: "വിൽപ്പന അവസരം",
      title: "ഉച്ചതിരിഞ്ഞുള്ള തിരക്ക് കുറഞ്ഞ സമയത്ത് വിൽപ്പന കൂട്ടുക",
      what_is_happening: "ഉച്ചയ്ക്ക് 3 നും 5 നും ഇടയിൽ നിങ്ങളുടെ കടയിലെ വിൽപ്പന 42% കുറവാണ്.",
      why_it_matters: "ഉപഭോക്താക്കൾ എത്തിയില്ലെങ്കിലും വാടക, വൈദ്യുതി ചിലവുകൾ തുടരുന്നു.",
      what_to_do: "ഉച്ചയ്ക്ക് 3 മുതൽ 5 വരെ ചായയ്ക്കും ലഘുഭക്ഷണത്തിനും 15% കിഴിവ് കോംബോ നൽകുക.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "പ്രതിദിനം ₹180 അധിക ലാഭം",
      speech_text: "ഉച്ചയ്ക്ക് 3 നും 5 നും ഇടയിൽ കച്ചവടം കുറവാണ്. ചായയും പലഹാരവും ചേർത്ത കോംബോ ഓഫർ നൽകുക. പ്രതിദിനം 180 രൂപ അധിക ലാഭം നേടാം.",
      suggested_offer: {
        offer_title: "വൈകുന്നേര ചായയും പലഹാരവും കോംബോ",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹180/ദിവസം",
        reason: "തിരക്ക് കുറഞ്ഞ സമയത്ത് ആളുകളെ ആകർഷിക്കാൻ."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "സ്റ്റോക്ക് ക്ലിയറൻസ്",
      title: "പതുക്കെ വിൽക്കുന്ന സാധനങ്ങൾ നല്ല സാധനങ്ങളോടൊപ്പം നൽകുക",
      what_is_happening: "ചില ഉൽപ്പന്നങ്ങൾ ആഴ്ചകളായി വിൽക്കാതെ ഇരിക്കുന്നു, എന്നാൽ ചായ വേഗത്തിൽ വിറ്റുതീരുന്നു.",
      why_it_matters: "കെട്ടിക്കിടക്കുന്ന സാധനങ്ങൾ നിങ്ങളുടെ പണവും സ്ഥലവും അപഹരിക്കുന്നു.",
      what_to_do: "കൂടുതൽ വിൽക്കുന്ന സാധനത്തിനൊപ്പം കെട്ടിക്കിടക്കുന്ന സാധനം 20% കിഴിവിൽ കോംബോ ആക്കി നൽകുക.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "പ്രതിദിനം ₹240 അധിക ലാഭം",
      speech_text: "പതുക്കെ വിൽക്കുന്ന സാധനങ്ങൾ നല്ല സാധനങ്ങളോടൊപ്പം കോംബോ ആക്കി വിൽക്കുക. ദിവസവും 240 രൂപ അധിക ലാഭം നേടാം.",
      suggested_offer: {
        offer_title: "സൂപ്പർ സേവർ ബണ്ടിൽ ഓഫർ",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "ദിവസം മുഴുവൻ",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹240/ദിവസം",
        reason: "പഴയ സ്റ്റോക്ക് പെട്ടെന്ന് വിറ്റ് പണമാക്കാൻ."
      }
    },
    {
      id: "rec_morning_boost",
      category: "രാവിലത്തെ ബിസിനസ്സ്",
      title: "രാവിലത്തെ ഉപഭോക്താക്കളുടെ ബിൽ തുക വർദ്ധിപ്പിക്കുക",
      what_is_happening: "രാവിലെ 8 നും 10 നും ഇടയിൽ വരുന്നവർ ശരാശരി 25% കൂടുതൽ തുക ചിലവഴിക്കുന്നു.",
      why_it_matters: "രാവിലത്തെ ഉപഭോക്താക്കൾ സ്ഥിരമായി വരുന്നവരും കൂടുതൽ വാങ്ങുന്നവരുമാണ്.",
      what_to_do: "രാവിലെ 10 മണിക്ക് മുൻപായി വാങ്ങുന്നവർക്ക് പ്രഭാത സ്പെഷ്യൽ കോംബോ നൽകുക.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "പ്രതിദിനം ₹310 അധിക ലാഭം",
      speech_text: "രാവിലത്തെ ഉപഭോക്താക്കൾ വലിയ ബില്ലുകൾ നൽകുന്നു. രാവിലത്തെ സ്പെഷ്യൽ കോംബോ നൽകി ദിവസവും 310 രൂപ അധികം നേടുക.",
      suggested_offer: {
        offer_title: "പ്രഭാത സ്പെഷ്യൽ കോംബോ",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹310/ദിവസം",
        reason: "സ്ഥിരം ഉപഭോക്താക്കളുടെ എണ്ണം കൂട്ടാൻ."
      }
    }
  ],
  mr: [
    {
      id: "rec_slow_hours",
      category: "विक्री वाढवण्याची संधी",
      title: "दुपारच्या मंद वेळेत विक्री वाढवा",
      what_is_happening: "दुपारी ३ ते ५ दरम्यान तुमच्या दुकानाची विक्री इतर वेळेपेक्षा ४२% कमी होते.",
      why_it_matters: "ग्राहक आले नाहीत तरी दुकानाचे भाडे आणि वीज बिल सुरूच राहते.",
      what_to_do: "दुपारी ३ ते ५ दरम्यान चहा आणि स्नॅक्सवर १५% सूट देणारा कॉम्बो लावा.",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹१८०/दिवस अतिरिक्त नफा",
      speech_text: "दुपारी ३ ते ५ दरम्यान विक्री कमी आहे. चहा आणि स्नॅक्सचा कॉम्बो लावा. दररोज सुमारे १८० रुपये अतिरिक्त नफा मिळवा.",
      suggested_offer: {
        offer_title: "दुपारचा चहा आणि स्नॅक्स कॉम्बो",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹१८०/दिवस",
        reason: "दुपारच्या मंद वेळेत ग्राहकांना आकर्षित करण्यासाठी."
      }
    },
    {
      id: "rec_bundle_slow",
      category: "मंद मालाचा खप",
      title: "कमी खपाचा माल लोकप्रिय सामानासोबत जोडा",
      what_is_happening: "काही सामान कित्येक आठवडे पडून आहे, पण चहा आणि स्नॅक्स लगेच संपतात.",
      why_it_matters: "अडकून पडलेला माल तुमचे भांडवल आणि दुकानातील जागा अडवून ठेवतो.",
      what_to_do: "जास्त खपाच्या मालासोबत कमी खपाचा माल २०% सवलतीवर कॉम्बो करून विका.",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹२४०/दिवस अतिरिक्त नफा",
      speech_text: "कमी खपाचे सामान लोकप्रिय सामानासोबत जोडून कॉम्बो बनवा. दररोज २४० रुपये अतिरिक्त नफा मिळवा.",
      suggested_offer: {
        offer_title: "सुपर सेव्हर बंडल ऑफर",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "पूर्ण दिवस",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹२४०/दिवस",
        reason: "जुना साठा पटकन संपवून भांडवल मोकळे करण्यासाठी."
      }
    },
    {
      id: "rec_morning_boost",
      category: "सकाळचा व्यवसाय",
      title: "सकाळच्या ग्राहकांचे बिल वाढवा",
      what_is_happening: "सकाळी ८ ते १० दरम्यान येणारे ग्राहक सरासरी २५% जास्त खर्च करतात.",
      why_it_matters: "सकाळचे ग्राहक नियमित असतात आणि मोठे बिल करतात.",
      what_to_do: "सकाळी १० च्या आत सकाळचा स्पेशल नाश्ता कॉम्बो सुरू करा.",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹३१०/दिवस अतिरिक्त नफा",
      speech_text: "सकाळचे ग्राहक जास्त खर्च करतात. सकाळचा स्पेशल कॉम्बो देऊन दररोज ३१० रुपये जास्त कमवा.",
      suggested_offer: {
        offer_title: "सकाळचा स्पेशल कॉम्बो",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹३१०/दिवस",
        reason: "नियमित ग्राहकांना आकर्षित करण्यासाठी."
      }
    }
  ],
  bn: [
    {
      id: "rec_slow_hours",
      category: "বিক্রি বৃদ্ধির সুযোগ",
      title: "বিকেলের ধীর সময়ে বিক্রি বাড়ান",
      what_is_happening: "বিকেল ৩টা থেকে ৫টার মধ্যে আপনার দোকানে বিক্রি স্বাভাবিকের চেয়ে ৪২% কম হয়।",
      why_it_matters: "গ্রাহক না থাকলেও দোকানের ভাড়া এবং বিদ্যুৎ বিল চলতে থাকে।",
      what_to_do: "বিকেল ৩টা থেকে ৫টার মধ্যে চা ও স্ন্যাক্সে ১৫% ছাড়ের কম্বো অফার চালান।",
      expected_extra_profit: 180,
      expected_extra_profit_display: "প্রতিদিন ₹১৮০ অতিরিক্ত লাভ",
      speech_text: "বিকেল ৩টা থেকে ৫টার মধ্যে বিক্রি কম থাকে। চা ও স্ন্যাক্স কম্বো অফার দিন। প্রতিদিন প্রায় ১৮০ টাকা অতিরিক্ত লাভ করুন।",
      suggested_offer: {
        offer_title: "বিকেলের চা ও স্ন্যাক্স কম্বো",
        offer_type: "combo",
        discount_pct: 15,
        best_time: "3:00 PM – 5:00 PM",
        expected_extra_profit: 180,
        expected_extra_profit_display: "₹১৮০/দিন",
        reason: "ধীর সময়ে নতুন ক্রেতা টানার জন্য।"
      }
    },
    {
      id: "rec_bundle_slow",
      category: "ধীর মাল বিক্রির উপায়",
      title: "কম বিক্রিত মাল বেশি বিক্রিত মালের সাথে জুড়ুন",
      what_is_happening: "কিছু পণ্য অনেক দিন ধরে অবিক্রিত পড়ে আছে, অথচ চা ও খাবার দ্রুত শেষ হয়ে যায়।",
      why_it_matters: "আটকে থাকা মাল আপনার পুঁজি এবং দোকানের জায়গা আটকে রাখে।",
      what_to_do: "সবচেয়ে বেশি বিক্রিত পণ্যের সাথে কম বিক্রিত পণ্য ২০% ছাড়ে কম্বো বানিয়ে বিক্রি করুন।",
      expected_extra_profit: 240,
      expected_extra_profit_display: "প্রতিদিন ₹২৪০ অতিরিক্ত লাভ",
      speech_text: "ধীর বিক্রিত পণ্য বেশি বিক্রিত পণ্যের সাথে কম্বো বানান। প্রতিদিন ২৪০ টাকা অতিরিক্ত লাভ হবে।",
      suggested_offer: {
        offer_title: "সুপার সেভার বান্ডিল অফার",
        offer_type: "bundle",
        discount_pct: 20,
        best_time: "সারাদিন",
        expected_extra_profit: 240,
        expected_extra_profit_display: "₹২৪০/দিন",
        reason: "পুরোনো স্টক দ্রুত খালি করে পুঁজি ফেরাতে।"
      }
    },
    {
      id: "rec_morning_boost",
      category: "সকালের ব্যবসা",
      title: "সকালের ক্রেতাদের গড় বিলের আকার বাড়ান",
      what_is_happening: "সকাল ৮টা থেকে ১০টার মধ্যে আসা ক্রেতারা গড়ে ২৫% বেশি খরচ করেন।",
      why_it_matters: "সকালের ক্রেতারা নিয়মিত আসেন এবং ভালো অঙ্কের বাজার করেন।",
      what_to_do: "সকাল ১০টার আগে সকালের বিশেষ জলখাবার কম্বো অফার দিন।",
      expected_extra_profit: 310,
      expected_extra_profit_display: "প্রতিদিন ₹৩১০ অতিরিক্ত লাভ",
      speech_text: "সকালের ক্রেতারা বেশি কেনাকাটা করেন। সকালের স্পেশাল কম্বো দিয়ে প্রতিদিন ৩১০ টাকা বাড়তি লাভ করুন।",
      suggested_offer: {
        offer_title: "সকালের স্পেশাল কম্বো",
        offer_type: "flash_sale",
        discount_pct: 10,
        best_time: "8:00 AM – 10:00 AM",
        expected_extra_profit: 310,
        expected_extra_profit_display: "₹৩১০/দিন",
        reason: "নিয়মিত গ্রাহকদের অভ্যাসে পরিণত করতে।"
      }
    }
  ]
};

// Helper to get localized insights list
export function getLocalizedInsights(rawInsights, lang = 'en') {
  const localizedList = LOCALIZED_INSIGHTS[lang] || LOCALIZED_INSIGHTS.en;
  if (!rawInsights || rawInsights.length === 0) return localizedList;

  return rawInsights.map((item, idx) => {
    const match = localizedList.find((loc) => loc.id === item.id) || localizedList[idx] || item;
    return {
      ...item,
      category: match.category || item.category,
      title: match.title || item.title,
      what_is_happening: match.what_is_happening || item.what_is_happening,
      why_it_matters: match.why_it_matters || item.why_it_matters,
      what_to_do: match.what_to_do || item.what_to_do,
      expected_extra_profit_display: match.expected_extra_profit_display || item.expected_extra_profit_display,
      speech_text: match.speech_text || item.speech_text,
      suggested_offer: match.suggested_offer || item.suggested_offer,
    };
  });
}

// Localized Suggested Offers for all 8 languages
export const LOCALIZED_OFFERS = {
  en: [
    {
      id: "sug_01",
      product_bundle: "Afternoon Chai & Snacks Combo",
      offer_price: "₹35 (15% OFF)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/day",
      reason: "Sales are 42% lower during afternoon hours. A quick snack combo brings in walk-in customers without cutting normal margins."
    },
    {
      id: "sug_02",
      product_bundle: "Top Seller + Slow Stock Clearance Bundle",
      offer_price: "₹85 (20% OFF on slow item)",
      discount_pct: 20,
      best_time: "All Day",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/day",
      reason: "Pairs your fastest-moving product with slow-moving inventory to free up shelf cash."
    },
    {
      id: "sug_03",
      product_bundle: "Morning Quick-Pack Combo",
      offer_price: "₹40 (10% OFF)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/day",
      reason: "Morning buyers spend 25% more per bill. A simple combo encourages daily habits."
    }
  ],
  hi: [
    {
      id: "sug_01",
      product_bundle: "दोपहर चाय और स्नैक्स कॉम्बो",
      offer_price: "₹35 (15% छूट)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/दिन",
      reason: "दोपहर 3 से 5 के बीच बिक्री 42% कम होती है। यह कॉम्बो नए ग्राहकों को खींचने के लिए सबसे अच्छा है।"
    },
    {
      id: "sug_02",
      product_bundle: "सुपर सेवर स्टॉक क्लीयरेंस बंडल",
      offer_price: "₹85 (धीमे सामान पर 20% छूट)",
      discount_pct: 20,
      best_time: "पूरा दिन",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/दिन",
      reason: "ज़्यादा बिकने वाले सामान के साथ धीमे सामान को बेचकर अपनी फंसी हुई पूंजी तुरंत निकालें।"
    },
    {
      id: "sug_03",
      product_bundle: "सवेरा स्पेशल नाश्ता कॉम्बो",
      offer_price: "₹40 (10% छूट)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/दिन",
      reason: "सुबह के ग्राहक 25% बड़ा बिल बनाते हैं। यह कॉम्बो रोज़मर्रा के खरीदारों को आदत बनाता है।"
    }
  ],
  kn: [
    {
      id: "sug_01",
      product_bundle: "ಮಧ್ಯಾಹ್ನದ ಚಹಾ ಮತ್ತು ತಿಂಡಿ ಕಾಂಬೋ",
      offer_price: "₹35 (15% ರಿಯಾಯಿತಿ)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹180",
      reason: "ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ವ್ಯಾಪಾರ 42% ಕಡಿಮೆ ಇರುತ್ತದೆ. ಈ ಕಾಂಬೋ ಗ್ರಾಹಕರನ್ನು ಸುಲಭವಾಗಿ ಸೆಳೆಯುತ್ತದೆ."
    },
    {
      id: "sug_02",
      product_bundle: "ಸೂಪರ್ ಸೇವರ್ ಸ್ಟಾಕ್ ಕ್ಲಿಯರೆನ್ಸ್ ಕಾಂಬೋ",
      offer_price: "₹85 (ನಿಧಾನ ಸರಕಿನ ಮೇಲೆ 20% ರಿಯಾಯಿತಿ)",
      discount_pct: 20,
      best_time: "ದಿನವಿಡೀ",
      expected_extra_profit: 240,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹240",
      reason: "ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವ ವಸ್ತುವಿನೊಂದಿಗೆ ನಿಧಾನದ ವಸ್ತುವನ್ನು ಮಾರಿ ಬಂಡವಾಳವನ್ನು ಬೇಗ ಮುಕ್ತಗೊಳಿಸಿ."
    },
    {
      id: "sug_03",
      product_bundle: "ಮುಂಜಾನೆಯ ಸ್ಪೆಷಲ್ ತಿಂಡಿ ಕಾಂಬೋ",
      offer_price: "₹40 (10% ರಿಯಾಯಿತಿ)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "ದಿನಕ್ಕೆ ₹310",
      reason: "ಬೆಳಗಿನ ಗ್ರಾಹಕರು 25% ಹೆಚ್ಚು ಖರ್ಚು ಮಾಡುತ್ತಾರೆ. ಇದು ನಿಷ್ಠಾವಂತ ಗ್ರಾಹಕರನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ."
    }
  ],
  ta: [
    {
      id: "sug_01",
      product_bundle: "மதிய டீ மற்றும் ஸ்நாக்ஸ் காம்போ",
      offer_price: "₹35 (15% தள்ளுபடி)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/நாள்",
      reason: "பிற்பகல் நேரங்களில் விற்பனை 42% குறைகிறது. இந்த காம்போ வாடிக்கையாளர்களை கடையை நோக்கி ஈர்க்கும்."
    },
    {
      id: "sug_02",
      product_bundle: "சூப்பர் சேவர் ஸ்டாக் கிளியரன்ஸ் பண்டில்",
      offer_price: "₹85 (தேங்கிய பொருளுக்கு 20% தள்ளுபடி)",
      discount_pct: 20,
      best_time: "நாள் முழுவதும்",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/நாள்",
      reason: "அதிகம் விற்கும் பொருளுடன் தேங்கிய பொருளை இணைத்து விற்பதன் மூலம் முடங்கிய முதலீட்டை மீட்கலாம்."
    },
    {
      id: "sug_03",
      product_bundle: "காலை ஸ்பெஷல் விரைவு உணவு காம்போ",
      offer_price: "₹40 (10% தள்ளுபடி)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/நாள்",
      reason: "காலை வாடிக்கையாளர்கள் 25% அதிக தொகைக்கு வாங்குகிறார்கள். இது வழக்கமான வாடிக்கையாளர்களை அதிகப்படுத்தும்."
    }
  ],
  te: [
    {
      id: "sug_01",
      product_bundle: "మధ్యాహ్నం టీ & స్నాక్స్ కాంబో",
      offer_price: "₹35 (15% డిస్కౌంట్)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/రోజు",
      reason: "మధ్యాహ్నం వేళల్లో అమ్మకాలు 42% తక్కువగా ఉంటాయి. ఈ కాంబో వాకిన్ కస్టమర్లను ఆకర్షిస్తుంది."
    },
    {
      id: "sug_02",
      product_bundle: "సూపర్ సేవర్ స్టాక్ క్లియరెన్స్ బండిల్",
      offer_price: "₹85 (నెమ్మది వస్తువుపై 20% డిస్కౌంట్)",
      discount_pct: 20,
      best_time: "రోజంతా",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/రోజు",
      reason: "ఫాస్ట్ మూవింగ్ వస్తువులతో నిలిచిపోయిన స్టాక్‌ను విక్రయించి నగదును వేగంగా రీసైకిల్ చేయండి."
    },
    {
      id: "sug_03",
      product_bundle: "మార్నింగ్ స్పెషల్ బ్రేక్‌ఫాస్ట్ కాంబో",
      offer_price: "₹40 (10% డిస్కౌంట్)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/రోజు",
      reason: "ఉదయపు కస్టమర్లు 25% ఎక్కువ బిల్లు చేస్తారు. ఈ కాంబో వారిని రెగ్యులర్ అలవాటుగా మారుస్తుంది."
    }
  ],
  ml: [
    {
      id: "sug_01",
      product_bundle: "വൈകുന്നേര ചായയും പലഹാരവും കോംബോ",
      offer_price: "₹35 (15% കിഴിവ്)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹180/ദിവസം",
      reason: "ഉച്ചയ്ക്ക് 3 മുതൽ 5 വരെ വിൽപ്പന 42% കുറവാണ്. ഈ കോംബോ കൂടുതൽ ഉപഭോക്താക്കളെ കടയിലേക്ക് എത്തിക്കും."
    },
    {
      id: "sug_02",
      product_bundle: "സൂപ്പർ സേവർ സ്റ്റോക്ക് ക്ലിയറൻസ് കോംബോ",
      offer_price: "₹85 (കെട്ടിക്കിടക്കുന്ന സാധനത്തിന് 20% കിഴിവ്)",
      discount_pct: 20,
      best_time: "ദിവസം മുഴുവൻ",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹240/ദിവസം",
      reason: "കൂടുതൽ വിൽക്കുന്ന സാധനത്തോടൊപ്പം പഴയ സാധനങ്ങൾ വിറ്റ് പണം വേഗത്തിൽ തിരിച്ചെടുക്കാം."
    },
    {
      id: "sug_03",
      product_bundle: "പ്രഭാത സ്പെഷ്യൽ പലഹാര കോംബോ",
      offer_price: "₹40 (10% കിഴിവ്)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹310/ദിവസം",
      reason: "രാവിലത്തെ ഉപഭോക്താക്കൾ 25% കൂടുതൽ തുക ചെലവഴിക്കുന്നു. ഇത് ഉപഭോക്താക്കളുടെ എണ്ണം കൂട്ടും."
    }
  ],
  mr: [
    {
      id: "sug_01",
      product_bundle: "दुपारचा चहा आणि स्नॅक्स कॉम्बो",
      offer_price: "₹३५ (१५% सूट)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹१८०/दिवस",
      reason: "दुपारी विक्री ४२% कमी असते. हा कॉम्बो नवीन ग्राहकांना सहज आकर्षित करतो."
    },
    {
      id: "sug_02",
      product_bundle: "सुपर सेव्हर स्टॉक क्लिअरन्स बंडल",
      offer_price: "₹८५ (मंद मालावर २०% सूट)",
      discount_pct: 20,
      best_time: "पूर्ण दिवस",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹२४०/दिवस",
      reason: "वेगाने विकणाऱ्या मालासोबत मंद माल विकून अडकलेले भांडवल त्वरित मोकळे करा."
    },
    {
      id: "sug_03",
      product_bundle: "सकाळचा स्पेशल नाश्ता कॉम्बो",
      offer_price: "₹४० (१०% सूट)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹३१०/दिवस",
      reason: "सकाळचे ग्राहक २५% जास्त मोठे बिल करतात. ही ऑफर नियमित ग्राहकांची संख्या वाढवते."
    }
  ],
  bn: [
    {
      id: "sug_01",
      product_bundle: "বিকেলের চা ও স্ন্যাক্স কম্বো",
      offer_price: "₹৩৫ (১৫% ছাড়)",
      discount_pct: 15,
      best_time: "3:00 PM – 5:00 PM",
      expected_extra_profit: 180,
      expected_extra_profit_display: "₹১৮০/দিন",
      reason: "বিকেলে বিক্রি ৪২% কম থাকে। এই কম্বো সহজে নতুন খদ্দের আকর্ষণ করে।"
    },
    {
      id: "sug_02",
      product_bundle: "সুপার সেভার স্টক ক্লিয়ারেন্স বান্ডিল",
      offer_price: "₹৮৫ (ধীর পণ্যে ২০% ছাড়)",
      discount_pct: 20,
      best_time: "সারাদিন",
      expected_extra_profit: 240,
      expected_extra_profit_display: "₹২৪০/দিন",
      reason: "বেশি বিক্রিত পণ্যের সাথে কম বিক্রিত পণ্য বেচে আটকে থাকা পুঁজি দ্রুত তুলে আনুন।"
    },
    {
      id: "sug_03",
      product_bundle: "সকালের স্পেশাল জলখাবার কম্বো",
      offer_price: "₹৪০ (১০% ছাড়)",
      discount_pct: 10,
      best_time: "8:00 AM – 10:00 AM",
      expected_extra_profit: 310,
      expected_extra_profit_display: "₹৩১০/দিন",
      reason: "সকালের ক্রেতারা ২৫% বেশি কেনাকাটা করেন। এটি নিয়মিত ক্রেতা বাড়াতে সাহায্য করে।"
    }
  ]
};

// Helper to get localized offers list
export function getLocalizedOffers(rawOffers, lang = 'en') {
  const localizedList = LOCALIZED_OFFERS[lang] || LOCALIZED_OFFERS.en;
  if (!rawOffers || rawOffers.length === 0) return localizedList;

  return rawOffers.map((item, idx) => {
    const match = localizedList.find((loc) => loc.id === item.id) || localizedList[idx] || item;
    return {
      ...item,
      product_bundle: match.product_bundle || item.product_bundle,
      offer_price: match.offer_price || item.offer_price,
      discount_pct: match.discount_pct || item.discount_pct,
      best_time: match.best_time || item.best_time,
      expected_extra_profit_display: match.expected_extra_profit_display || item.expected_extra_profit_display,
      reason: match.reason || item.reason,
    };
  });
}
