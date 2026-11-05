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
      <nav className="breadcrumb-nav container" aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li aria-current="page">Contact Us</li></ol></nav>
      <div className="contact-page-header">
        <p className="eyebrow eyebrow-center">{t("Made to order · Houston, Texas")}</p>
        <h1>{t("Start Your Custom Woodworking Project in Houston")}</h1>
        <p>{t("Tell us about your ")}<strong>{t("custom furniture, cabinetry or display project")}</strong>{t(". Explore our ")}<Link className="context-link" to="/Services">{t("Houston woodworking services")}</Link>{t(" or ")}<Link className="context-link" to="/Materials">{t("wood and finish guide")}</Link>{t(" if you are still choosing the details.")}</p>
      </div>
      <section id="quote-request" aria-label="Get a custom quote"><QuoteRequestForm /></section>
    </main>
  </>;
}
