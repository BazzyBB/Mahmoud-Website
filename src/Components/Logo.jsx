import React from "react";
import { LocalizedLink as Link, useLanguage } from "../i18n/LanguageContext";

export default function Logo({ onClick }) {
  const { t } = useLanguage();
  return (
    <Link className="logo" to="/" aria-label={t('Live Wood Studio — Home')} onClick={onClick}>
      <img className="brand-logo brand-logo-dark" src="/Assets/lws-logo.png" alt="Live Wood Studio" width="718" height="341" />
      <img className="brand-logo brand-logo-light" src="/Assets/lws-logo-light.png" alt="" aria-hidden="true" width="718" height="341" />
    </Link>
  );
}
