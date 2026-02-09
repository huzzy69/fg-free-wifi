import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

import { useSiteConfig } from '../context/SiteConfigContext';

const Footer: React.FC = () => {
    const { config } = useSiteConfig();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <div className="footer-logo">
                        <Wifi className="logo-icon-sm" />
                        <span>AdsOnWifi</span>
                    </div>
                    <p className="footer-desc">
                        We manage connectivity and advertising end-to-end. Independent company ensuring views and trust.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Twitter size={20} /></a>
                        <a href="#" className="social-link"><Linkedin size={20} /></a>
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h3>Company</h3>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>

                        <li><Link to="/contact">Contact</Link></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Services</h3>
                    <ul className="footer-links">
                        <li><Link to="/locations">Wi-Fi Solutions for Businesses</Link></li>
                        <li><Link to="/advertisers">Advertise with Us</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <ul className="contact-list">
                        <li><MapPin size={16} /> <span>{config.contactAddress}</span></li>
                        <li><Phone size={16} /> <span>{config.contactPhone}</span></li>
                        <li><Mail size={16} /> <span>{config.contactEmail}</span></li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright-strip">
                <div className="container copyright-flex">
                    <p>&copy; Ads on WiFi</p>
                    <p>A Project of {config.companyName}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
