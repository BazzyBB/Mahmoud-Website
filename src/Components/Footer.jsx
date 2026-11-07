import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icons';
import { navLinks, SITE } from '../data/site';

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><Logo /><div className="footer-contact">
      <a href={SITE.phoneHref}><Icon name="phone" size={20} />{SITE.phoneDisplay}</a>
      <a href={SITE.smsHref}><Icon name="message" size={20} />Text Us</a>
      <span className="footer-area"><Icon name="pin" size={20} />Houston & Greater Houston, Texas</span>
    </div></div>
    <p className="footer-blurb">Made-to-order furniture, cabinetry and architectural woodwork for Greater Houston homes and businesses.</p>
    <div className="footer-link-columns">
      <nav aria-label="Quick navigation"><h2>Explore</h2><ul>{navLinks.map(link => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}</ul></nav>
      <nav aria-label="Selected woodworking services"><h2>Our Craft</h2><ul>
        <li><Link to="/Services/custom-kitchens">Custom Kitchens</Link></li>
        <li><Link to="/Services/custom-cabinets-closets">Cabinets & Closets</Link></li>
        <li><Link to="/Services/libraries-custom-built-ins">Libraries & Built-ins</Link></li>
        <li><Link to="/Services/live-edge-tables">Live Edge Tables</Link></li>
        <li><Link to="/Services">View All Services</Link></li>
      </ul></nav>
      <div className="footer-coverage"><h2>Greater Houston</h2><p>Crafted for your space. Tell us about your project and where you’re based.</p><Link className="footer-coverage-link" to="/service-areas">Explore Service Areas</Link><Link className="btn btn-primary" to="/ContactUs#quote-request">Get a Quote <Icon name="arrow" size={18} /></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Live Wood Studio. All rights reserved.</span><nav aria-label="Legal and sitemap"><ul><li><Link to="/privacy-policy">Privacy Policy</Link></li><li><Link to="/sitemap">Sitemap</Link></li></ul></nav></div>
    <p className="footer-credit" lang="en" dir="ltr">Crafted with care by <a href="https://htxgrowth.com" target="_blank" rel="noopener noreferrer">HTX Growth</a></p>
  </div></footer>;
}
