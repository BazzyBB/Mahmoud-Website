import React from "react";
import { Link } from "react-router-dom";
import { img, srcSet } from "../utils/image";

export default function ProjectCard({ project, sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw", reveal = true }) {
  return (
    <Link to={`/Gallery/${project.slug}`} className="project-card" {...(reveal ? { "data-reveal": "" } : {})}>
      <figure>
        <img
          src={img(project.cover, { w: 800, h: 600, fit: "cover" })}
          srcSet={srcSet(project.cover, [480, 800, 1200], { h: undefined })}
          sizes={sizes}
          alt={`${project.shortTitle} — custom woodworking by Live Wood Studio, Dallas TX`}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
        <figcaption>
          <span className="card-tag">{project.tag}</span>
          <span className="card-title">{project.shortTitle}</span>
        </figcaption>
      </figure>
    </Link>
  );
}
