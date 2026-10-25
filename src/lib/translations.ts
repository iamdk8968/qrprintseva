export type Language = "en" | "hi";

export interface TranslationDictionary {
  // Nav
  brandName: string;
  navFeatures: string;
  navTools: string;
  navHowItWorks: string;
  navPricing: string;
  navLogin: string;
  navRegister: string;
  navDashboard: string;
  navPartner: string;
  navStandee: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroStartFree: string;
  heroLiveDemo: string;
  heroNoCreditCard: string;
  heroActiveShops: string;
  heroPrintsCount: string;

  // Comparison / Pain points
  painTitle: string;
  painSubtitle: string;
  colOldMethod: string;
  colOldQrPrint: string;
  colSmartPrint: string;
  whatsappMess: string;
  virusRisk: string;
  queueChaos: string;
  privacyLeak: string;
  smartToolsAdvantage: string;
  tokenTvDisplay: string;

  // How it works
  howTitle: string;
  howSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Super Tools Suite
  toolsTitle: string;
  toolsSubtitle: string;
  tool1Title: string;
  tool1Desc: string;
  tool2Title: string;
  tool2Desc: string;
  tool3Title: string;
  tool3Desc: string;
  tool4Title: string;
  tool4Desc: string;
  tool5Title: string;
  tool5Desc: string;

  // Live Demo Box
  demoTitle: string;
  demoSubtitle: string;
  demoCustomerView: string;
  demoShopView: string;
  demoUploadPrompt: string;
  demoSelectColor: string;
  demoSelectBW: string;
  demoPayAndPrint: string;
  demoSimulateDing: string;
  demoOrderSuccess: string;

  // Pricing
  pricingTitle: string;
  pricingSubtitle: string;
  planTrialTitle: string;
  planTrialPrice: string;
  planTrialDesc: string;
  planMonthlyTitle: string;
  planMonthlyPrice: string;
  planMonthlyDesc: string;
  planYearlyTitle: string;
  planYearlyPrice: string;
  planYearlyDesc: string;
  planLifetimeTitle: string;
  planLifetimePrice: string;
  planLifetimeDesc: string;
  getStartedBtn: string;
  popularTag: string;

  // Footer
  footerDesc: string;
  footerMadeWithLove: string;
  footerCopyright: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "QR Print Seva",
    navFeatures: "Features",
    navTools: "Cyber Cafe Tools",
    navHowItWorks: "How It Works",
    navPricing: "Pricing",
    navLogin: "Shop Login",
    navRegister: "Register Shop",
    navDashboard: "Dashboard",
    navPartner: "Partner Program",
    navStandee: "Print Standee",

    heroBadge: "⚡ Made for Cyber Cafes, Photocopy & CSC Jan Seva Kendra",
    heroTitle: "Smart Self-Service Cloud Printing for",
    heroHighlight: "Modern Indian Print Shops",
    heroSubtitle: "Say goodbye to WhatsApp clutter, Bluetooth delays, and pen-drive viruses. Customers scan your counter QR, upload files, pay via UPI, and your printer prints automatically!",
    heroStartFree: "Start Free 24-Hour Trial",
    heroLiveDemo: "Try Live Interactive Demo",
    heroNoCreditCard: "No credit card required • Instant 2-minute setup",
    heroActiveShops: "2,400+ Cyber Cafes",
    heroPrintsCount: "1.2 Million+ Prints",

    painTitle: "Why Traditional Printing is Killing Your Business",
    painSubtitle: "See why 2000+ print shops switched from WhatsApp to SmartPrint Pro",
    colOldMethod: "Old WhatsApp / Pen-Drive",
    colOldQrPrint: "Basic QR Print Software",
    colSmartPrint: "SmartPrint Pro (Next-Gen)",
    whatsappMess: "Shopkeeper WhatsApp flooded with 100s of customer files daily",
    virusRisk: "Pendrives constantly bring malware & viruses to shop computers",
    queueChaos: "Customer crowds gather around counter waiting for files to download",
    privacyLeak: "Sensitive documents (Aadhaar, PAN, marksheets) remain saved on desktop",
    smartToolsAdvantage: "AI Passport Photo, Aadhaar 2-in-1 Crop, Marriage Bio-Data & Scanner built-in",
    tokenTvDisplay: "Live Fullscreen TV Token Display for customer queue with audio announcements",

