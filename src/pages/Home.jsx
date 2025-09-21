import React from "react"
import { Link } from "react-router-dom"
import { useAnalytics } from "../hooks/useAnalytics.js"
import SEOHead from "../Components/SEOHead.jsx"

export default function Home() {
    const { trackButtonClick } = useAnalytics();

    const handleLearnMoreClick = () => {
        trackButtonClick('learn_more_home', '/');
    };

    return (
        <>
            <SEOHead 
                title="Custom WoodWorking & Cabinets in Dallas, Texas"
                description="Live Wood Studio in Dallas, Texas creates custom diamond setting benches, live-edge dining tables, and premium cabinet systems. Professional craftsmanship for jewelers and collectors."
                canonical="/"
            />
            <main className="home-container" role="main">
                <h1>A great build starts with you, let's make something exceptional</h1>
                <p>Exceptional craftsmanship, tailored to your vision.</p>
                <Link 
                    to="Gallery" 
                    aria-label="Learn more about our custom woodworking and cabinet services"
                    onClick={handleLearnMoreClick}
                >
                    Learn More
                </Link>
            </main>
        </>
    )
}