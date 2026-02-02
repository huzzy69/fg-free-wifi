import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Users, Layout, TrendingUp, Eye, MapPin, CheckCircle, Mail, Phone, Building, Zap, Shield, ArrowRight, BarChart3 } from 'lucide-react';
import shoppingImg from '../assets/shopping_venues.png';
import foodImg from '../assets/food_beverages.png';
import educationImg from '../assets/education_sector.png';
import healthcareImg from '../assets/healthcare.png';
import cinemasImg from '../assets/cinemas.png';
import './Advertisers.css';
import { api } from '../api';
import emailjs from '@emailjs/browser';
import StatCounter from '../components/StatCounter';

const Advertisers: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Send Email via EmailJS
            try {
                await emailjs.send(
                    'service_v0ify2b',
                    'template_rc59a2h',
                    {
                        name: formData.contactName,
                        email: formData.email,
                        business: formData.companyName,
                        phone: formData.phone,
                        budget: formData.budget,
                        message: formData.message,
                        type: 'advertiser'
                    },
                    'hp0PEVb-bDY2_hS_5'
                );
            } catch (err) {
                console.error('Email failed to send but recording inquiry:', err);
            }

            await api.inquiries.submit({
                name: formData.contactName,
                businessName: formData.companyName,
                city: 'N/A',
                phone: formData.phone,
                email: formData.email,
                message: `Budget: ${formData.budget}. Message: ${formData.message}`,
                type: 'advertiser'
            });
            alert('Thank you! We will contact you within 24 hours.');
            setFormData({
                companyName: '',
                contactName: '',
                email: '',
                phone: '',
                budget: '',
                message: ''
            });
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="advertisers-page">
            <section className="hero-subpage bg-secondary text-white">
                <div className="container">
                    <div className="hero-content-wrapper">
                        <div className="hero-text-content">
                            <h1>Advertise with Ads on WiFi</h1>
                            <p className="hero-subtitle">Reach your local audience with 100% guaranteed, non-skippable impressions. Transform every WiFi connection into a powerful marketing opportunity.</p>
                            <div className="hero-cta-buttons">
                                <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Why Choose Us <Users size={20} />
                                </button>
                                <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Calculate Your Reach <ArrowRight size={20} />
                                </button>
                                <button className="btn btn-primary btn-lg" onClick={() => navigate('/pricing')}>
                                    Pricing <TrendingUp size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <Eye size={32} className="stat-icon" />
                            <h3><StatCounter end="50K+" /></h3>
                            <p>Daily Impressions</p>
                        </div>
                        <div className="stat-item">
                            <TrendingUp size={32} className="stat-icon" />
                            <h3><StatCounter end="100%" /></h3>
                            <p>View Rate</p>
                        </div>
                        <div className="stat-item">
                            <MapPin size={32} className="stat-icon" />
                            <h3><StatCounter end="200+" /></h3>
                            <p>Active Locations</p>
                        </div>
                        <div className="stat-item">
                            <Shield size={32} className="stat-icon" />
                            <h3><StatCounter end="100%" /></h3>
                            <p>Client Trust</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator Section */}
            <section className="section" id="roi-calculator">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Calculate Your Reach</h2>
                        <p className="section-desc">See how many guaranteed views you can get with your budget.</p>
                    </div>

                    <div className="roi-calculator">
                        <div className="calculator-controls">
                            <h3>Estimate Your Campaign</h3>
                            <div className="calc-input-group">
                                <label>Your Budget (PKR)</label>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    defaultValue="50000"
                                    className="range-slider"
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        const views = Math.floor(val / 2.5); // Assuming avg 2.5 PKR per view
                                        const budgetEl = document.getElementById('calc-budget');
                                        const viewsEl = document.getElementById('calc-views');
                                        const usersEl = document.getElementById('calc-users');
                                        if (budgetEl) budgetEl.innerText = val.toLocaleString();
                                        if (viewsEl) viewsEl.innerText = views.toLocaleString();
                                        if (usersEl) usersEl.innerText = Math.floor(views * 0.85).toLocaleString();
                                    }}
                                />
                                <div className="budget-display">PKR <span id="calc-budget">50,000</span></div>
                            </div>
                        </div>
                        <div className="calculator-results">
                            <div className="result-item">
                                <span className="label">Guaranteed Views</span>
                                <span className="value" id="calc-views">20,000</span>
                            </div>
                            <div className="result-item">
                                <span className="label">Est. Unique Users</span>
                                <span className="value" id="calc-users">17,000</span>
                            </div>
                            <div className="result-item highlight">
                                <span className="label">Avg. CPV</span>
                                <span className="value">PKR 2.5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advertiser Focus Section - Moved from Home */}
            <section className="section bg-gradient-primary text-white">
                <div className="container">
                    <div className="grid-cols-2 align-center">
                        <div>
                            <h2 className="mb-4">For Advertisers: The Future of Local Marketing</h2>
                            <p className="mb-6" style={{ fontSize: '1.1rem', opacity: 0.95 }}>
                                Stop wasting money on ads people scroll past. Our platform guarantees 100% view completion
                                because users MUST watch your ad to access WiFi. No skip buttons, no distractions.
                            </p>
                            <ul className="advertiser-benefits">
                                <li>
                                    <CheckCircle size={24} />
                                    <div>
                                        <strong>100% Guaranteed Views</strong>
                                        <p>Every impression is a real view - no bots, no fraud</p>
                                    </div>
                                </li>
                                <li>
                                    <CheckCircle size={24} />
                                    <div>
                                        <strong>Hyper-Local Targeting</strong>
                                        <p>Target specific cafes, gyms, malls, or neighborhoods</p>
                                    </div>
                                </li>
                                <li>
                                    <CheckCircle size={24} />
                                    <div>
                                        <strong>Premium Placement</strong>
                                        <p>Full-screen, undivided attention at the moment of engagement</p>
                                    </div>
                                </li>
                                <li>
                                    <CheckCircle size={24} />
                                    <div>
                                        <strong>Detailed Analytics</strong>
                                        <p>Track every impression, location, and time of day</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-light btn-lg" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                    View Pricing Plans <TrendingUp size={20} style={{ display: 'inline', marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>
                        <div className="advertiser-stats-box">
                            <h3 className="mb-4">Average Advertiser Results</h3>
                            <div className="result-stat">
                                <div className="result-number">85%</div>
                                <div className="result-label">Brand Recall Rate</div>
                            </div>
                            <div className="result-stat">
                                <div className="result-number">3x</div>
                                <div className="result-label">Better ROI vs Social Media</div>
                            </div>
                            <div className="result-stat">
                                <div className="result-number">50K+</div>
                                <div className="result-label">Daily Impressions Available</div>
                            </div>
                            <div className="cta-note">
                                <p>Starting from just <strong>PKR 25,000/month</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="why-choose-us">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Advertise on Our Network?</h2>
                        <p className="section-desc">Conventional digital ads are easily ignored. Ours are required for connectivity, ensuring your message is heard.</p>
                    </div>

                    <div className="grid-cols-4">
                        <div className="feature-card">
                            <Layout className="text-primary mb-4" size={40} />
                            <h3>Guaranteed Impressions</h3>
                            <p>Users must view your 5-second ad to connect. No "skip ad" button, no scrolling past.</p>
                        </div>
                        <div className="feature-card">
                            <Target className="text-primary mb-4" size={40} />
                            <h3>Local Targeting</h3>
                            <p>Target specific neighborhoods or venue types to reach exactly who you want.</p>
                        </div>
                        <div className="feature-card">
                            <Users className="text-primary mb-4" size={40} />
                            <h3>High Engagement</h3>
                            <p>Connect with users at the moment they are actively looking at their devices to go online.</p>
                        </div>
                        <div className="feature-card">
                            <BarChart3 className="text-primary mb-4" size={40} />
                            <h3>Data-Driven Insights</h3>
                            <p>Track your campaign performance in real-time with our detailed analytics dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Moved from Locations */}
            <section className="section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Perfect for Every Space</h2>
                        <p className="section-desc">We work with diverse businesses to provide high-quality internet to their visitors.</p>
                    </div>

                    <div className="grid-cols-3">
                        <div className="venue-item">
                            <img src={shoppingImg} alt="Shopping Venues" className="venue-img" />
                            <h3>Shopping Venues</h3>
                        </div>
                        <div className="venue-item">
                            <img src={foodImg} alt="Food & Beverages" className="venue-img" />
                            <h3>Food & Beverages</h3>
                        </div>
                        <div className="venue-item">
                            <img src={educationImg} alt="Education Sector" className="venue-img" />
                            <h3>Education Sector</h3>
                        </div>
                        <div className="venue-item">
                            <img src={healthcareImg} alt="Healthcare" className="venue-img" />
                            <h3>Healthcare</h3>
                        </div>
                        <div className="venue-item">
                            <img src={cinemasImg} alt="Cinemas" className="venue-img" />
                            <h3>Cinemas</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cf5e?q=80&w=800&auto=format&fit=crop" alt="Public Parks" className="venue-img" />
                            <h3>Public Parks</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop" alt="Museums" className="venue-img" />
                            <h3>Museums</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" alt="On-Demand Internet" className="venue-img" />
                            <h3>On-Demand Internet</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop" alt="On the Move" className="venue-img" />
                            <h3>On the Move</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-cols-2">
                        <div className="benefits-for-owner">
                            <h2 className="mb-6">0% Cost. 100% Benefit.</h2>
                            <div className="benefit-item">
                                <Zap className="text-primary" />
                                <div>
                                    <h4>Professional Installation</h4>
                                    <p>Enterprise hardware installed by our technicians for you.</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <Shield className="text-primary" />
                                <div>
                                    <h4>No Maintenance Headache</h4>
                                    <p>We handle all technical issues, updates, and customer support.</p>
                                </div>
                            </div>

                            <div className="cta-section text-center">
                                <p>Wi-Fi is the #1 amenity customers look for in public spaces.</p>
                                <div className="btn-group">

                                    <Link to="/locations" className="btn btn-primary" title="For users who want to see where FG Free Wifi is available">See FG Free Wifi Locations</Link>
                                </div>
                            </div>
                        </div>
                        <div className="location-info-img">
                            <div className="info-card">
                                <h3>Our Promise to Owners</h3>
                                <p>"We treat your location with respect. Our hardware is discreet, our network is secure, and our service is invisible until it's needed."</p>
                                <cite>— Fakhir Group Team</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>





            {/* Analytics Dashboard Preview */}
            <section className="section bg-light">
                <div className="container">
                    <div className="grid-cols-2 align-center gap-large">
                        <div className="dashboard-mockup">
                            <div className="browser-frame">
                                <div className="browser-header">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                    <div className="browser-bar">ads.fakhir.com/dashboard</div>
                                </div>
                                <div className="browser-content">
                                    <div className="dash-header">
                                        <h4>Campaign Overview</h4>
                                        <span className="date-range">Last 30 Days</span>
                                    </div>
                                    <div className="dash-stats">
                                        <div className="d-stat">
                                            <small>Impressions</small>
                                            <strong>45,231</strong>
                                            <span className="text-success">↑ 12%</span>
                                        </div>
                                        <div className="d-stat">
                                            <small>Clicks</small>
                                            <strong>1,204</strong>
                                            <span className="text-success">↑ 5%</span>
                                        </div>
                                        <div className="d-stat">
                                            <small>CTR</small>
                                            <strong>2.6%</strong>
                                            <span className="text-neutral">-</span>
                                        </div>
                                    </div>
                                    <div className="dash-chart">
                                        <div className="chart-bar" style={{ height: '40%' }}></div>
                                        <div className="chart-bar" style={{ height: '60%' }}></div>
                                        <div className="chart-bar" style={{ height: '45%' }}></div>
                                        <div className="chart-bar" style={{ height: '80%' }}></div>
                                        <div className="chart-bar" style={{ height: '55%' }}></div>
                                        <div className="chart-bar" style={{ height: '90%' }}></div>
                                        <div className="chart-bar" style={{ height: '70%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-info">
                            <h2>Transparancy You Can Trust</h2>
                            <p className="mb-6">We provide a comprehensive advertiser dashboard where you can track your campaign performance in real-time.</p>
                            <ul className="bullet-list">
                                <li><strong>Real-Time Stats:</strong> See views as they happen.</li>
                                <li><strong>Location Breakdown:</strong> Know which venues perform best.</li>
                                <li><strong>Device Analytics:</strong> Understand your audience's tech.</li>
                                <li><strong>Exportable Reports:</strong> Easy PDF/Excel exports for your team.</li>
                            </ul>
                            <button className="btn btn-outline mt-6">View Demo Dashboard</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audience Demographics */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Who Will You Reach?</h2>
                        <p className="section-desc">Our network covers a diverse range of high-value users.</p>
                    </div>

                    <div className="demographics-grid">
                        <div className="demo-card">
                            <h3>Age Groups</h3>
                            <div className="progress-list">
                                <div className="p-item">
                                    <span>18-24</span>
                                    <div className="p-bar"><div style={{ width: '35%' }}></div></div>
                                    <span>35%</span>
                                </div>
                                <div className="p-item">
                                    <span>25-34</span>
                                    <div className="p-bar"><div style={{ width: '45%' }}></div></div>
                                    <span>45%</span>
                                </div>
                                <div className="p-item">
                                    <span>35-44</span>
                                    <div className="p-bar"><div style={{ width: '15%' }}></div></div>
                                    <span>15%</span>
                                </div>
                            </div>
                        </div>
                        <div className="demo-card">
                            <h3>Interests</h3>
                            <div className="tags-cloud">
                                <span>Tech</span>
                                <span>Travel</span>
                                <span>Food & Dining</span>
                                <span>Shopping</span>
                                <span>Education</span>
                                <span>Business</span>
                                <span>Entertainment</span>
                                <span>Health</span>
                            </div>
                        </div>
                        <div className="demo-card">
                            <h3>Locations</h3>
                            <ul className="icon-list">
                                <li><Building size={16} /> Shopping Malls</li>
                                <li><Users size={16} /> Universities</li>
                                <li><Layout size={16} /> Cafes & Restaurants</li>
                                <li><MapPin size={16} /> Public Transport Areas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support / FAQ */}
            <section className="section bg-light">
                <div className="container">
                    <div className="section-header text-center block-header">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>Can I choose specific locations?</h4>
                            <p>Yes! With our Professional and Enterprise plans, you can select specific zones or types of venues to target.</p>
                        </div>
                        <div className="faq-item">
                            <h4>How do you verify views?</h4>
                            <p>Our system requires the ad to fully load and play on the user's screen before internet access is granted. We track completed views, not just loads.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I change my ad creative?</h4>
                            <p>Absolutely. You can update your image or video creatives at any time through your dashboard or by contacting support.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What is the minimum contract?</h4>
                            <p>There is no long-term contract! Our plans are monthly. Site Sponsorships have a minimum 1-month commitment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stats */}
            <section className="section bg-primary text-white">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title text-white">Our Impact in Numbers</h2>
                        <p className="section-desc text-white">Real results from our growing network</p>
                    </div>

                    <div className="grid-cols-4">
                        <div className="stat-card">
                            <TrendingUp size={32} className="mb-3" />
                            <h3><StatCounter end="85%" /></h3>
                            <p>Average Recall Rate</p>
                        </div>
                        <div className="stat-card">
                            <Eye size={32} className="mb-3" />
                            <h3><StatCounter end="100%" /></h3>
                            <p>Completion Rate</p>
                        </div>
                        <div className="stat-card">
                            <MapPin size={32} className="mb-3" />
                            <h3><StatCounter end="200+" /></h3>
                            <p>Active Locations</p>
                        </div>
                        <div className="stat-card">
                            <Users size={32} className="mb-3" />
                            <h3><StatCounter end="50K+" /></h3>
                            <p>Daily Reach</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section" id="contact-form">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>Ready to Get Started?</h2>
                            <p className="mb-6">Fill out the form and our team will contact you within 24 hours to discuss your advertising goals.</p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <Mail size={24} className="text-primary" />
                                    <div>
                                        <h4>Email Us</h4>
                                        <p>advertise@adsonwifi.com</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <Phone size={24} className="text-primary" />
                                    <div>
                                        <h4>Call Us</h4>
                                        <p>+92 300 1234567</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <Building size={24} className="text-primary" />
                                    <div>
                                        <h4>Visit Us</h4>
                                        <p>Karachi, Pakistan</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="contact-form-container">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name *</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactName">Contact Name *</label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+92 300 1234567"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="budget">Monthly Budget</label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="25k-50k">PKR 25,000 - 50,000</option>
                                        <option value="50k-100k">PKR 50,000 - 100,000</option>
                                        <option value="100k-250k">PKR 100,000 - 250,000</option>
                                        <option value="250k+">PKR 250,000+</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about your advertising goals..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Advertisers;
