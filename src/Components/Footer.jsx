import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icons';
import { navLinks, SITE } from '../data/site';
import { serviceAreas } from '../data/service-areas';
import { services } from '../data/projects';

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><Logo /><div className="footer-contact">
      <a href={SITE.phoneHref}><Icon name="phone" size={20} />{SITE.phoneDisplay}</a>
      <a href={SITE.smsHref}><Icon name="message" size={20} />Text Us</a>
      <span className="footer-area"><Icon name="pin" size={20} />Houston & Greater Houston, Texas</span>
    </div></div>
    <p className="footer-blurb">Custom wood furniture, live-edge and epoxy tables, cabinetry, retail displays and precision jewelry workbenches for Greater Houston homes and businesses. Serving communities from Galveston to Magnolia and Kingwood to Richmond.</p>
    <div className="footer-link-columns">
      <nav aria-label="Quick navigation"><h2>Explore</h2><ul>{navLinks.map(link => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}</ul></nav>
      <nav aria-label="Woodworking services"><h2>Our Services</h2><ul>{services.map((service, i) => <li key={service.title}><Link to={`/Services#service-${i+1}`}>{service.title}</Link></li>)}</ul></nav>
      <nav aria-label="Service area guides"><h2>Areas We Serve</h2><ul>{serviceAreas.map(area => <li key={area.key}><Link to={area.path}>{area.city}, TX</Link></li>)}</ul><Link className="text-link" to="/service-areas">All Greater Houston communities ↗</Link></nav>
    </div>
    <Link className="btn btn-primary" to="/ContactUs#quote-request">Get a Quote <Icon name="arrow" size={18} /></Link>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Live Wood Studio. All rights reserved.</span><nav aria-label="Legal and sitemap"><ul><li><Link to="/privacy-policy">Privacy Policy</Link></li><li><Link to="/sitemap">Sitemap</Link></li><li><a href="/sitemap.xml">XML Sitemap</a></li></ul></nav></div>
    <p className="footer-credit" lang="en" dir="ltr">Crafted with care by <a href="https://htxgrowth.com" target="_blank" rel="noopener noreferrer">HTX Growth</a></p>
  </div></footer>;
}
