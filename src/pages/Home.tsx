import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, BarChart3, MapPin, TrendingUp, CheckCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import HeroIllustration from '../assets/hero-illustration.png';
import StatCounter from '../components/StatCounter';
import TestimonialSlider from '../components/TestimonialSlider';
import './Home.css';

const iconMap: any = {
    Wifi, BarChart3, MapPin, TrendingUp, CheckCircle
};

const Home: React.FC = () => {
    const { config } = useSiteConfig();

    React.useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section reveal-up">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <div className="hero-spacer">
                                Customer getting <span className="text-primary">Free Wifi</span>
                            </div>
                            <div className="hero-spacer">
                                Business getting <span className="text-primary">Growth</span>
                            </div>
                            <div className="hero-spacer">
                                Advertisers getting <span className="text-primary">Revenue</span>
                            </div>
                            <div>
                                Everyone getting <span className="text-primary">Benefits</span>
                            </div>
                        </h1>

                        <div className="hero-buttons">
                            <Link to="/advertisers" className="btn btn-primary btn-hero">
                                <BarChart3 size={22} strokeWidth={2.5} /> Advertise With Us
                            </Link>
                            <Link to="/locations" className="btn btn-outline btn-hero">
                                <Wifi size={22} strokeWidth={2.5} /> Get Wi-Fi
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image-placeholder">
                        <img src={HeroIllustration} alt="Free WiFi Network" className="hero-illustration" />
                    </div>
                </div>
            </section>

            {/* Quick Stats Strip */}
            <div className="hero-stats-strip reveal-up">
                <div className="container">
                    <div className="hero-quick-stats">
                        <div className="quick-stat">
                            <Wifi size={20} className="text-primary" strokeWidth={3} />
                            <span><StatCounter end={config.heroStat1Value} /></span>
                        </div>
                        <div className="quick-stat">
                            <MapPin size={20} className="text-primary" strokeWidth={3} />
                            <span><StatCounter end={config.heroStat2Value} /></span>
                        </div>
                        <div className="quick-stat">
                            <TrendingUp size={20} className="text-primary" strokeWidth={3} />
                            <span><StatCounter end={config.heroStat3Value} /></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Services */}
            <section className="section bg-light reveal-up">
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
            <section className="section reveal-up">
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
                                <Wifi size={32} className="step-icon" />
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
            <section className="section bg-primary text-white reveal-up">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title text-white">Our Impact in Numbers</h2>
                        <p className="section-desc text-white">Real results from our growing network</p>
                    </div>

                    <div className="stats-grid grid-cols-4">
                        <div className="stat-box">
                            <h3><StatCounter end="1M+" /></h3>
                            <p>Monthly Ad Views</p>
                        </div>
                        <div className="stat-box">
                            <h3><StatCounter end="200+" /></h3>
                            <p>Active Locations</p>
                        </div>
                        <div className="stat-box">
                            <h3><StatCounter end="50K+" /></h3>
                            <p>Daily Users</p>
                        </div>
                        <div className="stat-box">
                            <h3><StatCounter end="100%" /></h3>
                            <p>Completion Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section bg-light reveal-up">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">What Our Partners Say</h2>
                        <p className="section-desc">Success stories from advertisers and location owners</p>
                    </div>

                    <TestimonialSlider />
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section bg-primary-dark text-white reveal-up">
                <div className="container">
                    <div className="grid-cols-2">
                        <div className="why-us-content">
                            <h2>Why Choose AdsOnWifi?</h2>
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
