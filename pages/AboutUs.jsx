import React from "react"
import { Link } from "react-router-dom"

export default function AboutUs() {
    return (
        <div className="about-page-container">
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
            <div className="about-page-cta">
                <h2>Ready to start your custom project?<br />Explore our collections</h2>
                <Link className="link-button" to="/Gallery">View Our Work</Link>
            </div>
        </div>
    );
}