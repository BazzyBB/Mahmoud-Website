import React from "react";
import { Link } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead, { breadcrumbs } from "../Components/SEOHead.jsx";
import { PageHero, CtaBand, Eyebrow } from "../Components/Section.jsx";
import { processSteps } from "../data/site.js";
import { img } from "../utils/image.js";

const stepImages = ["/Assets/JS4.JPG", "/Assets/OM4.jpeg", "/Assets/DS5.JPG", "/Assets/ED3.JPG", "/Assets/JS2.JPG"];

export default function Process() {
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
          title="Our Custom Furniture Design & Build Process"
          intro="Collaborative creativity, guiding you through every step from concept to completion."
          image="/Assets/DS3.JPG"
        />
        <section className="section">
          <div className="container">
            <div className="section-head center" data-reveal>
              <Eyebrow center>Five Steps</Eyebrow>
              <h2>How Your Custom Piece Comes to Life</h2>
            </div>
            <p className="process-intro">Every <strong>custom furniture project</strong> starts with your space and how you plan to use it. Explore our <Link className="context-link" to="/Materials">wood and finish guide</Link> before the consultation, or browse <Link className="context-link" to="/Gallery">completed Dallas woodworking projects</Link> for inspiration.</p>
            <ol className="process-list">
              {processSteps.map((s, i) => (
                <li key={s.title} className="process-step" data-reveal>
                  <div className="process-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                  <div className="process-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
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
