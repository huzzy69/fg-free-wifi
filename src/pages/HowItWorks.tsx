import React from 'react';
import { Wifi, Eye, BarChart3, Settings, ShieldCheck, HeartPulse } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
    return (
        <div className="how-it-works-page">
            <section className="hero-subpage bg-primary text-white">
                <div className="container">
                    <h1>How It Works</h1>
                    <p>A simple, transparent process that delivers value to everyone involved.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="process-flow">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    <Settings size={40} />
                                </div>
                                <h3>We Install Wi-Fi</h3>
                                <p>We maintain and install enterprise-grade Wi-Fi routers at your location. We handle everything.</p>
                            </div>
                        </div>

                        <div className="process-step inverse">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    <Wifi size={40} />
                                </div>
                                <h3>Users Connect & See Ads</h3>
                                <p>When customers connect to the Wi-Fi, they are redirected to a beautiful login page where they view a 5-second non-skippable ad from local sponsors.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    <Eye size={40} />
                                </div>
                                <h3>Advertisers Get Visibility</h3>
                                <p>Brands get 100% attention from users at precisely the moment they look at their phones to connect to the internet.</p>
                            </div>
                        </div>

                        <div className="process-step inverse">
                            <div className="step-number">04</div>
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3>We Manage Everything</h3>
                                <p>From technical support to ad rotation and hardware updates, our team handles 100% of the operation. You just provide the space.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container text-center">
                    <h2>The Triple Win</h2>
                    <div className="grid-cols-3 mt-8">
                        <div className="win-card">
                            <HeartPulse className="text-primary mb-4" size={48} />
                            <h3>For Users</h3>
                            <p>High-speed internet at their favorite spots.</p>
                        </div>
                        <div className="win-card">
                            <BarChart3 className="text-primary mb-4" size={48} />
                            <h3>For Advertisers</h3>
                            <p>Guaranteed impressions and premium brand placement.</p>
                        </div>
                        <div className="win-card">
                            <Settings className="text-primary mb-4" size={48} />
                            <h3>For Locations</h3>
                            <p>Better customer satisfaction and professional guest Wi-Fi at no cost.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
