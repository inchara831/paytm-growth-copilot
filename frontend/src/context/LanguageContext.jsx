import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../services/translations';

export const LANGUAGE_CONFIG = {
  en: {
    code: 'en',
    bcp47: 'en-IN',
    name: 'English',
    nativeName: 'English',
    speechPrefixes: ['en-in', 'en'],
  },
  hi: {
    code: 'hi',
    bcp47: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिंदी',
    speechPrefixes: ['hi-in', 'hi'],
  },
  kn: {
    code: 'kn',
    bcp47: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechPrefixes: ['kn-in', 'kn'],
  },
  ta: {
    code: 'ta',
    bcp47: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechPrefixes: ['ta-in', 'ta'],
  },
  te: {
    code: 'te',
    bcp47: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechPrefixes: ['te-in', 'te'],
  },
  ml: {
    code: 'ml',
    bcp47: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    speechPrefixes: ['ml-in', 'ml'],
  },
  mr: {
    code: 'mr',
    bcp47: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    speechPrefixes: ['mr-in', 'mr'],
  },
  bn: {
    code: 'bn',
    bcp47: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechPrefixes: ['bn-in', 'bn'],
  },
};

// Helper to find only matching voice for the selected language
export const findVoiceForLanguage = (voicesList, langCode) => {
  if (!voicesList || voicesList.length === 0 || !langCode) return null;
  const config = LANGUAGE_CONFIG[langCode] || LANGUAGE_CONFIG.en;
  const targetCode = config.code.toLowerCase();
  const targetBcp = config.bcp47.toLowerCase();

  // 1. Search for an exact match for the selected language code (e.g., 'te-in', 'kn-in', 'hi-in')
  let match = voicesList.find((v) => {
    const vLang = (v.lang || '').replace('_', '-').toLowerCase();
    return vLang === targetBcp;
  });

  // 2. If an exact match is unavailable, search by the language prefix (e.g., 'te-in' -> 'te')
  if (!match) {
    match = voicesList.find((v) => {
      const vLang = (v.lang || '').replace('_', '-').toLowerCase();
      return vLang === targetCode || vLang.startsWith(targetCode + '-');
    });
  }

  // 3. Select ONLY a voice belonging to the selected language
  if (match) {
    const vLang = (match.lang || '').replace('_', '-').toLowerCase();
    // Never use an English voice for a non-English language
    if (targetCode !== 'en' && (vLang.startsWith('en') || vLang === 'en')) {
      return null;
    }
    const isMatch = vLang === targetBcp || vLang === targetCode || vLang.startsWith(targetCode + '-');
    if (!isMatch) {
      return null;
    }
    return match;
  }

  return null;
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('paytm_merchant_lang') || 'en';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  const [voiceNotice, setVoiceNotice] = useState(null);
  const [voices, setVoices] = useState([]);

  // Requirement 5: VOICE LOADING - Handle browsers where voices load asynchronously
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      if (avail && avail.length > 0) {
        setVoices(avail);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Requirement 3: LANGUAGE SWITCHING - Update active language, stop speaking, reset voice state
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('paytm_merchant_lang', lang);
    stopSpeaking();
    setVoiceNotice(null);
  };

  const t = useCallback(
    (key, fallback = '') => {
      const dict = translations[language] || translations.en;
      return dict[key] || translations.en[key] || fallback || key;
    },
    [language]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingText('');
    }
  }, []);

  const dismissVoiceNotice = useCallback(() => {
    setVoiceNotice(null);
  }, []);

  // Helper to test if a genuine matching voice for a specific language is installed on user's device
  const isVoiceAvailable = useCallback(
    (langCode) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
      const currentVoices =
        window.speechSynthesis.getVoices().length > 0
          ? window.speechSynthesis.getVoices()
          : voices;
      return !!findVoiceForLanguage(currentVoices, langCode);
    },
    [voices]
  );

  const speak = useCallback(
    (textToSpeak, langOverride) => {
      if (!textToSpeak || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // Requirement 4: RESET SPEECH BEFORE EVERY NEW SPEAK
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingText('');

      const targetLang = langOverride || language;
      const targetConfig = LANGUAGE_CONFIG[targetLang] || LANGUAGE_CONFIG.en;

      // Requirement 5: VOICE LOADING
      // Ensure we get latest voices from speechSynthesis
      const currentVoices =
        window.speechSynthesis.getVoices().length > 0
          ? window.speechSynthesis.getVoices()
          : voices;

      // Requirement 1: CORRECT VOICE SELECTION
      // First search for exact match, then by prefix, select ONLY voice belonging to selected language
      const matchingVoice = findVoiceForLanguage(currentVoices, targetLang);

      // Requirement 8: DEBUG DURING DEVELOPMENT
      console.log('Selected language:', targetLang);
      console.log('Selected language code:', targetConfig.bcp47);
      console.log('Matching voice:', matchingVoice ? matchingVoice.name : 'None found');
      console.log('Voice name:', matchingVoice ? matchingVoice.name : 'N/A');
      console.log('Voice language:', matchingVoice ? matchingVoice.lang : 'N/A');

      // Requirement 2 & 6: VALIDATE BEFORE SPEAKING & NO ENGLISH FALLBACK
      if (!matchingVoice) {
        setVoiceNotice({
          message: `${targetConfig.name} voice is not available on this device/browser.`,
        });
        return;
      }

      const voiceLang = (matchingVoice.lang || '').replace('_', '-').toLowerCase();
      const targetCode = targetConfig.code.toLowerCase();
      const targetBcp = targetConfig.bcp47.toLowerCase();

      // Never use an English voice for a non-English language
      if (targetCode !== 'en' && (voiceLang.startsWith('en') || voiceLang === 'en')) {
        console.warn(`Voice validation failed: Attempted to use English voice for ${targetConfig.name}`);
        setVoiceNotice({
          message: `${targetConfig.name} voice is not available on this device/browser.`,
        });
        return;
      }

      // Verify that voiceLang actually matches requested language
      const isMatch = voiceLang === targetBcp || voiceLang === targetCode || voiceLang.startsWith(targetCode + '-');
      if (!isMatch) {
        console.warn(`Voice validation failed: Voice language (${matchingVoice.lang}) does not match requested ${targetConfig.bcp47}`);
        setVoiceNotice({
          message: `${targetConfig.name} voice is not available on this device/browser.`,
        });
        return;
      }

      // Clear previous voice notice when valid voice is found
      setVoiceNotice(null);

      // Set BOTH utterance.lang and utterance.voice
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetConfig.bcp47;
      utterance.voice = matchingVoice;
      utterance.rate = 0.92; // Measured pace for shop environments
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(textToSpeak);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText('');
      };

      utterance.onerror = (e) => {
        setIsSpeaking(false);
        setSpeakingText('');
      };

      window.speechSynthesis.speak(utterance);
    },
    [language, voices]
  );

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        speak,
        stopSpeaking,
        isSpeaking,
        speakingText,
        voiceNotice,
        dismissVoiceNotice,
        isVoiceAvailable,
        languageConfig: LANGUAGE_CONFIG,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
