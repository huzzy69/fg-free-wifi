import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { config } = useSiteConfig();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={config.logoUrl} alt={config.companyName} className="logo-image" />
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-links desktop-only">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/advertisers" className={`nav-link ${isActive('/advertisers')}`}>Advertise with us</Link>
                    <Link to="/locations" className={`nav-link ${isActive('/locations')}`}>Our Locations</Link>
                    <Link to="/pricing" className={`nav-link ${isActive('/pricing')}`}>Pricing</Link>
                    <Link to="/contact" className="btn btn-primary btn-sm">Contact Us</Link>
                </div>

                {/* Mobile Menu Button */}
                <button className={`mobile-menu-btn mobile-only ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={toggleMenu}></div>

            {/* Mobile Menu */}
            <div className={`mobile-menu mobile-only ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <img src={config.logoUrl} alt={config.companyName} className="mobile-logo-inner" />
                    <button className="close-menu" onClick={toggleMenu}><X size={28} /></button>
                </div>
                <div className="mobile-menu-links">
                    <Link to="/" className={`mobile-nav-link ${isActive('/')}`} onClick={toggleMenu}>Home</Link>
                    <Link to="/advertisers" className={`mobile-nav-link ${isActive('/advertisers')}`} onClick={toggleMenu}>Advertise with us</Link>
                    <Link to="/locations" className={`mobile-nav-link ${isActive('/locations')}`} onClick={toggleMenu}>Our Locations</Link>
                    <Link to="/pricing" className={`mobile-nav-link ${isActive('/pricing')}`} onClick={toggleMenu}>Pricing</Link>
                    <div className="mobile-menu-footer">
                        <Link to="/contact" className="btn btn-primary btn-full" onClick={toggleMenu}>Contact Us</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
