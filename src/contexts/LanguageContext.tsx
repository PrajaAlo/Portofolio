import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { copy, type Lang } from '../content';

const STORAGE_KEY = 'portfolio-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
}

type Ctx = { lang: Lang; toggle: () => void; t: (typeof copy)['en'] };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'id' : 'en'));

  return <LanguageContext.Provider value={{ lang, toggle, t: copy[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
