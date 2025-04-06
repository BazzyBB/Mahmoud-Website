import React from "react"
import { Link, NavLink } from "react-router-dom"


export default function Header(){
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return(
        <header>
            <Link className="site-logo" to="/">Company Name</Link>
                 <nav>
                    <NavLink
                    to="/gallery"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Gallery 
                    </NavLink>
                        <NavLink
                    to="/AboutMe"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    AboutMe 
                    </NavLink>
                        <NavLink
                    to="/ContactUs"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    ContactUs 
                    </NavLink>
                 </nav>    
        </header>
    
    )
}

