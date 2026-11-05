import React from 'react';
import { LocalizedLink as Link, useLanguage } from '../i18n/LanguageContext';
import { areaByKey, coverageNotice, featuredAreaKeys } from '../data/service-areas';
import { Eyebrow } from './Section';
import Icon from './Icons';

export function AreaLinks({ areas, className = '' }) {
  return <ul className={`area-link-grid ${className}`}>
    {areas.map(area => <li key={area.slug}><Link to={area.path}>
      <Icon name="pin" size={18} /><span>{area.city}<small>TX</small></span><span className="area-link-arrow" aria-hidden="true">↗</span>
    </Link></li>)}
  </ul>;
}

export default function HomepageServiceAreas() {
  const { t } = useLanguage();
  return <section className="section home-service-areas" aria-labelledby="home-areas-heading">
    <div className="container">
      <div className="area-section-intro">
        <div><Eyebrow>Made for your place</Eyebrow><h2 id="home-areas-heading">{t('Custom Woodworking & Cabinets Across Dallas–Fort Worth')}</h2></div>
        <p>{t('Live Wood Studio brings exceptional craftsmanship, custom cabinetry, and handcrafted furniture to homes and businesses throughout the Dallas–Fort Worth area.')}</p>
      </div>
      <AreaLinks areas={featuredAreaKeys.map(areaByKey)} className="featured-area-grid" />
      <div className="area-section-end"><p className="area-coverage-note">{t(coverageNotice)}</p><Link className="btn btn-dark" to="/service-areas">{t('View All Service Areas')}<Icon name="arrow" size={18} /></Link></div>
    </div>
  </section>;
}
