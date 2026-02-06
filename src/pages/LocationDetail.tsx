import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { api, type WifiLocation } from '../api';
import './LocationDetail.css';

const LocationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [location, setLocation] = useState<WifiLocation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);
            try {
                const locations = await api.locations.getAll();
                const foundLocation = locations.find(loc => loc.id === id);
                setLocation(foundLocation || null);
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocation(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLocation();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="location-detail-page">
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem', color: '#6b7280' }}>
                        <RefreshCw size={32} style={{ animation: 'spin 2s linear infinite' }} />
                        <p>Loading location details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="location-detail-page">
                <div className="container">
                    <h2>Location not found</h2>
                    <button onClick={() => navigate('/free-wifi-locations')} className="btn btn-primary">
                        Back to Locations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="location-detail-page">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    ← Back
                </button>

                <div className="detail-grid">
                    <div className="detail-info">
                        <div className="org-name">FG Free WiFi Location</div>
                        <h1 className="location-name">{location.name}</h1>

                        <div className="info-section">
                            <div className="info-item">
                                <strong>Address</strong>
                                <p>{location.address}</p>
                            </div>

                            <div className="info-item">
                                <strong>City</strong>
                                <p>{location.city}</p>
                            </div>

                            <div className="info-item">
                                <strong>Category</strong>
                                <p>{location.category}</p>
                            </div>

                            {location.contact && (
                                <div className="info-item">
                                    <strong>Contact</strong>
                                    <p>{location.contact}</p>
                                </div>
                            )}
                        </div>

                        <a
                            href={`https://www.google.com/maps/search/FG-FreeWifi+${encodeURIComponent(location.address + ', ' + location.city)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            🚶 Get Directions
                        </a>
                    </div>

                    <div className="detail-map">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(location.address + ', ' + location.city)}&hl=en&z=15&output=embed`}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetail;
