import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead, { breadcrumbs } from '../Components/SEOHead';
import QuoteRequestForm from '../Components/QuoteRequestForm';

export default function ContactUs() {
  return <>
    <SEOHead canonical="/ContactUs" jsonLd={breadcrumbs([['Home', '/'], ['Contact Us', '/ContactUs']])} />
    <main id="main" className="contact-page-container">
      <div className="contact-page-header">
        <p className="eyebrow eyebrow-center">Made to order · Dallas, Texas</p>
        <h1>Start Your Custom Woodworking Project in Dallas</h1>
        <p>Tell us about your <strong>custom furniture, cabinetry or display project</strong>. Explore our <Link className="context-link" to="/Services">Dallas woodworking services</Link> or <Link className="context-link" to="/Materials">wood and finish guide</Link> if you are still choosing the details.</p>
      </div>
      <QuoteRequestForm />
    </main>
  </>;
}