    howTitle: "How It Works in 4 Simple Steps",
    howSubtitle: "Zero app download required for customers. Works instantly on any smartphone.",
    step1Title: "1. Customer Scans QR",
    step1Desc: "Customer scans your personalized branded shop counter QR code using their phone camera.",
    step2Title: "2. Upload & Customize",
    step2Desc: "Uploads PDFs or images, selects Color / B&W, copies, and page range with instant live price calculation.",
    step3Title: "3. Instant UPI / Cash Pay",
    step3Desc: "Customer pays directly to your shop UPI (0% commission) or chooses 'Cash at Counter'.",
    step4Title: "4. Silent Auto-Print",
    step4Desc: "Your shop PC chimes 'Ding!', the document prints silently, and the file is permanently purged for privacy.",

    toolsTitle: "Exclusive Cyber Cafe & CSC Power Tools",
    toolsSubtitle: "Tools that save 15+ minutes on every single customer job",
    tool1Title: "Aadhaar & Smart ID 2-in-1 Crop",
    tool1Desc: "Upload Front & Back of Aadhaar/PAN/Voter ID. Auto-aligns side-by-side with border cut guides on single A4 or PVC size.",
    tool2Title: "Passport Photo Studio",
    tool2Desc: "1-Click AI background cleanup (White/Blue/Grey) and auto-grids 8, 12, 16, or 32 photos on 4x6 or A4 sheet with cut lines.",
    tool3Title: "Resume & Shadi Bio-Data Builder",
    tool3Desc: "Customers fill their details on mobile. Generates professional job resumes and Indian marriage bio-data instantly.",
    tool4Title: "Document Scanner & Clarity Filter",
    tool4Desc: "Turns messy, dim camera snapshots into crisp, bright, scan-quality B&W or Magic Color photocopies.",
    tool5Title: "PDF Power Hub",
    tool5Desc: "Merge multiple documents, split pages, compress file size, and rotate orientation right at the counter.",

    demoTitle: "Experience the Live Simulator",
    demoSubtitle: "Test the customer mobile screen and shopkeeper live dashboard side-by-side right here",
    demoCustomerView: "Customer Mobile Screen",
    demoShopView: "Shopkeeper PC Dashboard",
    demoUploadPrompt: "Drop or select a document to test print",
    demoSelectColor: "Color Print (₹10/page)",
    demoSelectBW: "Black & White (₹3/page)",
    demoPayAndPrint: "Send Print Order",
    demoSimulateDing: "Simulating Print Job...",
    demoOrderSuccess: "Order sent! Printer printing...",

    pricingTitle: "Simple, Honest Pricing. 0% Commission.",
    pricingSubtitle: "All customer payments go 100% directly into your own UPI / bank account.",
    planTrialTitle: "24-Hour Free Demo",
    planTrialPrice: "₹0",
    planTrialDesc: "Test full printing compatibility on your PC and printer with 15 free test prints.",
    planMonthlyTitle: "Monthly Pro",
    planMonthlyPrice: "₹199",
    planMonthlyDesc: "Perfect for testing short-term or seasonal rushes during exam/admission times.",
    planYearlyTitle: "Yearly Business",
    planYearlyPrice: "₹599",
    planYearlyDesc: "Our most popular plan. All 5 power tools, multi-printer support, and counter standee.",
    planLifetimeTitle: "Lifetime Supreme",
    planLifetimePrice: "₹1,299",
    planLifetimeDesc: "One-time payment for permanent lifetime access. Never pay a monthly or yearly fee again.",
    getStartedBtn: "Choose Plan",
    popularTag: "MOST POPULAR",

