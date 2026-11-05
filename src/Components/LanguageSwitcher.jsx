import React, { useEffect, useRef, useState } from 'react';
import { languages, useLanguage } from '../i18n/LanguageContext';

function Flag({ language }) {
  return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
    {language === 'en' && <>
      <path fill="#fff" d="M0 0h30v20H0z" />
      {Array.from({ length: 7 }, (_, index) => <rect key={index} y={index * 40 / 13} width="30" height={20 / 13} fill="#b22234" />)}
      <path fill="#3c3b6e" d="M0 0h12v10.77H0z" />
      {Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, col) => <path key={`${row}-${col}`} fill="#fff" transform={`translate(${1 + col * 2 + (row % 2 ? 1 : 0)},${.65 + row * 1.17}) scale(.48)`} d="M0-1 .224-.309 .951-.309 .363.118 .588.809 0 .382-.588.809-.363.118-.951-.309-.224-.309Z" />))}
    </>}
    {language === 'es' && <><path fill="#aa151b" d="M0 0h30v20H0z" /><path fill="#f1bf00" d="M0 5h30v10H0z" /></>}
    {language === 'ar' && <><path fill="#00732f" d="M0 0h30v6.67H0z" /><path fill="#fff" d="M0 6.67h30v6.67H0z" /><path fill="#151515" d="M0 13.33h30V20H0z" /><path fill="#ef3340" d="M0 0h7.5v20H0z" /></>}
  </svg>;
}

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const selected = languages.find(item => item.code === language) || languages[0];

  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!container.current?.contains(event.target)) setOpen(false); };
    const escape = event => { if (event.key === 'Escape') { event.stopPropagation(); setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    container.current?.addEventListener('keydown', escape);
    const element = container.current;
    return () => { document.removeEventListener('pointerdown', outside); element?.removeEventListener('keydown', escape); };
  }, [open]);

  return <div className="language-switcher" ref={container} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <span className="language-label" id="language-label">{t('Language')}</span>
    <button ref={trigger} type="button" className="language-trigger" aria-label={`${t('Language')}: ${selected.label}`} aria-expanded={open} aria-controls="language-options" onClick={() => setOpen(value => !value)}>
      <Flag language={language} /><span lang={language}>{selected.label}</span><svg className="language-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
    </button>
    {open && <ul id="language-options" className="language-options" aria-labelledby="language-label">
      {languages.map(item => <li key={item.code}><button type="button" data-language={item.code} aria-pressed={item.code === language} onClick={() => { setLanguage(item.code); setOpen(false); trigger.current?.focus(); }}>
        <Flag language={item.code} /><span lang={item.code}>{item.label}</span>{item.code === language && <span className="language-check" aria-hidden="true">✓</span>}
      </button></li>)}
    </ul>}
  </div>;
}
