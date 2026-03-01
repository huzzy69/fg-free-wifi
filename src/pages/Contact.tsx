import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { api } from '../api';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultTab = queryParams.get('tab') === 'location' ? 'location' : 'advertiser';

    const [activeTab, setActiveTab] = useState<'advertiser' | 'location'>(defaultTab);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        city: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                        name: formData.name,
                        email: formData.email,
                        business: formData.businessName,
                        city: formData.city,
                        phone: formData.phone,
                        message: formData.message,
                        type: activeTab
                    },
                    'hp0PEVb-bDY2_hS_5'
                );
            } catch (err) {
                console.error('Email failed to send but recording inquiry:', err);
            }

            await api.inquiries.submit({
                ...formData,
                type: activeTab
            });
            alert('Thank you! Your request has been submitted successfully. We will contact you soon.');
            setFormData({
                name: '',
                businessName: '',
                city: '',
                phone: '',
                email: '',
                message: ''
            });
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            <section className="hero-subpage bg-secondary text-white">
                <div className="container">
                    <h1>Get In Touch</h1>
                    <p>Whether you want to advertise or partner with us, we're ready to help you grow.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info-panel">
                            <h2>Contact Information</h2>
                            <p className="mb-8">Have questions? Reach out to us directly or fill out the form.</p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <Phone className="text-primary" />
                                    <div>
                                        <h4>Call Us</h4>
                                        <p>0334-5588889</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <Mail className="text-primary" />
                                    <div>
                                        <h4>Email Us</h4>
                                        <p>info@fakhirgroup.com</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <MapPin className="text-primary" />
                                    <div>
                                        <h4>Visit Us</h4>
                                        <p>1405 Ibex Tower,<br />Next to FTC Building, Karachi, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-panel">
                            <div className="form-tabs">
                                <button
                                    className={`tab-btn ${activeTab === 'advertiser' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('advertiser')}
                                >
                                    Advertise with us
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('location')}
                                >
                                    Request Free Internet
                                </button>
                            </div>

                            <div className="form-container">
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Business Name</label>
                                        <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your Business" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                                    </div>
                                    <div className="grid-cols-2 gap-small">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Your City" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Contact Number</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+123..." required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Message (Optional)</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us more about your needs..."></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : (activeTab === 'advertiser' ? 'Become an Advertiser' : 'Request Free Internet')}
                                        {!isSubmitting && <Send size={18} />}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
