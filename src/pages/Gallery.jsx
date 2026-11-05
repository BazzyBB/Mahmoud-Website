import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead, { breadcrumbs } from "../Components/SEOHead.jsx";
import { PageHero, CtaBand } from "../Components/Section.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import NotFound from "./NotFound.jsx";
import { projects, categories, getProject } from "../data/projects.js";
import { img } from "../utils/image.js";

export default function Gallery() {
  const { slug } = useParams();
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? projects : projects.filter(p => p.category === category);
  if (slug) {
    const p = getProject(slug);
    if (!p) return <NotFound />;
    return (
      <>
        <SEOHead title={p.title} description={p.seoDescription} canonical={`/Gallery/${p.slug}`} ogImage={p.cover}
          jsonLd={breadcrumbs([["Home", "/"], ["Our Work", "/Gallery"], [p.shortTitle, `/Gallery/${p.slug}`]])} />
        <main id="main">
          <PageHero eyebrow={p.tag} title={p.title} intro={p.summary} image={p.cover} />
          <section className="section"><div className="container">
            <dl className="spec-list">{p.specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
            {p.description.map((t, i) => <p key={i}>{t}</p>)}
            <div className="project-grid">
              {p.images.map((src, i) => (
                <img key={src} src={img(src, { w: 1000 })} alt={`${p.shortTitle} — photo ${i + 1}`} loading="lazy" />
              ))}
            </div>
            <aside className="project-next-steps" aria-label="Plan a similar project">
              <h2>Make this idea your own</h2>
              <p>Planning <strong>{p.shortTitle.toLowerCase()}</strong> for your space? Compare <Link className="context-link" to="/Materials">wood species and finish options</Link>, explore our <Link className="context-link" to="/Services">custom woodworking services in Dallas</Link>, then <Link className="context-link" to="/ContactUs">request a custom project quote</Link> with your dimensions and ideas.</p>
              <h3>Explore related work</h3><ul className="related-project-links">{projects.filter(other => other.slug !== p.slug && other.category === p.category).concat(projects.filter(other => other.slug !== p.slug && other.category !== p.category)).slice(0, 2).map(other => <li key={other.slug}><Link className="text-link" to={`/Gallery/${other.slug}`}>{other.shortTitle} ↗</Link></li>)}</ul>
            </aside>
            <Link className="text-link" to="/Gallery">← Back to all work</Link>
          </div></section>
          <CtaBand />
        </main>
      </>
    );
  }
  return (
    <>
      <SEOHead title="Our Work — Custom Tables, Cabinets & Displays in Dallas"
        description="Portfolio of custom live-edge and epoxy tables, cabinet and display systems, and diamond setting benches handcrafted by Live Wood Studio in Dallas, TX."
        canonical="/Gallery" jsonLd={breadcrumbs([["Home", "/"], ["Our Work", "/Gallery"]])} />
      <main id="main">
        <PageHero eyebrow="Our Work" title="Custom Furniture & Woodworking Portfolio" image="/Assets/ED1.JPG" />
        <section className="section"><div className="container">
          <div className="portfolio-filters" role="group" aria-label="Filter projects by type">
            {categories.map(c => <button key={c} type="button" className={category === c ? "selected" : ""} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}
          </div>
          <p className="portfolio-count" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"} · {category}</p>
          <div className="project-grid">
            {filtered.map((p) => <ProjectCard key={p.slug} project={p} reveal={false} />)}
          </div>
        </div></section>
        <CtaBand />
      </main>
    </>
  );
}
