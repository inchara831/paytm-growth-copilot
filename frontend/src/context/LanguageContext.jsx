import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../services/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('paytm_merchant_lang') || 'en';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('paytm_merchant_lang', lang);
    stopSpeaking();
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

  const speak = useCallback(
    (textToSpeak, langOverride) => {
      if (!textToSpeak || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // Stop previous utterance
      window.speechSynthesis.cancel();

      const utterLang = langOverride || language;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Determine language tag
      let langTag = 'en-IN';
      if (utterLang === 'hi') langTag = 'hi-IN';
      else if (utterLang === 'kn') langTag = 'kn-IN';

      utterance.lang = langTag;
      utterance.rate = 0.92; // Slightly measured pace for clarity
      utterance.pitch = 1.0;

      // Try to select an appropriate voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find((v) =>
          v.lang && (v.lang.startsWith(utterLang) || v.lang.includes(utterLang))
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        } else {
          // Fallback to Indian English or any available voice
          const indianVoice = voices.find((v) => v.lang === 'en-IN');
          if (indianVoice) utterance.voice = indianVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(textToSpeak);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText('');
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingText('');
      };

      window.speechSynthesis.speak(utterance);
    },
    [language]
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
