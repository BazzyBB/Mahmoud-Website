import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>A great build starts with you, let's make something exceptional</h1>
            <p>Exceptional craftsmanship, tailored to your vision.</p>
            <Link to="Gallery">Learn More</Link>
        </div>
    )
}