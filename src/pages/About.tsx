import React from 'react';
import { ShieldCheck, Database, Cpu } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-page">
            <section className="hero-subpage bg-secondary text-white">
                <div className="container">
                    <h1>About AdsOnWifi</h1>
                    <p>We are an independent technology and advertising company dedicated to solving connectivity gaps.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-cols-2 align-center">
                        <div className="about-text">
                            <h2 className="mb-4">Our Vision</h2>
                            <p className="mb-4">Founded by the Fakhir Group, we believe that internet access is a basic necessity in the modern age. Our mission is to make high-speed WiFi available in every public corner, powered by ethical and local advertising.</p>
                            <p>We own our infrastructure and our proprietary ad platform. This means we don't rely on third-party tracking or invasive data collection. We just connect people to what they need.</p>
                        </div>
                        <div className="about-stats grid-cols-2">
                            <div className="stat-card">
                                <h3>500+</h3>
                                <p>Venues</p>
                            </div>
                            <div className="stat-card">
                                <h3>1M+</h3>
                                <p>Monthly Views</p>
                            </div>
                            <div className="stat-card">
                                <h3>100%</h3>
                                <p>User Access</p>
                            </div>
                            <div className="stat-card">
                                <h3>0%</h3>
                                <p>Fake Claims</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our Core Tech & Trust</h2>
                        <p className="section-desc">Credibility is our most valuable asset.</p>
                    </div>

                    <div className="grid-cols-3">
                        <div className="trust-card">
                            <ShieldCheck size={40} className="text-primary mb-4" />
                            <h3>Independent Platform</h3>
                            <p>We are not Meta, Google, or Starlink. We are an independent local network built for local businesses.</p>
                        </div>
                        <div className="trust-card">
                            <Database size={40} className="text-primary mb-4" />
                            <h3>Data Privacy</h3>
                            <p>We don't sell your data. We only track ad impressions to ensure our advertisers get what they pay for.</p>
                        </div>
                        <div className="trust-card">
                            <Cpu size={40} className="text-primary mb-4" />
                            <h3>Proprietary Hardware</h3>
                            <p>We manage our own routers and servers, ensuring high performance and security for every user.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
