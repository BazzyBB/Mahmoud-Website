import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"


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
            
            <Link className="site-logo" to="/">Live Wood Studio</Link>
            
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
                    to="/gallery"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    Gallery 
                </NavLink>
                <NavLink
                    to="/AboutMe"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeMenu}
                >
                    About Me 
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

