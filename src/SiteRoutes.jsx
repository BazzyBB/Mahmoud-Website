import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx"
import Home from "./pages/Home.jsx"
import AboutUs from "./pages/AboutUs.jsx";
import Gallery from "./pages/Gallery.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Services from "./pages/Services.jsx";
import Materials from "./pages/Materials.jsx";
import Process from "./pages/Process.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";
import { LanguageProvider } from './i18n/LanguageContext';
import ServiceAreas from './pages/ServiceAreas';
import ServiceAreaCity from './pages/ServiceAreaCity';

import { PrivacyPolicy, Sitemap } from './pages/SiteInformation';

export default function SiteRoutes() {
  return (
    <LanguageProvider><Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="Gallery" element={<Gallery />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="Gallery/:slug" element={<Gallery />} />
        <Route path="Services" element={<Services />} />
        <Route path="Services/:slug" element={<ServiceDetail />} />
        <Route path="Materials" element={<Materials />} />
        <Route path="Process" element={<Process />} />
        <Route path="service-areas" element={<ServiceAreas />} />
        <Route path="service-areas/:slug" element={<ServiceAreaCity />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes></LanguageProvider>
  );
}
