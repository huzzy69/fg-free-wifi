import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, MapPin, Settings, LogOut, Menu, X, Bell, Save, Trash2, Check, RefreshCw, Filter, ExternalLink, User as UserIcon, Lock as LockIcon, Eye, EyeOff } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { api, type Inquiry } from '../../api';
import './AdminDashboard.css';

const InquiriesList: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');

    const fetchInquiries = async () => {
        setLoading(true);
        const data = await api.inquiries.getAll();
        setInquiries(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusUpdate = async (id: string, status: Inquiry['status']) => {
        await api.inquiries.updateStatus(id, status);
        fetchInquiries();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            await api.inquiries.delete(id);
            fetchInquiries();
        }
    };

    const filteredInquiries = inquiries.filter(item =>
        filter === 'all' ? true : item.status === filter
    );

    if (loading) return <div className="loading-spinner"><RefreshCw className="spin" /> Loading inquiries...</div>;

    return (
        <div className="inquiries-list-wrapper">
            <div className="filter-bar">
                <Filter size={18} />
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                <button className={`filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>New</button>
                <button className={`filter-btn ${filter === 'contacted' ? 'active' : ''}`} onClick={() => setFilter('contacted')}>Contacted</button>
                <button className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>Resolved</button>
            </div>

            {filteredInquiries.length === 0 ? (
                <div className="empty-state">No inquiries found.</div>
            ) : (
                <div className="inquiry-table-wrapper">
                    <table className="inquiry-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name / Business</th>
                                <th>Type</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.map(item => (
                                <tr key={item.id}>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                    <td>
                                        <div className="name-cell">
                                            <strong>{item.name}</strong>
                                            <span>{item.businessName}</span>
                                        </div>
                                    </td>
                                    <td><span className={`badge-type ${item.type}`}>{item.type}</span></td>
                                    <td>
                                        <div className="contact-cell">
                                            <span>{item.phone}</span>
                                            {item.email && <span>{item.email}</span>}
                                        </div>
                                    </td>
                                    <td><span className={`status-badge ${item.status}`}>{item.status}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            {item.status === 'new' && (
                                                <button title="Mark Contacted" onClick={() => handleStatusUpdate(item.id, 'contacted')}><RefreshCw size={16} /></button>
                                            )}
                                            {item.status === 'contacted' && (
                                                <button title="Mark Resolved" onClick={() => handleStatusUpdate(item.id, 'resolved')}><Check size={16} /></button>
                                            )}
                                            <button title="Delete" className="delete" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const AdvertisersList: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        const data = await api.inquiries.getAll();
        setInquiries(data.filter(i => i.type === 'advertiser'));
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    if (loading) return <div className="loading-spinner"><RefreshCw className="spin" /> Loading advertisers...</div>;

    return (
        <div className="inquiries-list-wrapper">
            <div className="section-header">
                <h3>Active Advertiser Leads</h3>
                <p>Potential advertising partners who have contacted us.</p>
            </div>

            {inquiries.length === 0 ? (
                <div className="empty-state">No advertiser leads found.</div>
            ) : (
                <div className="inquiry-table-wrapper">
                    <table className="inquiry-table">
                        <thead>
                            <tr>
                                <th>Name / Business</th>
                                <th>City</th>
                                <th>Contact</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="name-cell">
                                            <strong>{item.name}</strong>
                                            <span>{item.businessName}</span>
                                        </div>
                                    </td>
                                    <td>{item.city}</td>
                                    <td>{item.phone}</td>
                                    <td><span className={`status-badge ${item.status}`}>{item.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const LocationsList: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newLoc, setNewLoc] = useState({ name: '', address: '', city: '', category: '', contact: '', province: '' });

    const fetchLocations = async () => {
        setLoading(true);
        const data = await api.locations.getAll();
        setLocations(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.locations.add(newLoc);
        setShowAddModal(false);
        setNewLoc({ name: '', address: '', city: '', category: '', contact: '', province: '' });
        fetchLocations();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this location?')) {
            await api.locations.delete(id);
            fetchLocations();
        }
    };

    if (loading) return <div className="loading-spinner"><RefreshCw className="spin" /> Loading locations...</div>;

    return (
        <div className="locations-mgmt">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3>WiFi Locations</h3>
                    <p>Manage physical locations where free wifi is installed.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    + Add New Location
                </button>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Location</h3>
                        <form onSubmit={handleAdd}>
                            <input type="text" placeholder="Location Name" required value={newLoc.name} onChange={e => setNewLoc({ ...newLoc, name: e.target.value })} className="form-control mb-2" />
                            <input type="text" placeholder="Address" required value={newLoc.address} onChange={e => setNewLoc({ ...newLoc, address: e.target.value })} className="form-control mb-2" />
                            <div className="form-grid mb-2">
                                <input type="text" placeholder="City" required value={newLoc.city} onChange={e => setNewLoc({ ...newLoc, city: e.target.value })} className="form-control" />
                                <input type="text" placeholder="Category" required value={newLoc.category} onChange={e => setNewLoc({ ...newLoc, category: e.target.value })} className="form-control" />
                            </div>
                            <div className="btn-group mt-4" style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">Save Location</button>
                                <button type="button" className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="inquiry-table-wrapper">
                <table className="inquiry-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(loc => (
                            <tr key={loc.id}>
                                <td>
                                    <div className="name-cell">
                                        <strong>{loc.name}</strong>
                                        <span>{loc.address}</span>
                                    </div>
                                </td>
                                <td>{loc.city}</td>
                                <td><span className="badge-type location">{loc.category}</span></td>
                                <td>
                                    <button onClick={() => handleDelete(loc.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SettingsForm: React.FC = () => {
    const { config, updateConfig } = useSiteConfig();
    const [formData, setFormData] = useState(config);
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setFormData(config);
    }, [config]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateConfig(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="settings-form" onSubmit={handleSubmit}>
            <div className="form-section">
                <h3>General Settings</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Logo URL</label>
                        <input type="text" name="logoUrl" className="form-control" value={formData.logoUrl} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="contactEmail" className="form-control" value={formData.contactEmail} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="contactPhone" className="form-control" value={formData.contactPhone} onChange={handleChange} />
                    </div>
                    <div className="form-group full-width">
                        <label>Office Address</label>
                        <input type="text" name="contactAddress" className="form-control" value={formData.contactAddress} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Homepage Hero Content</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Hero Title Part 1</label>
                        <input type="text" name="heroTitlePart1" className="form-control" value={formData.heroTitlePart1} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Hero Title Highlight 1</label>
                        <input type="text" name="heroTitleHighlight1" className="form-control" value={formData.heroTitleHighlight1} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Hero Title Part 2</label>
                        <input type="text" name="heroTitlePart2" className="form-control" value={formData.heroTitlePart2} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Hero Title Highlight 2</label>
                        <input type="text" name="heroTitleHighlight2" className="form-control" value={formData.heroTitleHighlight2} onChange={handleChange} />
                    </div>
                    <div className="form-group full-width">
                        <label>Hero Subtitle</label>
                        <textarea name="heroSubtitle" className="form-control" value={formData.heroSubtitle} onChange={handleChange} rows={3}></textarea>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Security Settings</h3>
                <p className="section-desc">Change your admin portal login credentials.</p>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Admin Username</label>
                        <div className="input-with-icon">
                            <UserIcon size={18} className="field-icon" />
                            <input
                                type="text"
                                name="adminUsername"
                                className="form-control icon-padding"
                                value={formData.adminUsername}
                                onChange={handleChange}
                                placeholder="admin"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Admin Password</label>
                        <div className="input-with-icon">
                            <LockIcon size={18} className="field-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="adminPassword"
                                className="form-control icon-padding"
                                value={formData.adminPassword}
                                onChange={handleChange}
                                placeholder="admin123"
                            />
                            <button
                                type="button"
                                className="visibility-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide Password" : "Show Password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="save-btn">
                    <Save size={20} /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const [stats, setStats] = useState({ totalInquiries: 0, newInquiries: 0, totalLocations: 0 });
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Check authentication FIRST before anything else
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        const loginTime = localStorage.getItem('adminLoginTime');

        // Check if authenticated
        if (!isAuthenticated) {
            navigate('/nimda');
            return;
        }

        // Check session expiration (2 hours = 7200000 ms)
        if (loginTime) {
            const currentTime = new Date().getTime();
            const sessionDuration = currentTime - parseInt(loginTime);
            const SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

            if (sessionDuration > SESSION_TIMEOUT) {
                // Session expired, logout
                localStorage.removeItem('isAdminAuthenticated');
                localStorage.removeItem('adminLoginTime');
                navigate('/nimda');
                return;
            }
        }

        setIsAuthChecked(true);
    }, [navigate]);

    useEffect(() => {
        if (!isAuthChecked) return; // Don't fetch stats until auth is verified

        const fetchStats = async () => {
            const [inquiries, locations] = await Promise.all([
                api.inquiries.getAll(),
                api.locations.getAll()
            ]);

            const today = new Date().toISOString().split('T')[0];
            const newToday = inquiries.filter(i => i.date.split('T')[0] === today).length;

            setStats({
                totalInquiries: inquiries.length,
                newInquiries: newToday,
                totalLocations: locations.length
            });
        };
        fetchStats();
    }, [activeSection, isAuthChecked]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        navigate('/');
    };

    // Don't render anything until authentication is verified
    if (!isAuthChecked) {
        return null;
    }

    return (
        <div className="admin-layout">
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''} `}>
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                    <button className="close-sidebar mobile-only" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <button className={`nav-item ${activeSection === 'overview' ? 'active' : ''} `} onClick={() => { setActiveSection('overview'); setSidebarOpen(false); }}>
                        <BarChart3 size={20} /> Overview
                    </button>
                    <button className={`nav-item ${activeSection === 'inquiries' ? 'active' : ''} `} onClick={() => { setActiveSection('inquiries'); setSidebarOpen(false); }}>
                        <Bell size={20} /> Inquiries
                    </button>
                    <button className={`nav-item ${activeSection === 'advertisers' ? 'active' : ''} `} onClick={() => { setActiveSection('advertisers'); setSidebarOpen(false); }}>
                        <Users size={20} /> Advertisers
                    </button>
                    <button className={`nav-item ${activeSection === 'locations' ? 'active' : ''} `} onClick={() => { setActiveSection('locations'); setSidebarOpen(false); }}>
                        <MapPin size={20} /> Locations
                    </button>
                    <button className={`nav-item ${activeSection === 'settings' ? 'active' : ''} `} onClick={() => { setActiveSection('settings'); setSidebarOpen(false); }}>
                        <Settings size={20} /> Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout" onClick={handleLogout}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <button className="menu-btn mobile-only" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <h2>Dashboard / {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
                    </div>

                    <div className="header-actions">
                        <button className="view-site-btn" onClick={() => navigate('/')}>
                            <ExternalLink size={18} /> <span className="desktop-only">View Site</span>
                        </button>
                        <button className="notif-btn" onClick={() => setActiveSection('inquiries')}>
                            <Bell size={20} />
                            {stats.newInquiries > 0 && <span className="badge">{stats.newInquiries}</span>}
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {activeSection === 'overview' && (
                        <div className="dashboard-grid">
                            <div className="dash-card">
                                <h3>Total Inquiries</h3>
                                <p className="large-stat">{stats.totalInquiries}</p>
                                <span className={`trend ${stats.newInquiries > 0 ? 'positive' : 'neutral'}`}>
                                    {stats.newInquiries} new today
                                </span>
                            </div>
                            <div className="dash-card">
                                <h3>Live Impressions</h3>
                                <p className="large-stat">{(stats.totalLocations * 1250).toLocaleString()}</p>
                                <span className="trend positive">+{(stats.totalLocations * 5)}% this week</span>
                            </div>
                            <div className="dash-card">
                                <h3>Live Locations</h3>
                                <p className="large-stat">{stats.totalLocations}</p>
                                <span className="trend positive">Active on map</span>
                            </div>
                            <div className="dash-card">
                                <h3>Revenue (Est)</h3>
                                <p className="large-stat">PKR {(stats.totalInquiries * 15000).toLocaleString()}</p>
                                <span className="trend positive">Based on leads</span>
                            </div>
                        </div>
                    )}

                    {activeSection === 'inquiries' && (
                        <div className="inquiries-container">
                            <div className="section-header">
                                <h3>All Partnership Inquiries</h3>
                            </div>
                            <InquiriesList />
                        </div>
                    )}

                    {activeSection === 'advertisers' && (
                        <div className="inquiries-container">
                            <AdvertisersList />
                        </div>
                    )}

                    {activeSection === 'locations' && (
                        <div className="inquiries-container">
                            <LocationsList />
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div className="settings-container">
                            <SettingsForm />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
