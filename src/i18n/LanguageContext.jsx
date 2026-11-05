import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
export const languages = [{ code: 'en', label: 'English', direction: 'ltr' }];
export const translate = value => value;
const value = { language: 'en', t: translate, setLanguage: () => {} };
export function LanguageProvider({ children }) {
  useEffect(() => { document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr'; }, []);
  return children;
}
export const useLanguage = () => value;
export const localizedTo = to => to;
export function LocalizedLink(props) { return <Link {...props} />; }
export function LocalizedNavLink(props) { return <NavLink {...props} />; }
