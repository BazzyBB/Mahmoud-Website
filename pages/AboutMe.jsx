import React from "react"
import bgImg from "../Assets/Stock.jpg"
import { Link } from "react-router-dom"

export default function AboutMe() {
    return (
        <div className="about-page-container">
            <img src={bgImg} className="about-hero-image" />
            <div className="about-page-content">
                <h1>Who i am</h1>
                <p>Description of what you have done and what to do how long you have been in the industry </p>
                <p>Continued <del></del>escription</p>
            </div>
            <div className="about-page-cta">
                <h2>Your Jewerlly box is waiting<br />see my other work</h2>
                <Link className="link-button" to="/Gallery">Explore our vans</Link>
            </div>
        </div>
    );
}