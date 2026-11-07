import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SiteRoutes from "./SiteRoutes.jsx";
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
  // Identity emails may return to the home page; preserve their callback for the panel.
  useEffect(() => {
    if (window.location.pathname !== '/admin' && /(?:invite_token|recovery_token|confirmation_token|access_token|email_change_token)=/.test(window.location.hash)) {
      window.location.replace(`/admin${window.location.hash}`);
    }
  }, []);
  useAnalytics();

  return <SiteRoutes />;
}

// Reuse prerendered content instead of discarding the initial page DOM.
const root = document.getElementById("root");
const app = <React.StrictMode><App /></React.StrictMode>;
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
