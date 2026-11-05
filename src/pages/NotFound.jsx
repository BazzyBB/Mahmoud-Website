import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main id="main" className="not-found">
      <Helmet>
        <title>{t("Page Not Found | Live Wood Studio")}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container center">
        <p className="eyebrow eyebrow-center">404</p>
        <h1>{t("We couldn't find that page")}</h1>
        <p>{t("It may have moved. Take a look at our latest work instead.")}</p>
        <div className="hero-actions center-row">
          <Link className="btn btn-primary" to="/Gallery">{t("View Our Work")}</Link>
          <Link className="btn btn-dark-outline" to="/">{t("Back to Home")}</Link>
        </div>
      </div>
    </main>
  );
}
