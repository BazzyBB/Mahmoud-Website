import React from "react";
import Header from "./Header"
import Footer from "./Footer";
import ImagePreloader from "./ImagePreloader";
import { Outlet } from "react-router-dom"


export default function Layout(){
    return(
        <div className="site-wrapper">
            <Header/>
            <Outlet/>
            <Footer/>
            <ImagePreloader/>
        </div>
    )
}