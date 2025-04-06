import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import AboutMe from "./pages/AboutMe";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="AboutMe" element={<AboutMe />} />
          <Route path="Gallery" element={<Gallery />} />
          <Route path="ContactUs" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render
(
<React.StrictMode>
  <App />
</React.StrictMode>
)