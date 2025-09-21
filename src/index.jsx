import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./src/Components/Layout"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import { useAnalytics } from "./src/hooks/useAnalytics";

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