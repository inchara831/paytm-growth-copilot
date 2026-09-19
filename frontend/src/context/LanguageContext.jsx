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

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('paytm_merchant_lang') || 'en';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  const [voiceNotice, setVoiceNotice] = useState(null);
  const [voices, setVoices] = useState([]);

  // Load available speech synthesis voices
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
  }, []);

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

  // Helper to test if a voice for a specific language is installed on user's device
  const isVoiceAvailable = useCallback(
    (langCode) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
      const targetConfig = LANGUAGE_CONFIG[langCode] || LANGUAGE_CONFIG.en;
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      if (!currentVoices || currentVoices.length === 0) return false;

      const code = targetConfig.code.toLowerCase();
      const bcp = targetConfig.bcp47.toLowerCase();

      return currentVoices.some((v) => {
        const vLang = (v.lang || '').replace('_', '-').toLowerCase();
        const vName = (v.name || '').toLowerCase();
        return (
          vLang === bcp ||
          vLang.startsWith(code + '-') ||
          vLang === code ||
          vName.includes(targetConfig.name.toLowerCase()) ||
          vName.includes(targetConfig.nativeName)
        );
      });
    },
    [voices]
  );

  const speak = useCallback(
    (textToSpeak, langOverride) => {
      if (!textToSpeak || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // Stop previous utterance
      window.speechSynthesis.cancel();

      const targetLang = langOverride || language;
      const targetConfig = LANGUAGE_CONFIG[targetLang] || LANGUAGE_CONFIG.en;

      // Get latest voices
      const currentVoices =
        voices.length > 0 ? voices : window.speechSynthesis.getVoices();

      // Find matching voice strictly
      let matchingVoice = null;
      if (currentVoices && currentVoices.length > 0) {
        const code = targetConfig.code.toLowerCase();
        const bcp = targetConfig.bcp47.toLowerCase();

        // Strict priority 1: exact BCP-47 tag (e.g., 'kn-IN' or 'hi-IN')
        matchingVoice = currentVoices.find((v) => {
          const vLang = (v.lang || '').replace('_', '-').toLowerCase();
          return vLang === bcp;
        });

        // Priority 2: starts with prefix (e.g., 'kn-' or 'hi-')
        if (!matchingVoice) {
          matchingVoice = currentVoices.find((v) => {
            const vLang = (v.lang || '').replace('_', '-').toLowerCase();
            return vLang.startsWith(code + '-');
          });
        }

        // Priority 3: language code matches or voice name contains language
        if (!matchingVoice) {
          matchingVoice = currentVoices.find((v) => {
            const vLang = (v.lang || '').replace('_', '-').toLowerCase();
            const vName = (v.name || '').toLowerCase();
            return (
              vLang === code ||
              vName.includes(targetConfig.name.toLowerCase()) ||
              vName.includes(targetConfig.nativeName)
            );
          });
        }
      }

      // CRITICAL RULE: NEVER speak English when another language is selected!
      if (targetLang !== 'en' && !matchingVoice) {
        // Voice is unavailable on this device/browser
        setIsSpeaking(false);
        setSpeakingText('');
        const msg = `Voice for ${targetConfig.nativeName} (${targetConfig.name} - ${targetConfig.bcp47}) is not installed on this device/browser. The translated text is shown on screen. (To enable voice, install the ${targetConfig.name} speech pack in system settings or use Google Chrome).`;
        setVoiceNotice({
          message: msg,
          lang: targetLang,
          nativeName: targetConfig.nativeName,
        });

        // Auto-dismiss notice after 8 seconds
        setTimeout(() => {
          setVoiceNotice((curr) => (curr?.lang === targetLang ? null : curr));
        }, 8000);

        return;
      }

      // Voice is available or English fallback for English only
      setVoiceNotice(null);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetConfig.bcp47;
      utterance.rate = 0.92; // Clear, measured pace for shop environments
      utterance.pitch = 1.0;

      if (matchingVoice) {
        utterance.voice = matchingVoice;
      } else if (targetLang === 'en') {
        // Only allow fallback to an Indian English voice if English was selected
        const indianVoice = currentVoices.find(
          (v) => (v.lang || '').replace('_', '-').toLowerCase() === 'en-in'
        );
        if (indianVoice) utterance.voice = indianVoice;
      }

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
