import { useLanguage } from "../i18n/LanguageContext";
import React from "react";
import { LocalizedLink as Link } from "../i18n/LanguageContext";
import { img, srcSet } from "../utils/image";

export default function ProjectCard({ project, sizes = "(max-width: 980px) 100vw, 50vw", reveal = true }) {
  const { t } = useLanguage();
  return (
    <Link to={`/Gallery/${project.slug}`} className="project-card" {...(reveal ? { "data-reveal": "" } : {})}>
      <figure>
        <img
          src={img(project.cover, { w: 800, h: 600, fit: "cover" })}
          srcSet={srcSet(project.cover, [480, 800, 1200])}
          sizes={sizes}
          alt={t(project.imageAlts?.[0] || `${project.shortTitle} — custom woodworking by Live Wood Studio, Houston TX`)}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
        <figcaption>
          <span className="card-tag">{t(project.tag)}</span>
          <span className="card-title">{t(project.shortTitle)}</span>
        </figcaption>
      </figure>
    </Link>
  );
}