    footerDesc: "QR Print Seva is India's leading self-service cloud printing and queue automation platform built specifically for cyber cafes, Xerox shops, CSC Common Service Centers, and photo studios.",
    footerMadeWithLove: "Built with ❤️ for Indian Cyber Cafes & CSC Centers",
    footerCopyright: "© 2026 QR Print Seva (qrprintseva.in). All rights reserved.",
  },
  hi: {
    brandName: "क्यूआर प्रिंट सेवा",
    navFeatures: "खासियतें",
    navTools: "साइबर कैफे टूल्स",
    navHowItWorks: "यह कैसे काम करता है",
    navPricing: "दाम / प्लान्स",
    navLogin: "दुकानदार लॉगिन",
    navRegister: "दुकान रजिस्टर करें",
    navDashboard: "डैशबोर्ड",
    navPartner: "पार्टनर प्रोग्राम",
    navStandee: "काउंटर स्टैंडी",

    heroBadge: "⚡ साइबर कैफे, फोटोकॉपी और जन सेवा केंद्र (CSC) के लिए विशेष रूप से निर्मित",
    heroTitle: "भारतीय ज़ेरॉक्स व प्रिंट दुकानों के लिए",
    heroHighlight: "स्मार्ट ऑटोमैटिक क्लाउड प्रिंटिंग",
    heroSubtitle: "व्हाट्सएप की भीड़, पेनड्राइव के वायरस और ग्राहकों की लंबी लाइनों को कहें अलविदा। ग्राहक काउंटर QR स्कैन करेंगे, फाइल अपलोड करेंगे, UPI से पेमेंट करेंगे और आपका प्रिंटर अपने आप प्रिंट निकाल देगा!",
    heroStartFree: "24-घंटे का फ्री ट्रायल शुरू करें",
    heroLiveDemo: "लाइव डेमो चलाकर देखें",
    heroNoCreditCard: "कोई क्रेडिट कार्ड नहीं चाहिए • सिर्फ 2 मिनट में चालू",
    heroActiveShops: "2,400+ सक्रिय साइबर कैफे",
    heroPrintsCount: "12 लाख+ सफल प्रिंट्स",

    painTitle: "पुराने तरीके से दुकान चलाना आपका कितना नुकसान कर रहा है?",
    painSubtitle: "जानिए क्यों 2000+ प्रिंट दुकानों ने व्हाट्सएप छोड़कर स्मार्टप्रिंट प्रो अपनाया",
    colOldMethod: "पुराना व्हाट्सएप / पेनड्राइव तरीका",
    colOldQrPrint: "साधारण QR प्रिंट सॉफ्टवेयर",
    colSmartPrint: "स्मार्टप्रिंट प्रो (Next-Gen)",
    whatsappMess: "दुकानदार का व्यक्तिगत व्हाट्सएप 100 फाइलों और अनजान नंबरों से भर जाता है",
    virusRisk: "पेनड्राइव लगाने से दुकान का कंप्यूटर बार-बार हैंग और करप्ट होता है",
    queueChaos: "ग्राहक काउंटर पर भीड़ लगाकर फाइल डाउनलोड होने का इंतजार करते हैं",
    privacyLeak: "आधार कार्ड, पैन कार्ड, मार्कशीट कंप्यूटर के डेस्कटॉप पर पड़े रहते हैं (प्राइवेसी का खतरा)",
    smartToolsAdvantage: "पासपोर्ट फोटो, आधार 2-इन-1 क्रॉप, शादी बायो-डाटा और डॉक स्कैनर इनबिल्ट उपलब्ध",
    tokenTvDisplay: "दुकान के टीवी या दूसरे मॉनिटर पर लाइव टोकन डिस्प्ले और हिंदी आवाज़ में अनाउंसमेंट",

    howTitle: "केवल 4 आसान चरणों में काम करता है",
    howSubtitle: "ग्राहक को कोई ऐप डाउनलोड नहीं करनी पड़ती। किसी भी स्मार्टफोन से तुरंत काम करता है।",
    step1Title: "1. ग्राहक QR स्कैन करता है",
    step1Desc: "ग्राहक अपने मोबाइल कैमरे से काउंटर पर लगा आपकी दुकान का QR कोड स्कैन करता है।",
    step2Title: "2. फाइल अपलोड और सेटिंग्स",
    step2Desc: "PDF या फोटो अपलोड करता है, रंगीन या ब्लैक एंड व्हाइट, पेज संख्या चुनता है। तुरंत कुल रुपये दिख जाते हैं।",
    step3Title: "3. सीधा UPI या नकद भुगतान",
    step3Desc: "ग्राहक सीधे आपके फोनपे/गूगलपे UPI पर पेमेंट करता है (0% कमीशन) या काउंटर पर नकद चुनता है।",
    step4Title: "4. ऑटोमैटिक साइलेंट प्रिंट",
    step4Desc: "कंप्यूटर में 'डिंग!' की घंटी बजती है, प्रिंटर से सीधे प्रिंट निकलता है और फाइल प्राइवेसी के लिए तुरंत डिलीट हो जाती है।",

    toolsTitle: "साइबर कैफे और CSC के लिए 5 सुपर टूल्स",
    toolsSubtitle: "ये टूल्स हर एक ग्राहक के काम में आपका 15 मिनट का समय बचाते हैं",
    tool1Title: "आधार व स्मार्ट ID कार्ड 2-इन-1 क्रॉप",
    tool1Desc: "आधार/पैन कार्ड का आगे और पीछे का फोटो अपलोड करें। अपने आप एक ही A4 पेज या PVC साइज पर कट-मार्क के साथ सेट हो जाएगा।",
    tool2Title: "पासपोर्ट फोटो स्टूडियो",
    tool2Desc: "1 क्लिक में बैकग्राउंड चेंज (सफेद/नीला) और 4x6 या A4 शीट पर 8, 12, 16 या 32 फोटो की ग्रिड शीट कटिंग लाइन के साथ तैयार।",
    tool3Title: "रिज्यूम व शादी बायो-डाटा मेकर",
    tool3Desc: "ग्राहक खुद फोन पर अपनी जानकारी भरेगा और नौकरी का शानदार रिज्यूम या शादी का बायो-डाटा तुरंत प्रिंट रेडी तैयार।",
    tool4Title: "डॉक्यूमेंट स्कैनर व क्लैरिटी फिल्टर",
    tool4Desc: "मोबाइल से खींची गई गंदी, पीली और धुंधली फोटो के शैडो हटाकर साफ, डार्क और क्रिस्प ज़ेरॉक्स जैसा प्रिंट बनाए।",
    tool5Title: "PDF पावर हब",
    tool5Desc: "कई PDF फाइलों को आपस में जोड़ना (Merge), पेज अलग करना, साइज छोटा करना और पेज घुमाना सब कुछ एक जगह।",

    demoTitle: "लाइव सिमुलेटर चलाकर देखें",
    demoSubtitle: "ग्राहक का मोबाइल पेज और दुकानदार का लाइव डैशबोर्ड दोनों साथ-साथ अनुभव करें",
    demoCustomerView: "ग्राहक का मोबाइल दृश्य",
    demoShopView: "दुकानदार का PC डैशबोर्ड",
    demoUploadPrompt: "टेस्ट प्रिंट के लिए फाइल चुनें या ड्रॉप करें",
    demoSelectColor: "कलर प्रिंट (₹10/पेज)",
    demoSelectBW: "ब्लैक & व्हाइट (₹3/पेज)",
    demoPayAndPrint: "प्रिंट आर्डर भेजें",
    demoSimulateDing: "प्रिंट जॉब प्रोसेस हो रहा है...",
    demoOrderSuccess: "ऑर्डर भेजा गया! प्रिंटर प्रिंट कर रहा है...",

    pricingTitle: "किफायती और पारदर्शी प्लान्स। 0% कमीशन।",
    pricingSubtitle: "ग्राहक से मिलने वाला 100% प्रिंट का पैसा सीधे आपके अपने बैंक/UPI में आता है।",
    planTrialTitle: "24-घंटे फ्री डेमो",
    planTrialPrice: "₹0",
    planTrialDesc: "15 फ्री टेस्ट प्रिंट्स के साथ अपने कंप्यूटर और प्रिंटर की कम्पैटिबिलिटी चेक करें।",
    planMonthlyTitle: "मासिक प्रो (Monthly)",
    planMonthlyPrice: "₹199",
    planMonthlyDesc: "परीक्षा और एडमिशन के सीज़न में टेस्ट करने के लिए सबसे बेहतरीन प्लान।",
    planYearlyTitle: "वार्षिक बिजनेस (Yearly)",
    planYearlyPrice: "₹599",
    planYearlyDesc: "हमारा सबसे लोकप्रिय प्लान। सभी 5 टूल्स, मल्टी-प्रिंटर सपोर्ट और काउंटर स्टैंडी शामिल।",
    planLifetimeTitle: "लाइफटाइम सुप्रीमो",
    planLifetimePrice: "₹1,299",
    planLifetimeDesc: "एक बार भुगतान करें और जीवन भर बिना किसी मासिक या वार्षिक रिन्यूअल के इस्तेमाल करें।",
    getStartedBtn: "प्लान चुनें",
    popularTag: "सबसे लोकप्रिय",

    footerDesc: "क्यूआर प्रिंट सेवा भारत का अग्रणी सेल्फ-सर्विस क्लाउड प्रिंटिंग और कतार प्रबंधन प्लेटफॉर्म है जो विशेष रूप से साइबर कैफे, ज़ेरॉक्स दुकानों, जन सेवा केंद्रों (CSC) और फोटो स्टूडियो के लिए बनाया गया है।",
    footerMadeWithLove: "भारतीय साइबर कैफे और CSC केंद्रों के लिए गर्व से निर्मित ❤️",
    footerCopyright: "© 2026 क्यूआर प्रिंट सेवा (qrprintseva.in). सर्वाधिकार सुरक्षित।",
  },
};
