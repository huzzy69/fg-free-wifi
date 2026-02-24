import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { api, type WifiLocation } from '../api';
import './FreeWifiLocations.css';

const FAMOUS_CITIES = [
    "Karachi"
];

const CATEGORIES = [
    "Shopping Venues",
    "Food & Beverages",
    "Education Sector",
    "Healthcare",
    "Cinemas",
    "Public Parks",
    "Museums",
    "On-Demand Internet",
    "On the Move"
];

const FreeWifiLocations: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>("Karachi");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [locations, setLocations] = useState<WifiLocation[]>([]);
    const [loading, setLoading] = useState(true);

    const cityRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            const data = await api.locations.getAll();
            setLocations(data);
            setLoading(false);
        };
        fetchLocations();
    }, []);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        setSelectedCategory(""); // Reset category when city changes
    };

    const handleCategoryMouseDown = (e: React.MouseEvent<HTMLSelectElement>) => {
        if (!selectedCity) {
            e.preventDefault();
            alert("Before selecting category please select city");
            cityRef.current?.focus();
        }
    };

    // Filter locations based on selection
    const filteredLocations = locations.filter(loc => {
        if (!selectedCity) return false;
        if (selectedCity !== "All Cities" && loc.city !== selectedCity) return false;
        if (selectedCategory && selectedCategory !== "All Categories" && loc.category !== selectedCategory) {
            return false;
        }
        return true;
    });

    return (
        <div className="free-wifi-page">
            <div className="container">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div className="title-area">
                        <h1 className="page-title" style={{ marginBottom: 0 }}>Show your ads on our Network.</h1>
                        <p className="page-subtitle" style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>Find high-speed, free internet access at your favorite spots across Karachi.</p>
                    </div>
                    <button className="view-map-btn" onClick={() => window.open('https://www.google.com/maps/search/FG-Free-Wifi/', '_blank')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                            <line x1="8" y1="2" x2="8" y2="18"></line>
                            <line x1="16" y1="6" x2="16" y2="22"></line>
                        </svg>
                        View All on Map
                    </button>
                </div>

                <div className="filter-container">
                    <div className="filter-group">
                        <label>Select City</label>
                        <select
                            ref={cityRef}
                            className="form-select"
                            value={selectedCity}
                            onChange={handleCityChange}
                        >
                            <option value="" disabled>Please select a city</option>
                            {FAMOUS_CITIES.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Select Category</label>
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            onMouseDown={handleCategoryMouseDown}
                        >
                            <option value="">Please select a category</option>
                            <option value="All Categories">All Categories</option>
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center p-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#6b7280' }}>
                        <RefreshCw size={32} style={{ animation: 'spin 2s linear infinite' }} />
                        <p>Updating locations...</p>
                    </div>
                ) : selectedCity && (
                    <div className="results-container mt-8">
                        <table className="wifi-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLocations.length > 0 ? (
                                    filteredLocations.map((loc, index) => (
                                        <tr key={index}>
                                            <td className="fw-500">{loc.name}</td>
                                            <td>{loc.address}</td>
                                            <td className="text-center">
                                                <Link to={`/location/${loc.id}`} className="location-icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#0066CC" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center p-4">No locations found in this area.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreeWifiLocations;
