import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
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
                        <a href="https://www.linkedin.com/company/adsonwifi/posts/?feedView=all" className="social-link" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                        <a href="https://www.facebook.com/adsonwifi" className="social-link" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                        <a href="https://www.instagram.com/adsonwifi" className="social-link" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
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
                        <li><Link to="/advertisers">Pin-Point Advertising</Link></li>
                        <li><Link to="/free-wifi-locations">Free WiFi</Link></li>
                        <li><Link to="/advertisers">Real-Time Survey</Link></li>
                        <li><Link to="/locations">Guest WiFi Management</Link></li>
                        <li><Link to="/advertisers">On-Demand Internet</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <ul className="contact-list">
                        <li><MapPin size={16} /> <a href="https://maps.google.com/?q=B1-104+UK+Square+Federal+B+Area+Karachi" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>{config.contactAddress}</a></li>
                        <li><Phone size={16} /> <span>{config.contactPhone}</span></li>
                        <li><Mail size={16} /> <span>{config.contactEmail}</span></li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright-strip">
                <div className="container copyright-flex">
                    <p>&copy; AdsOnWifi</p>
                    <p>A Project of Fakhir Groups</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
