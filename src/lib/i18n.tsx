'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Language = 'hi' | 'en';

const STORAGE_KEY = 'abs-lang';

const dict = {
  nav: {
    home: { hi: 'होम', en: 'Home' },
    bhajan: { hi: 'भजन', en: 'Bhajan' },
    aarti: { hi: 'आरती', en: 'Aarti' },
    chalisa: { hi: 'चालीसा', en: 'Chalisa' },
    mantra: { hi: 'मंत्र', en: 'Mantra' },
    stotra: { hi: 'स्तोत्र', en: 'Stotra' },
    article: { hi: 'भक्ति लेख', en: 'Articles' },
    festival: { hi: 'त्योहार', en: 'Festivals' },
    vratKatha: { hi: 'व्रत कथा', en: 'Vrat Katha' },
    deity: { hi: 'देवी-देवता', en: 'Deities' },
    mainNav: { hi: 'मुख्य नेविगेशन', en: 'Main navigation' },
  },
  header: {
    siteName: { hi: 'अखंड भक्ति सागर', en: 'Akhand Bhakti Sagar' },
    tagline: { hi: 'भजन • आरती • चालीसा • मंत्र', en: 'Bhajan • Aarti • Chalisa • Mantra' },
    openSearch: { hi: 'खोज खोलें', en: 'Open search' },
    closeMenu: { hi: 'मेनू बंद करें', en: 'Close menu' },
    openMenu: { hi: 'मेनू खोलें', en: 'Open menu' },
    close: { hi: 'बंद करें', en: 'Close' },
    footerMantra: { hi: 'ॐ नमः शिवाय • हरे कृष्ण • जय माता दी', en: 'Om Namah Shivaya • Hare Krishna • Jai Mata Di' },
    language: { hi: 'भाषा', en: 'Language' },
  },
  search: {
    placeholder: { hi: 'भजन, आरती, चालीसा खोजें...', en: 'Search bhajan, aarti, chalisa...' },
    ariaLabel: { hi: 'साइट खोज', en: 'Site search' },
    clear: { hi: 'खोज साफ करें', en: 'Clear search' },
    submit: { hi: 'खोजें', en: 'Search' },
  },
  hero: {
    kicker: { hi: '॥ श्री हरि विष्णु सहस्रनाम ॥', en: '॥ Shri Hari Vishnu Sahasranama ॥' },
    title: { hi: 'अखंड भक्ति सागर', en: 'Akhand Bhakti Sagar' },
    subheading: { hi: 'भजन • आरती • चालीसा • मंत्र • स्तोत्र', en: 'Bhajan • Aarti • Chalisa • Mantra • Stotra' },
    description: {
      hi: 'हिंदी भक्ति साहित्य का विशाल संग्रह — पढ़ें, गाएं और ईश्वर की भक्ति में डूब जाएं।',
      en: 'A vast collection of devotional literature — read, sing, and immerse yourself in devotion to God.',
    },
    ctaBhajan: { hi: 'भजन पढ़ें', en: 'Read Bhajans' },
    ctaToday: { hi: 'आज का भजन', en: "Today's Bhajan" },
    statBhajan: { hi: 'भजन', en: 'Bhajans' },
    statAarti: { hi: 'आरती', en: 'Aartis' },
    statChalisa: { hi: 'चालीसा', en: 'Chalisas' },
    statMantra: { hi: 'मंत्र', en: 'Mantras' },
  },
  pagination: {
    nav: { hi: 'पृष्ठ नेविगेशन', en: 'Page navigation' },
    prev: { hi: '← पिछला', en: '← Previous' },
    prevAria: { hi: 'पिछला पृष्ठ', en: 'Previous page' },
    next: { hi: 'अगला →', en: 'Next →' },
    nextAria: { hi: 'अगला पृष्ठ', en: 'Next page' },
    page: { hi: 'पृष्ठ', en: 'Page' },
  },
  breadcrumb: {
    home: { hi: 'होम', en: 'Home' },
    nav: { hi: 'ब्रेडक्रंब', en: 'Breadcrumb' },
  },
  share: {
    share: { hi: 'साझा करें', en: 'Share' },
    nativeShare: { hi: '↗ शेयर करें', en: '↗ Share' },
    shareOn: { hi: 'पर शेयर करें', en: 'Share on' },
    copyLink: { hi: 'लिंक कॉपी करें', en: 'Copy link' },
    copied: { hi: 'कॉपी हो गया', en: 'Copied' },
  },
  newsletter: {
    heading: { hi: 'नए भजन और आरती पाएं सीधे इनबॉक्स में', en: 'Get new bhajans and aartis straight to your inbox' },
    description: { hi: 'रोज़ सुबह एक नया भजन या आरती आपके ईमेल पर। भक्ति में जुड़े रहें।', en: 'A new bhajan or aarti every morning in your email. Stay connected in devotion.' },
    emailLabel: { hi: 'ईमेल पता', en: 'Email address' },
    emailPlaceholder: { hi: 'आपका ईमेल पता...', en: 'Your email address...' },
    subscribe: { hi: 'सदस्य बनें 🙏', en: 'Subscribe 🙏' },
    subscribing: { hi: 'प्रतीक्षा करें...', en: 'Please wait...' },
    privacy: { hi: 'हम आपकी जानकारी कभी साझा नहीं करेंगे। किसी भी समय सदस्यता रद्द करें।', en: 'We will never share your information. Unsubscribe anytime.' },
    invalidEmail: { hi: 'कृपया एक वैध ईमेल पता दर्ज करें।', en: 'Please enter a valid email address.' },
    success: { hi: 'धन्यवाद! आप सफलतापूर्वक जुड़ गए हैं। भक्ति का आशीर्वाद आपके साथ हो! 🙏', en: 'Thank you! You have successfully subscribed. May devotion bless you! 🙏' },
    genericError: { hi: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।', en: 'Something went wrong. Please try again.' },
    networkError: { hi: 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।', en: 'Network error. Please try again.' },
  },
  footer: {
    about: {
      hi: 'भजन, आरती, चालीसा, मंत्र और स्तोत्र का पवित्र संग्रह। ईश्वर की भक्ति में अपना मन लगाएं।',
      en: 'A sacred collection of bhajans, aartis, chalisas, mantras and stotras. Devote your mind to God.',
    },
    categoriesHeading: { hi: 'भक्ति श्रेणियाँ', en: 'Devotional Categories' },
    linksHeading: { hi: 'महत्वपूर्ण लिंक', en: 'Important Links' },
    shlokaHeading: { hi: 'आज का श्लोक', en: "Today's Shloka" },
    shlokaText: {
      hi: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
      en: 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmyaham',
    },
    shlokaSource: { hi: '— श्रीमद् भगवद्गीता ४.७', en: '— Shrimad Bhagavad Gita 4.7' },
    about_us: { hi: 'हमारे बारे में', en: 'About Us' },
    contact: { hi: 'संपर्क करें', en: 'Contact Us' },
    privacyPolicy: { hi: 'गोपनीयता नीति', en: 'Privacy Policy' },
    terms: { hi: 'नियम और शर्तें', en: 'Terms & Conditions' },
    disclaimer: { hi: 'अस्वीकरण', en: 'Disclaimer' },
    sitemap: { hi: 'साइटमैप', en: 'Sitemap' },
    rights: { hi: 'सर्वाधिकार सुरक्षित।', en: 'All rights reserved.' },
    madeWith: { hi: 'भक्ति में बना, भक्ति के लिए।', en: 'Made in devotion, for devotion.' },
  },
  postCard: {
    readMore: { hi: 'पढ़ें →', en: 'Read →' },
  },
  deityCard: {
    compositions: { hi: 'रचनाएँ', en: 'compositions' },
  },
  lyrics: {
    heading: { hi: '📿 गीत / बोल', en: '📿 Lyrics' },
    fontSizeGroup: { hi: 'अक्षर आकार', en: 'Font size' },
    small: { hi: 'छोटे', en: 'Small' },
    medium: { hi: 'मध्यम', en: 'Medium' },
    large: { hi: 'बड़े', en: 'Large' },
    letterAria: { hi: 'अक्षर', en: 'letters' },
    copy: { hi: '📋 कॉपी करें', en: '📋 Copy' },
    copied: { hi: '✓ कॉपी हो गया', en: '✓ Copied' },
    print: { hi: '🖨️ प्रिंट', en: '🖨️ Print' },
  },
  video: {
    label: { hi: '🎵 वीडियो', en: '🎵 Video' },
    bhajanVideo: { hi: '▶ वीडियो भजन', en: '▶ Video Bhajan' },
    play: { hi: 'चलाएं', en: 'Play' },
    thumbnail: { hi: 'वीडियो थंबनेल', en: 'Video thumbnail' },
    defaultTitle: { hi: 'वीडियो', en: 'Video' },
    defaultBhajanTitle: { hi: 'भजन वीडियो', en: 'Bhajan video' },
  },
  home: {
    categoriesHeading: { hi: 'भक्ति श्रेणियाँ', en: 'Devotional Categories' },
    categoriesSubheading: {
      hi: 'अपनी आस्था के अनुसार चुनें और दिव्य कथाओं, आरतियों व स्तुतियों का आनन्द लें',
      en: 'Choose as per your faith and enjoy divine stories, aartis and hymns',
    },
    categoriesFooterNote: { hi: 'भक्ति से ही जीवन में शांति, शक्ति और सद्प्रेरणा मिलती है', en: 'Devotion brings peace, strength and inspiration into life' },
    popularBhajans: { hi: 'लोकप्रिय भजन', en: 'Popular Bhajans' },
    viewAll: { hi: 'सभी देखें →', en: 'View All →' },
    deitiesHeading: { hi: 'देवी-देवता', en: 'Deities' },
    deitiesSubheading: { hi: '॥ श्रद्धा, भक्ति और आस्था का दिव्य संगम ॥', en: '॥ A Divine Confluence of Faith and Devotion ॥' },
    deitiesTagline: { hi: 'भक्ति से ही मिलती है जीवन में शक्ति, शांति और सुख', en: 'Devotion brings strength, peace and happiness into life' },
    deitiesFooterNote: { hi: 'सभी देवी-देवताओं की कृपा आप पर सदैव बनी रहे', en: 'May the blessings of all deities always be upon you' },
    latestHeading: { hi: 'नए भजन और आरती', en: 'Latest Bhajans & Aartis' },
    comingSoonHeading: { hi: 'जल्द ही उपलब्ध होगा', en: 'Coming Soon' },
    comingSoonText: {
      hi: 'भजन, आरती और चालीसा जोड़ी जा रही हैं। शीघ्र आएं।',
      en: 'Bhajans, aartis and chalisas are being added. Check back soon.',
    },
  },
  deityPage: {
    heading: { hi: 'देवी-देवता', en: 'Deities' },
    subheading: { hi: 'हिंदू देवी-देवताओं के भजन, आरती, चालीसा और स्तोत्र पढ़ें', en: 'Read bhajans, aartis, chalisas and stotras of Hindu deities' },
    noneHeading: { hi: 'अभी कोई देवता उपलब्ध नहीं', en: 'No deities available yet' },
    noneText: { hi: 'जल्द ही देवताओं की जानकारी जोड़ी जाएगी।', en: 'Deity information will be added soon.' },
    total: { hi: 'कुल', en: 'Total' },
    compositions: { hi: 'रचनाएँ', en: 'compositions' },
    noPostsHeading: { hi: 'अभी कोई भजन उपलब्ध नहीं', en: 'No bhajans available yet' },
    noPostsSuffix: { hi: 'के भजन जल्द ही जोड़े जाएंगे।', en: "bhajans will be added soon." },
  },
  categoryPage: {
    collectionSuffix: { hi: 'संग्रह', en: 'Collection' },
    total: { hi: 'कुल', en: 'Total' },
    noneHeadingPrefix: { hi: 'अभी कोई', en: 'No' },
    noneHeadingSuffix: { hi: 'उपलब्ध नहीं', en: 'available yet' },
    noneTextSuffix: { hi: 'जल्द ही जोड़े जाएंगे। कृपया पुनः आएं।', en: 'will be added soon. Please check back.' },
  },
  ganeshChaturthi: {
    badge: { hi: 'उत्सव विशेष', en: 'Festival Special' },
    heading: { hi: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं', en: 'Happy Ganesh Chaturthi' },
    subtext: {
      hi: 'विघ्नहर्ता श्री गणेश जी की कृपा आप पर सदैव बनी रहे। पढ़ें गणेश भजन, आरती और चालीसा।',
      en: "May Lord Ganesha's blessings remove all obstacles from your path. Explore Ganesh bhajans, aarti and chalisa.",
    },
    cta: { hi: 'गणेश भजन देखें →', en: 'Explore Ganesh Bhajans →' },
    heroKicker: { hi: '॥ गणपति बप्पा मोरया ॥', en: '॥ Ganpati Bappa Morya ॥' },
    heroTitle: { hi: 'गणेश चतुर्थी', en: 'Ganesh Chaturthi' },
    heroSubheading: { hi: 'मंगलमूर्ति • विघ्नहर्ता • सिद्धिविनायक', en: 'Mangalmurti • Vighnaharta • Siddhivinayak' },
    heroDescription: {
      hi: 'विघ्नहर्ता श्री गणेश जी की कृपा से हर बाधा दूर हो। पढ़ें गणेश भजन, आरती, चालीसा और स्तोत्र।',
      en: "May Lord Ganesha's grace remove every obstacle. Read Ganesh bhajans, aarti, chalisa and stotra.",
    },
    heroCtaPrimary: { hi: 'गणेश भजन सुनें →', en: 'Listen to Ganesh Bhajan →' },
    heroCtaSecondary: { hi: 'गणेश कथा पढ़ें →', en: 'Read Ganesh Katha →' },
    heroStatModak: { hi: 'मोदक भोग', en: 'Modak Bhog' },
    heroStatDays: { hi: 'दिवसीय उत्सव', en: 'Days of Celebration' },
    heroStatAarti: { hi: 'आरती संग्रह', en: 'Aarti Collection' },
    heroStatChalisa: { hi: 'चालीसा पाठ', en: 'Chalisa Path' },
    heroSideKicker1: { hi: '॥ वक्रतुंड ॥', en: '॥ Vakratunda ॥' },
    heroSideKicker2: { hi: '॥ महाकाय ॥', en: '॥ Mahakaya ॥' },
    heroTagline: { hi: 'भक्ति से प्रारंभ, मंगलमय जीवन का मार्ग', en: 'Beginning with devotion, the path to an auspicious life' },
    heroStatDevotees: { hi: 'भक्तों का विश्वास', en: 'Devotees Trust Us' },
    heroStatBhajanAarti: { hi: 'भजन व आरती', en: 'Bhajans & Aartis' },
    heroStatVratKatha: { hi: 'व्रत कथाएँ', en: 'Vrat Kathas' },
    heroStatDeities: { hi: 'देवताओं की जानकारी', en: 'Deities Covered' },
    heroTopBlessing: { hi: '॥ श्री गणेशाय नम: ॥', en: '॥ Shri Ganeshaya Namah ॥' },
  },
} as const;

type Dict = typeof dict;
type SectionKey = keyof Dict;

export function useTranslation() {
  const { lang } = useLanguage();
  const t = useCallback(
    <S extends SectionKey>(section: S, key: keyof Dict[S]): string => {
      const entry = dict[section][key] as Record<Language, string>;
      return entry[lang];
    },
    [lang]
  );
  return { t, lang };
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('hi');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === 'hi' || stored === 'en') {
        setLangState(stored);
      }
    } catch {
      // ignore (private browsing, etc.)
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
