import { useLanguage } from "../i18n/LanguageContext";
import React from 'react';
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import QuoteRequestForm from '../Components/QuoteRequestForm';

export default function ContactUs() {
  const { t } = useLanguage();
  return <>
    <SEOHead canonical="/ContactUs" jsonLd={breadcrumbs([['Home', '/'], ['Contact Us', '/ContactUs']])} />
    <main id="main" className="contact-page-container">
      <div className="contact-page-header">
        <p className="eyebrow eyebrow-center">{t("Made to order · Dallas, Texas")}</p>
        <h1>{t("Start Your Custom Woodworking Project in Dallas")}</h1>
        <p>{t("Tell us about your ")}<strong>{t("custom furniture, cabinetry or display project")}</strong>{t(". Explore our ")}<Link className="context-link" to="/Services">{t("Dallas woodworking services")}</Link>{t(" or ")}<Link className="context-link" to="/Materials">{t("wood and finish guide")}</Link>{t(" if you are still choosing the details.")}</p>
      </div>
      <QuoteRequestForm />
    </main>
  </>;
}
