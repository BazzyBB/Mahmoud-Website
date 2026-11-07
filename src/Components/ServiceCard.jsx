import React from 'react';
import { Link } from 'react-router-dom';
import { img, srcSet } from '../utils/image';

export default function ServiceCard({ service }) {
  return <article className="woodworking-service-card">
    <Link to={service.path} aria-label={`Explore ${service.title}`}><img src={img(service.image, { w: 800 })} srcSet={srcSet(service.image, [480, 800, 1200])} sizes="(max-width: 700px) 100vw, 50vw" width="800" height="600" alt={service.alt} loading="lazy" decoding="async" /></Link>
    <div className="woodworking-service-copy"><h3><Link to={service.path}>{service.title}</Link></h3><p>{service.summary}</p><small>{service.photoNote}</small>
      <div className="service-link-row"><Link className="text-link" to={service.path}>Explore service</Link><Link className="text-link" to="/ContactUs#quote-request">Request a Quote</Link></div>
    </div>
  </article>;
}
