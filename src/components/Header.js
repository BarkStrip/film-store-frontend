// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";


function Header() {
    return (
        <header className="blockbusterparody-header">
            <h1> SAKILABUSTER </h1>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/films">Films</Link>
                <Link to="/customer">Customer</Link>
                <Link to="/about">About</Link>
            </nav>
        </header>
    );
}

export default Header;
