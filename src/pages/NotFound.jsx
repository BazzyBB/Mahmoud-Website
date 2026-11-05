import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <Helmet>
        <title>Page Not Found | Live Wood Studio</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container center">
        <p className="eyebrow eyebrow-center">404</p>
        <h1>We couldn't find that page</h1>
        <p>It may have moved. Take a look at our latest work instead.</p>
        <div className="hero-actions center-row">
          <Link className="btn btn-primary" to="/Gallery">View Our Work</Link>
          <Link className="btn btn-dark-outline" to="/">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
