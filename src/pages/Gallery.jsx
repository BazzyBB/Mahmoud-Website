import { useLanguage } from "../i18n/LanguageContext";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import SEOHead, { breadcrumbs } from "../Components/SEOHead.jsx";
import { PageHero, CtaBand } from "../Components/Section.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import NotFound from "./NotFound.jsx";
import { projects, categories, getProject } from "../data/projects.js";
import { img, srcSet } from "../utils/image.js";

export default function Gallery() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? projects : projects.filter(p => p.category === category);
  if (slug) {
    const p = getProject(slug);
    if (!p) return <NotFound />;
    return (
      <>
        <SEOHead title={t(p.title)} description={p.seoDescription} canonical={`/Gallery/${p.slug}`} ogImage={p.cover}
          jsonLd={breadcrumbs([["Home", "/"], ["Our Work", "/Gallery"], [p.shortTitle, `/Gallery/${p.slug}`]])} />
        <main id="main">
          <PageHero eyebrow={p.tag} title={t(p.title)} intro={p.summary} image={p.cover} />
          <section className="section"><div className="container">
            <dl className="spec-list">{p.specs.map(([k, v]) => (<div key={k}><dt>{t(k)}</dt><dd>{t(v)}</dd></div>))}</dl>
            {p.description.map((text, i) => <p key={i}>{t(text)}</p>)}
            <div className="project-grid">
              {p.images.map((src, i) => (
                <img key={src} src={img(src, { w: 1000 })} srcSet={srcSet(src, [480, 800, 1200])} sizes="(max-width: 980px) 100vw, 50vw" width="1000" height="750" alt={t(`${p.shortTitle} — photo ${i + 1}`)} loading="lazy" />
              ))}
            </div>
            <aside className="project-next-steps" aria-label={t("Plan a similar project")}>
              <h2>{t("Make this idea your own")}</h2>
              <p>{t("Planning ")}<strong>{t(p.shortTitle.toLowerCase())}</strong>{t(" for your space? Compare ")}<Link className="context-link" to="/Materials">{t("wood species and finish options")}</Link>{t(", explore our ")}<Link className="context-link" to="/Services">{t("custom woodworking services in Houston")}</Link>{t(", then ")}<Link className="context-link" to="/ContactUs">{t("request a custom project quote")}</Link>{t(" with your dimensions and ideas.")}</p>
              <h3>{t("Explore related work")}</h3><ul className="related-project-links">{projects.filter(other => other.slug !== p.slug && other.category === p.category).concat(projects.filter(other => other.slug !== p.slug && other.category !== p.category)).slice(0, 2).map(other => <li key={other.slug}><Link className="text-link" to={`/Gallery/${other.slug}`}>{t(other.shortTitle)}</Link></li>)}</ul>
            </aside>
            <Link className="text-link" to="/Gallery">{t("← Back to all work")}</Link>
          </div></section>
          <CtaBand />
        </main>
      </>
    );
  }
  return (
    <>
      <SEOHead title={t("Our Work — Custom Tables, Cabinets & Displays in Houston")}
        description="Portfolio of custom live-edge and epoxy tables, cabinet and display systems, and diamond setting benches handcrafted by Live Wood Studio in Houston, TX."
        canonical="/Gallery" jsonLd={breadcrumbs([["Home", "/"], ["Our Work", "/Gallery"]])} />
      <main id="main">
        <PageHero eyebrow="Our Work" title={t("Custom Furniture & Woodworking Portfolio")} image="/Assets/ED1.JPG" />
        <section className="section"><div className="container">
          <div className="portfolio-filters" role="group" aria-label={t("Filter projects by type")}>
            {categories.map(c => <button key={c} type="button" className={category === c ? "selected" : ""} aria-pressed={category === c} onClick={() => setCategory(c)}>{t(c)}</button>)}
          </div>
          <p className="portfolio-count" role="status">{t(filtered.length)} {t(filtered.length === 1 ? "project" : "projects")} · {t(category)}</p>
          <div className="project-grid">
            {filtered.map((p) => <ProjectCard key={p.slug} project={p} reveal={false} />)}
          </div>
        </div></section>
        <CtaBand />
      </main>
    </>
  );
}
