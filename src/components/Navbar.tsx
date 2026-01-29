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
                <button className="mobile-menu-btn mobile-only" onClick={toggleMenu}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu mobile-only">
                    <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
                    <Link to="/advertisers" className="mobile-nav-link" onClick={toggleMenu}>Advertise with us</Link>
                    <Link to="/locations" className="mobile-nav-link" onClick={toggleMenu}>Our Locations</Link>
                    <Link to="/pricing" className="mobile-nav-link" onClick={toggleMenu}>Pricing</Link>
                    <Link to="/contact" className="mobile-nav-link btn-prominent" onClick={toggleMenu}>Contact Us</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
