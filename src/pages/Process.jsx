import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead, { breadcrumbs } from "../Components/SEOHead.jsx";
import { PageHero, CtaBand, Eyebrow } from "../Components/Section.jsx";
import { processSteps } from "../data/site.js";
import { img } from "../utils/image.js";

const stepImages = ["/Assets/jewelry-display-cabinets-4.jpg", "/Assets/mixed-hardwood-mosaic-table-4.jpg", "/Assets/walnut-jeweler-workbench-5.jpg", "/Assets/walnut-epoxy-river-table-3.jpg", "/Assets/jewelry-display-cabinets-2.jpg"];


export default function Process() {
  const { t } = useLanguage();
  const { trackButtonClick } = useAnalytics();
  return (
    <>
      <SEOHead
        canonical="/Process"
        jsonLd={breadcrumbs([["Home", "/"], ["Process", "/Process"]])}
      />
      <main id="main">
        <PageHero
          eyebrow="Our Process"
          title={t("Our Custom Furniture Design & Build Process")}
          intro="Collaborative creativity, guiding you through every step from concept to completion."
          image="/Assets/walnut-jeweler-workbench-3.jpg"
        />
        <section className="section">
          <div className="container">
            <div className="section-head center" data-reveal>
              <Eyebrow center>{t("Five Steps")}</Eyebrow>
              <h2>{t("How Your Custom Piece Comes to Life")}</h2>
            </div>
            <p className="process-intro">{t("Every ")}<strong>{t("custom furniture project")}</strong>{t(" starts with your space and how you plan to use it. Explore our ")}<Link className="context-link" to="/Materials">{t("wood and finish guide")}</Link>{t(" before the consultation, or browse ")}<Link className="context-link" to="/Gallery">{t("completed Houston woodworking projects")}</Link>{t(" for inspiration.")}</p>
            <ol className="process-list">
              {processSteps.map((s, i) => (
                <li key={s.title} className="process-step" data-reveal>
                  <div className="process-num" aria-hidden="true">{t(String(i + 1).padStart(2, "0"))}</div>
                  <div className="process-body">
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                  <div className="process-img">
                    <img src={img(stepImages[i], { w: 560, h: 380, fit: "cover" })} alt="" loading="lazy" width="560" height="380" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <CtaBand onClick={() => trackButtonClick("contact_us_process", "/Process")} />
      </main>
    </>
  );
}
