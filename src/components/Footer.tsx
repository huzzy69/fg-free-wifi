import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <div className="footer-logo">
                        <Wifi className="logo-icon-sm" />
                        <span>Fakhir Wifi Ads</span>
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
                        <li><Link to="/how-it-works">How It Works</Link></li>
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
                        <li><MapPin size={16} /> <span>123 Business Park, City</span></li>
                        <li><Phone size={16} /> <span>+1 234 567 8900</span></li>
                        <li><Mail size={16} /> <span>fakhirgroupss.smtp@gmail.com</span></li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright-strip">
                <div className="container copyright-flex">
                    <p>&copy; Ads on Wifi</p>
                    <p>A Project of Fakhir Groups</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
