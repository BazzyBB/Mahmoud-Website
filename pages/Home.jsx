import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Selling the best high end customer proven, Jewerlly cases.</h1>
            <p>Simply make a request below witha breif description of what you like, and we will get started</p>
            <Link to="ContactUs">Learn More</Link>
        </div>
    )
}