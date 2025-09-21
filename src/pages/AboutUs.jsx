import React from "react"
import { Link } from "react-router-dom"
import { useAnalytics } from "../src/hooks/useAnalytics"
import SEOHead from "../src/Components/SEOHead"

export default function AboutUs() {
    const { trackButtonClick } = useAnalytics();

    const handleContactClick = () => {
        trackButtonClick('contact_us_about', '/AboutUs');
    };

    return (
        <>
            <SEOHead 
                title="About Live Wood Studio - Dallas Custom Woodworking"
                description="Learn about Live Wood Studio, Dallas's premier custom woodworking studio. We specialize in diamond setting benches, live-edge furniture, and custom cabinets with precision craftsmanship."
                canonical="/AboutUs"
            />
            <main className="about-page-container" role="main">
                <div className="about-page-content">
                    <h1>About Us</h1>
                <p>At Live Wood Studio, our passion is crafting furniture that is as unique as the spaces they inhabit. We specialize in custom woodworking, tailoring each piece to your distinctive vision—whether it's a live-edge dining table, a bespoke shelving unit, or a one-of-a-kind centerpiece. No two creations are ever the same.</p>
                
                <p>Every project begins with a conversation. We listen attentively to your ideas, preferences, and the ambiance you want to create. From there, our experienced artisans select the finest materials—celebrated for their natural beauty and durability—and bring your concept to life with precision and care.</p>
                
                <h2>We are dedicated to:</h2>
                <ul className="about-dedication-list">
                    <li><strong>Personalized design excellence</strong>, ensuring your furniture complements your space and style.</li>
                    <li><strong>Timeless craftsmanship</strong>, combining traditional woodworking techniques with modern precision.</li>
                    <li><strong>Attention to detail</strong>, from the grain of the wood to the finish that highlights its character.</li>
                    <li><strong>Collaborative creativity</strong>, guiding you through every step from concept to completion.</li>
                </ul>
                
                <p>Whether you're furnishing a cozy reading nook, upgrading a living room, or designing a statement piece, we're committed to delivering furniture that not only fits your space—but becomes a part of your story.</p>
                
                <p className="about-closing"><strong>Let's make something extraordinary—just for you.</strong></p>
            </div>
            <section className="about-page-cta" aria-labelledby="cta-heading">
                <h2 id="cta-heading">Ready to start your custom project?<br />Let's bring your vision to life</h2>
                <Link 
                    className="link-button" 
                    to="/ContactUs" 
                    aria-label="Contact us to start your custom woodworking project"
                    onClick={handleContactClick}
                >
                    Contact Us
                </Link>
            </section>
        </main>
        </>
    );
}