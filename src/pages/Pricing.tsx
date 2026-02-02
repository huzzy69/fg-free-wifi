import React from 'react';
import './Pricing.css';
import { CheckCircle } from 'lucide-react';
const Pricing: React.FC = () => {
    const handleGetStarted = () => {
        window.open('https://wa.me/923345588889', '_blank');
    };

    return (
        <div className="pricing-page">
            <section className="section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Flexible Pricing Plans</h2>
                        <p className="section-desc">Choose the perfect plan for your advertising goals</p>
                    </div>

                    <div className="pricing-grid">
                        {/* Image Ads */}
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Image Ads</h3>
                                <div className="price-label" style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontWeight: '500' }}>Min. 1000 Impressions</div>
                            </div>
                            <ul className="pricing-features">
                                <li><CheckCircle size={18} /> 05 Seconds Duration</li>
                                <li><CheckCircle size={18} /> Image Ads Format</li>
                                <li><CheckCircle size={18} /> Up to 3 Images</li>
                                <li><CheckCircle size={18} /> Ads on Multiple Locations</li>
                                <li><CheckCircle size={18} /> Enhanced Analytics</li>
                                <li><CheckCircle size={18} /> No Contract</li>
                            </ul>
                            <button className="btn btn-outline w-full" onClick={handleGetStarted}>Get this Plan</button>
                        </div>

                        {/* Video Ads */}
                        <div className="pricing-card featured">
                            <div className="badge">Most Engaging</div>
                            <div className="pricing-header">
                                <h3>Video Ads</h3>
                                <div className="price-label" style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontWeight: '500' }}>Min. 1000 Impressions</div>
                            </div>
                            <ul className="pricing-features">
                                <li><CheckCircle size={18} /> 05 Seconds Duration</li>
                                <li><CheckCircle size={18} /> Video Ads Format</li>
                                <li><CheckCircle size={18} /> Up to 2 Videos</li>
                                <li><CheckCircle size={18} /> Ads on Multiple Location</li>
                                <li><CheckCircle size={18} /> Enhanced Analytics</li>
                                <li><CheckCircle size={18} /> No Contract</li>
                            </ul>
                            <button className="btn btn-primary w-full" onClick={handleGetStarted}>Get this Plan</button>
                        </div>

                        {/* Surveys */}
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Surveys</h3>
                                <div className="price-label" style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontWeight: '500' }}>Min. 5000 Surveys</div>
                            </div>
                            <ul className="pricing-features">
                                <li><CheckCircle size={18} /> Specific Sector</li>
                                <li><CheckCircle size={18} /> Multiple Choice Questions</li>
                                <li><CheckCircle size={18} /> Real-Time Results</li>
                                <li><CheckCircle size={18} /> Periodic Campaigns</li>
                                <li><CheckCircle size={18} /> No Contract</li>
                            </ul>
                            <button className="btn btn-outline w-full" onClick={handleGetStarted}>Get this Plan</button>
                        </div>

                        {/* Site Sponsorship */}
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <h3>Site Sponsorship</h3>
                                <div className="price-label" style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontWeight: '500' }}>Min. 1 Month</div>
                            </div>
                            <ul className="pricing-features">
                                <li><CheckCircle size={18} /> Primary Placement</li>
                                <li><CheckCircle size={18} /> Permanent Static Image</li>
                                <li><CheckCircle size={18} /> Your Logo Included</li>
                                <li><CheckCircle size={18} /> Guaranteed View</li>
                                <li><CheckCircle size={18} /> Exclusive Branding</li>
                            </ul>
                            <button className="btn btn-outline w-full" onClick={handleGetStarted}>Get this Plan</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
