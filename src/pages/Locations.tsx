import React from 'react';
import { Wifi, Settings, Users, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Locations.css';

const Locations: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="locations-page">
            {/* Hero Section */}
            <section className="hero-subpage bg-secondary text-white">
                <div className="container">
                    <div className="hero-content-wrapper">
                        <div className="hero-text-content">
                            <h1>Get Free WiFi Device for Your Business</h1>
                            <p className="hero-subtitle">Attract more customers and increase dwell time by offering high-quality, professional guest WiFi at zero cost to you.</p>
                            <div className="hero-cta-buttons">
                                <button className="btn btn-primary btn-lg" onClick={() => navigate('/contact?tab=location')}>
                                    Get Started Now <ArrowRight size={20} />
                                </button>
                                <button className="btn btn-outline-light btn-lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                                    How it Works <Settings size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Benefits Section */}
            <section className="section bg-light" id="benefits">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Partner with AdsOnWifi?</h2>
                        <p className="section-desc">Join 200+ venues that have transformed their space with our WiFi solution.</p>
                    </div>

                    <div className="grid-cols-3">
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Wifi size={32} />
                            </div>
                            <h3>0% Cost. 100% Value.</h3>
                            <p>We provide the hardware, installation, and ongoing maintenance completely free of charge. You get enterprise-grade WiFi without the headache.</p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Users size={32} />
                            </div>
                            <h3>Happy Customers</h3>
                            <p>Free WiFi is one of the most requested amenities. Keep your visitors happy, connected, and staying longer at your venue.</p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <BarChart3 size={32} />
                            </div>
                            <h3>Powerful Analytics</h3>
                            <p>Gain insights into footfall patterns and visitor demographics through our clean, professional dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section" id="how-it-works">
                <div className="container">
                    <div className="grid-cols-2 align-center">
                        <div>
                            <h2 className="mb-4">Setting Up is Simple</h2>
                            <p className="mb-6" style={{ fontSize: '1.1rem', color: 'var(--color-text-light)' }}>
                                We've streamlined our process to ensure zero disruption to your business operations. Our professional team handles the technical heavy lifting.
                            </p>

                            <ul className="step-list">
                                <li className="step-item">
                                    <div className="step-number">01</div>
                                    <div className="step-text">
                                        <h4>Contact Us</h4>
                                        <p>Reach out through our inquiry form or WhatsApp. We'll discuss your venue requirements.</p>
                                    </div>
                                </li>
                                <li className="step-item">
                                    <div className="step-number">02</div>
                                    <div className="step-text">
                                        <h4>On-Site Survey</h4>
                                        <p>Our engineers perform a quick survey to determine the best placement for maximum coverage.</p>
                                    </div>
                                </li>
                                <li className="step-item">
                                    <div className="step-number">03</div>
                                    <div className="step-text">
                                        <h4>Installation</h4>
                                        <p>We install the equipment at a time that works for you - usually in less than 60 minutes.</p>
                                    </div>
                                </li>
                                <li className="step-item">
                                    <div className="step-number">04</div>
                                    <div className="step-text">
                                        <h4>Live & Optimized</h4>
                                        <p>Your visitors start enjoying free high-speed internet while you start seeing dwell time increase.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="location-info-img">
                            <div className="info-card premium-card">
                                <h3>Enterprise Grade Connectivity</h3>
                                <p>"Adding AdsOnWifi to our cafes was the best operational decision we made this year. Not only did our customers love it, but we also saved on expensive internet bills."</p>
                                <cite>- Managing Director, Top Cafe Chain</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-primary text-white text-center">
                <div className="container">
                    <h2 className="mb-4 text-white">Ready to Upgrade Your Space?</h2>
                    <p className="mb-6 text-white" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                        Our team is ready to help you provide the best experience for your visitors.
                    </p>
                    <div className="btn-group">
                        <button className="btn btn-light btn-lg" onClick={() => navigate('/contact?tab=location')}>
                            Request Device Now
                        </button>
                        <button className="btn btn-outline-light btn-lg" onClick={() => window.open('https://wa.me/923345588889', '_blank')}>
                            Enquire on WhatsApp
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Locations;
