import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, ArrowRight, Eye, CheckCircle, BarChart3, Users, MapPin, TrendingUp, Star } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import HeroIllustration from '../assets/hero-illustration.png';
import './Home.css';

const iconMap: any = {
    Wifi, ArrowRight, Eye, CheckCircle, BarChart3, Users, MapPin, TrendingUp, Star
};

const Home: React.FC = () => {
    const { config } = useSiteConfig();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            FREE Wi-Fi for<br />Users.<br />
                            <span className="text-primary">Revenue</span> for<br />Businesses.<br />
                            <span className="text-primary">Visibility</span> for<br />Advertisers.
                        </h1>

                        <div className="hero-buttons">
                            <Link to="/locations" className="btn btn-primary btn-hero">
                                <Wifi size={22} strokeWidth={2.5} /> Get Wi-Fi
                            </Link>
                            <Link to="/advertisers" className="btn btn-outline btn-hero">
                                <BarChart3 size={22} strokeWidth={2.5} /> Advertise With Us
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="hero-quick-stats">
                            <div className="quick-stat">
                                <Wifi size={20} className="text-primary" strokeWidth={3} />
                                <span>{config.heroStat1Value}</span>
                            </div>
                            <div className="quick-stat">
                                <MapPin size={20} className="text-primary" strokeWidth={3} />
                                <span>{config.heroStat2Value}</span>
                            </div>
                            <div className="quick-stat">
                                <TrendingUp size={20} className="text-primary" strokeWidth={3} />
                                <span>{config.heroStat3Value}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image-placeholder">
                        <img src={HeroIllustration} alt="Free WiFi Network" className="hero-illustration" />
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <section className="section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-desc">Comprehensive connectivity and marketing solutions</p>
                    </div>

                    <div className="services-grid">
                        {config.services && config.services.map((service) => {
                            const IconComponent = (iconMap[service.icon] || Wifi) as React.ElementType;
                            return (
                                <div className="service-card" key={service.id}>
                                    <div className="service-icon-wrapper">
                                        <IconComponent size={32} />
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Preview */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-desc">A simple ecosystem where everyone wins.</p>
                    </div>

                    <div className="steps-grid grid-cols-4">
                        <div className="step-card">
                            <div className="step-icon-bg">
                                <Wifi size={32} className="step-icon" />
                            </div>
                            <h3>1. We Install</h3>
                            <p>We set up enterprise-grade Wi-Fi hardware at your location.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-bg">
                                <CheckCircle size={32} className="step-icon" />
                            </div>
                            <h3>2. Users Connect</h3>
                            <p>Visitors connect to the open Wi-Fi network easily.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-bg">
                                <Eye size={32} className="step-icon" />
                            </div>
                            <h3>3. View Ad</h3>
                            <p>Users watch a short, non-skippable 5-second ad to unlock access.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-bg">
                                <BarChart3 size={32} className="step-icon" />
                            </div>
                            <h3>4. Success</h3>
                            <p>Advertisers get views, Users get internet, Businesses get happy customers.</p>
                        </div>
                    </div>


                </div>
            </section>



            {/* Stats Section */}
            <section className="section bg-primary text-white">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our Impact in Numbers</h2>
                        <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            Real results from our growing network
                        </p>
                    </div>

                    <div className="stats-grid grid-cols-4">
                        <div className="stat-box">
                            <h3>1M+</h3>
                            <p>Monthly Ad Views</p>
                        </div>
                        <div className="stat-box">
                            <h3>200+</h3>
                            <p>Active Locations</p>
                        </div>
                        <div className="stat-box">
                            <h3>50K+</h3>
                            <p>Daily Users</p>
                        </div>
                        <div className="stat-box">
                            <h3>100%</h3>
                            <p>Completion Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">What Our Partners Say</h2>
                        <p className="section-desc">Success stories from advertisers and location owners</p>
                    </div>

                    <div className="grid-cols-3">
                        <div className="testimonial-card">
                            <div className="stars">
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                            </div>
                            <p className="testimonial-text">
                                "Our foot traffic increased by 30% after partnering with Ads on WiFi. Customers love the free internet!"
                            </p>
                            <div className="testimonial-author">
                                <strong>Ahmed Khan</strong>
                                <span>Cafe Owner, Karachi</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="stars">
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                            </div>
                            <p className="testimonial-text">
                                "Best ROI we've seen from any advertising channel. 100% guaranteed views with local targeting!"
                            </p>
                            <div className="testimonial-author">
                                <strong>Sarah Ali</strong>
                                <span>Marketing Manager, Local Brand</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="stars">
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                <Star size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                            </div>
                            <p className="testimonial-text">
                                "Professional setup, zero maintenance cost, and happy customers. It's a win-win partnership!"
                            </p>
                            <div className="testimonial-author">
                                <strong>Bilal Hassan</strong>
                                <span>Gym Owner, Lahore</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section bg-primary-dark text-white">
                <div className="container">
                    <div className="grid-cols-2">
                        <div className="why-us-content">
                            <h2>Why Choose Ads on WiFi?</h2>
                            <ul className="why-us-list">
                                <li>
                                    <CheckCircle className="list-icon" />
                                    <div>
                                        <strong>Guaranteed Views</strong>
                                        <p>Unlike scrolling feeds, our ads occupy 100% share of voice during login.</p>
                                    </div>
                                </li>
                                <li>
                                    <CheckCircle className="list-icon" />
                                    <div>
                                        <strong>Full Installation</strong>
                                        <p>We handle hardware, installation, and maintenance.</p>
                                    </div>
                                </li>
                                <li>
                                    <CheckCircle className="list-icon" />
                                    <div>
                                        <strong>Local Targeting</strong>
                                        <p>Advertisers can target specific venues (cafes, gyms, malls).</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="cta-box">
                            <h3>Ready to get started?</h3>
                            <p>Join the network of over 200+ locations and reach thousands of daily users.</p>
                            <div className="cta-buttons-vertical">
                                <Link to="/contact" className="btn btn-light btn-full">Contact Sales</Link>
                                <Link to="/advertisers" className="btn btn-outline-light btn-full">For Locations</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
