import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LocationDetail.css';

// Import the same data structure
const WIFI_LOCATIONS = [
    {
        id: 1,
        name: "Allama Iqbal Town Campus, Karachi",
        address: "B-09 Block W Allama Iqbal Town paposhnagar (Pre-School)",
        contact: "021-36613835",
        email: "allama_iqbal.campus@educators.edu.pk",
        city: "Karachi",
        town: "North Nazimabad",
        province: "Sindh",
        lat: 24.9207,
        lng: 67.0827
    },
    {
        id: 2,
        name: "Allama Iqbal Town Campus, Karachi",
        address: "B-11, Block W, Allama Iqbal Town, Paposh Nagar, Karachi(primary-comprehensive)",
        contact: "021-36613835",
        email: "allama_iqbal.campus@educators.edu.pk",
        city: "Karachi",
        town: "North Nazimabad",
        province: "Sindh",
        lat: 24.9210,
        lng: 67.0830
    },
    {
        id: 3,
        name: "Arafat Town Campus",
        address: "Plot N0. LS 2-3-4-5-6-7-8, Arafat Town, Murghi Khana Stop Quaidabad, Karachi.",
        contact: "02135022415",
        email: "arafat.campus@educators.edu.pk",
        city: "Karachi",
        town: "Bin Qasim",
        province: "Sindh",
        lat: 24.8607,
        lng: 67.0011
    },
    {
        id: 4,
        name: "Arizona Campus, Karachi",
        address: "C-35, Sector 11-B, North Karachi.",
        contact: "02136978194",
        email: "arizona.campus@educators.edu.pk",
        city: "Karachi",
        town: "North Nazimabad",
        province: "Sindh",
        lat: 24.9856,
        lng: 67.0364
    },
    {
        id: 5,
        name: "Bahria Town Campus Karachi",
        address: "Plot ST-1, Bin Rahim Garden Society, adj. Bahria Town, Karachi",
        contact: "0331 234 0213",
        email: "bahria.campus@educators.edu.pk",
        city: "Karachi",
        town: "Bahria Town",
        province: "Sindh",
        lat: 24.8607,
        lng: 67.1011
    },
    {
        id: 6,
        name: "Baldia Town Campus II",
        address: "Plot # 449-452 Sector 5-J Chandni Chowk Baldia Town Karachi.",
        contact: "021-32816091",
        email: "baldia.campus@educators.edu.pk",
        city: "Karachi",
        town: "Baldia Town",
        province: "Sindh",
        lat: 24.9324,
        lng: 66.9890
    },
    {
        id: 7,
        name: "Gulberg Campus Lahore",
        address: "12-Main Boulevard, Gulberg III, Lahore",
        contact: "042-35712345",
        email: "gulberg.campus@educators.edu.pk",
        city: "Lahore",
        town: "Gulberg",
        province: "Punjab",
        lat: 31.5204,
        lng: 74.3587
    },
    {
        id: 8,
        name: "DHA Phase 6 Campus",
        address: "Sector H, DHA Phase 6, Lahore",
        contact: "042-37123456",
        email: "dha.campus@educators.edu.pk",
        city: "Lahore",
        town: "DHA",
        province: "Punjab",
        lat: 31.4697,
        lng: 74.4081
    },
    {
        id: 9,
        name: "F-10 Markaz Branch",
        address: "Street 10, F-10 Markaz, Islamabad",
        contact: "051-2233445",
        email: "f10.branch@educators.edu.pk",
        city: "Islamabad",
        town: "F-10",
        province: "Islamabad Capital Territory",
        lat: 33.6973,
        lng: 73.0169
    }
];

const LocationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const location = WIFI_LOCATIONS.find(loc => loc.id === parseInt(id || '0'));

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
                        <div className="org-name">F-G Free WiFi Location</div>
                        <h1 className="location-name">{location.name}</h1>

                        <div className="info-section">
                            <div className="info-item">
                                <strong>Address</strong>
                                <p>{location.address}</p>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
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
                            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=15&output=embed`}
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
