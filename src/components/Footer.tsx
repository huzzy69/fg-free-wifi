import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import crowdstrikeLogo from '../assets/logo_crowdstrike.png';
import paloAltoLogo from '../assets/logo_palo_alto.png';
import fortinetLogo from '../assets/logo_fortinet.png';
import ciscoLogo from '../assets/logo_cisco.png';
import zscalerLogo from '../assets/logo_zscaler.png';
import sentineloneLogo from '../assets/logo_sentinelone.png';
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
            <div className="footer-multi-bottom">
                {/* Logos Row */}
                <div className="footer-logos-strip">
                    <div className="container">
                        <p className="secured-by-text">Secured By</p>
                        <div className="logo-flex">
                            <div className="partner-logo">
                                <img src={crowdstrikeLogo} alt="CrowdStrike" className="partner-img" />
                            </div>
                            <div className="partner-logo">
                                <img src={paloAltoLogo} alt="Palo Alto Networks" className="partner-img" />
                            </div>
                            <div className="partner-logo">
                                <img src={fortinetLogo} alt="Fortinet" className="partner-img" />
                            </div>
                            <div className="partner-logo">
                                <img src={ciscoLogo} alt="Cisco" className="partner-img" />
                            </div>
                            <div className="partner-logo">
                                <img src={zscalerLogo} alt="Zscaler" className="partner-img" />
                            </div>
                            <div className="partner-logo">
                                <img src={sentineloneLogo} alt="SentinelOne" className="partner-img" />
                            </div>
                        </div>
                    </div>
                </div>



                {/* Copyright Row */}
                <div className="footer-copyright-strip">
                    <div className="container copyright-flex">
                        <p>&copy; Ads on Wifi</p>
                        <p>A Project of Fakhir Groups</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
