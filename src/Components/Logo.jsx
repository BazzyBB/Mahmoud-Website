import React from "react";
import { LocalizedLink as Link, useLanguage } from "../i18n/LanguageContext";
import { img, srcSet } from '../utils/image';

export default function Logo({ onClick }) {
  const { t } = useLanguage();
  return (
    <Link className="logo" to="/" aria-label={t('Live Wood Studio — Home')} onClick={onClick}>
      <img className="brand-logo brand-logo-dark" src={img('/Assets/lws-logo.png', { w: 430, q: 90 })} srcSet={srcSet('/Assets/lws-logo.png', [215, 430, 645], { q: 90 })} sizes="(max-width: 380px) 110px, (max-width: 980px) 135px, 170px" alt="Live Wood Studio" width="718" height="341" />
      <img className="brand-logo brand-logo-light" src={img('/Assets/lws-logo-light.png', { w: 430, q: 90 })} srcSet={srcSet('/Assets/lws-logo-light.png', [215, 430, 645], { q: 90 })} sizes="215px" alt="" aria-hidden="true" width="718" height="341" />
    </Link>
  );
}
