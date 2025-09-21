import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../Assets/Logo.jpg"


export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    
    const closeMenu = () => {
        setIsMenuOpen(false);
    }
    
    return(
        <header role="banner">
            {/* Hamburger Menu Button */}
            <button 
                className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="main-navigation"
            >
                <span className="hamburger-line" aria-hidden="true"></span>
                <span className="hamburger-line" aria-hidden="true"></span>
                <span className="hamburger-line" aria-hidden="true"></span>
            </button>
            
            <Link className="site-logo" to="/" aria-label="Live Wood Studio - Home">
                <img src={logo} alt="Live Wood Studio logo - Custom WoodWorking & Cabinets" className="logo-image" />
            </Link>
            
            {/* Navigation Menu */}
            <nav 
                id="main-navigation"
                className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Home 
                </NavLink>
                <NavLink
                    to="/Gallery"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Gallery 
                </NavLink>
                <NavLink
                    to="/AboutUs"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    About Us 
                </NavLink>
                <NavLink
                    to="/ContactUs"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Contact Us 
                </NavLink>
            </nav>
            
            {/* Overlay for mobile */}
            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={closeMenu}
                    aria-hidden="true"
                    role="presentation"
                ></div>
            )}
        </header>
    )
}

