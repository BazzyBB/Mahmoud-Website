import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';

export const languages = [
  { code: 'en', label: 'English', direction: 'ltr' },
  { code: 'es', label: 'Español', direction: 'ltr' },
  { code: 'ar', label: 'العربية', direction: 'rtl' },
];

export function translate(value, language = 'en') {
  if (Array.isArray(value)) return value.map(item => translate(item, language));
  if (typeof value !== 'string' || language === 'en') return value;
  const normalized = value.replace(/\s+/g, ' ').trim();
  const dictionary = translations[language] || {};
  const translated = dictionary[normalized];
  if (translated) return `${/^\s/.test(value) ? ' ' : ''}${translated}${/\s$/.test(value) ? ' ' : ''}`;
  // Translate explicit dynamic labels without touching identifiers or form values.
  if (normalized.startsWith('Call Live Wood Studio at ')) return `${dictionary['Call Live Wood Studio at']} ${normalized.slice(25)}`;
  if (normalized.startsWith('Show ')) return `${dictionary.Show} ${translate(normalized.slice(5), language)}`;
  const photo = normalized.match(/^(.*?) — photo (\d+)$/);
  if (photo) return `${translate(photo[1], language)} — ${dictionary.photo} ${photo[2]}`;
  const cardSuffix = ' — custom woodworking by Live Wood Studio, Dallas TX';
  if (normalized.endsWith(cardSuffix)) return `${translate(normalized.slice(0, -cardSuffix.length), language)} ${dictionary[cardSuffix.trim()]}`;
  const arrow = normalized.match(/^(.*?) ([↗→])$/);
  if (arrow) return `${translate(arrow[1], language)} ${arrow[2]}`;
  const slideCount = normalized.match(/^(\d+) of (\d+)$/);
  if (slideCount) return language === 'es' ? `${slideCount[1]} de ${slideCount[2]}` : `${slideCount[1]} من ${slideCount[2]}`;
  const lowerCaseKey = Object.keys(dictionary).find(key => key.toLowerCase() === normalized);
  if (lowerCaseKey) return dictionary[lowerCaseKey];
  return value;
}

const LanguageContext = createContext({ language: 'en', t: value => value, setLanguage: () => {} });

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const requested = new URLSearchParams(location.search).get('lang');
  const language = languages.some(item => item.code === requested) ? requested : 'en';
  const isAdmin = /^\/admin\/?$/.test(location.pathname);
  const direction = language === 'ar' && !isAdmin ? 'rtl' : 'ltr';
  useEffect(() => {
    document.documentElement.lang = isAdmin ? 'en' : language;
    document.documentElement.dir = direction;
  }, [language, direction, isAdmin]);
  const value = useMemo(() => ({
    language,
    t: text => translate(text, language),
    setLanguage(code) {
      if (!languages.some(item => item.code === code)) return;
      const params = new URLSearchParams(location.search);
      if (code === 'en') params.delete('lang'); else params.set('lang', code);
      navigate({ pathname: location.pathname, search: params.toString(), hash: location.hash });
    },
  }), [language, location.pathname, location.search, location.hash, navigate]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function localizedTo(to, language) {
  if (language === 'en' || typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//') || /^\/admin(?:[/?#]|$)/.test(to)) return to;
  const url = new URL(to, 'https://livewoodstudio.com');
  url.searchParams.set('lang', language);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function LocalizedLink({ to, ...props }) {
  const { language } = useLanguage();
  return <Link to={localizedTo(to, language)} {...props} />;
}

export function LocalizedNavLink({ to, ...props }) {
  const { language } = useLanguage();
  return <NavLink to={localizedTo(to, language)} {...props} />;
}
