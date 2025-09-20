import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  ogImage = "/Assets/Logo.jpg",
  ogType = "website"
}) => {
  const fullTitle = title ? `${title} | Live Wood Studio` : "Live Wood Studio - Custom WoodWorking & Cabinets";
  const fullCanonical = canonical ? `https://livewoodstudio.com${canonical}` : "https://livewoodstudio.com";
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://livewoodstudio.com${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content={ogType} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:image" content={fullOgImage} />
    </Helmet>
  );
};

export default SEOHead;
