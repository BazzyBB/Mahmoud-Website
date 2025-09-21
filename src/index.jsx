import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Components/Layout.jsx"
import Home from "./pages/Home.jsx"
import AboutUs from "./pages/AboutUs.jsx";
import Gallery from "./pages/Gallery.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { useAnalytics } from "./hooks/useAnalytics.js";
import "./index.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}

function AppContent() {
  // Initialize analytics tracking
  useAnalytics();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="Gallery" element={<Gallery />} />
        <Route path="ContactUs" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render
(
<React.StrictMode>
  <App />
</React.StrictMode>
)