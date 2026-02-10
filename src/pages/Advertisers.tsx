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
                            <h1>Advertise with AdsOnWifi</h1>
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
                                    step="1000"
                                    defaultValue="10000"
                                    className="range-slider"
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        const views = Math.floor(val / 10); // Assuming avg 10 PKR per view
                                        const budgetEl = document.getElementById('calc-budget');
                                        const viewsEl = document.getElementById('calc-views');
                                        const usersEl = document.getElementById('calc-users');
                                        if (budgetEl) budgetEl.innerText = val.toLocaleString();
                                        if (viewsEl) viewsEl.innerText = views.toLocaleString();
                                        if (usersEl) usersEl.innerText = Math.floor(views * 0.75).toLocaleString();
                                    }}
                                />
                                <div className="budget-display">PKR <span id="calc-budget">10,000</span></div>
                            </div>
                        </div>
                        <div className="calculator-results">
                            <div className="result-item">
                                <span className="label">Minimum Guaranteed Views</span>
                                <span className="value" id="calc-views">1,000</span>
                            </div>
                            <div className="result-item">
                                <span className="label">Estimated Unique Users</span>
                                <span className="value" id="calc-users">750</span>
                            </div>
                            <div className="result-item highlight">
                                <span className="label">Average Pay Per Click</span>
                                <span className="value">PKR 10</span>
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
                            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop" alt="Public Parks" className="venue-img" />
                            <h3>Public Parks</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=800&auto=format&fit=crop" alt="Museums" className="venue-img" />
                            <h3>Museums</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" alt="On-Demand Internet" className="venue-img" />
                            <h3>On-Demand Internet</h3>
                        </div>
                        <div className="venue-item">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop" alt="On the Move" className="venue-img" />
                            <h3>On the Move</h3>
                        </div>
                    </div>
                </div>
            </section>













            {/* Advertiser Focus Section - Moved Down */}
            <section className="section bg-gradient-primary text-white">
                <div className="container">
                    <div className="grid-cols-2 align-center">
                        <div>
                            <h2 className="mb-4">For Brands: The Future of Local Marketing</h2>
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
                                <button className="btn btn-light btn-lg" onClick={() => navigate('/pricing')}>
                                    View Pricing Plans <TrendingUp size={20} style={{ display: 'inline', marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>
                        <div className="advertiser-stats-box">
                            <h3 className="mb-4">Average Brand Results</h3>
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
                                        <p>info@fakhirgroup.com</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <Phone size={24} className="text-primary" />
                                    <div>
                                        <h4>Call Us</h4>
                                        <p>0334-5588889</p>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <Building size={24} className="text-primary" />
                                    <div>
                                        <h4>Visit Us</h4>
                                        <p>B1-104, UK Square, Federal B. Area, Karachi</p>
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
