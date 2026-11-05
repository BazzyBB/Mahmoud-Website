import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../Components/SEOHead';
import { PageHero } from '../Components/Section';
import { SEO_PAGES } from '../data/seo';
import { SITE } from '../data/site';

export function PrivacyPolicy() {
  return <><SEOHead canonical="/privacy-policy" /><main id="main"><PageHero eyebrow="Your information" title="Privacy Policy" /><section className="section"><div className="container policy-copy">
    <h2>Information you share</h2><p>When you request a quote, we collect the name, email address, optional phone number and project details you submit. Live Wood Studio uses this information to respond to your enquiry, prepare a proposal and coordinate your project.</p>
    <h2>Website services</h2><p>Our hosting and database services process website requests and store quote submissions. Authorized studio administrators can review submissions. Please avoid including sensitive personal information in your project message.</p>
    <h2>Website measurement</h2><p>Where website analytics are enabled, page visits and interactions such as contact button clicks and form submission outcomes may be measured to help improve the site. Quote form field contents are not included in these interaction events.</p>
    <h2>Your requests</h2><p>To ask about information you have submitted, request a correction or request deletion, call <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or use our <Link to="/ContactUs">contact form</Link>. Include enough context to identify your enquiry.</p>
  </div></section></main></>;
}
export function Sitemap() {
  return <><SEOHead canonical="/sitemap" /><main id="main"><PageHero eyebrow="Explore the studio" title="Sitemap" /><section className="section"><div className="container"><ul className="sitemap-links">{Object.entries(SEO_PAGES).map(([path, page]) => <li key={path}><Link className="text-link" to={path}>{page.title}</Link></li>)}</ul></div></section></main></>;
}
