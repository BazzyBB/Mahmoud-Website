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
        <header>
            {/* Hamburger Menu Button */}
            <button 
                className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            
            <Link className="site-logo" to="/">
                <img src={logo} alt="Live Wood Studio" className="logo-image" />
            </Link>
            
            {/* Navigation Menu */}
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Home 
                </NavLink>
                <NavLink
                    to="/Gallery"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Gallery 
                </NavLink>
                <NavLink
                    to="/AboutUs"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    About Us 
                </NavLink>
                <NavLink
                    to="/ContactUs"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Contact Us 
                </NavLink>
            </nav>
            
            {/* Overlay for mobile */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </header>
    )
}

