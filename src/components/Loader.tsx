import React from 'react';
import { Wifi } from 'lucide-react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader-visual">
                    <div className="loader-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>
                    <div className="loader-icon-wrapper">
                        <div className="wifi-wave"></div>
                        <div className="wifi-wave"></div>
                        <div className="wifi-wave"></div>
                        <Wifi size={52} className="loader-icon" />
                    </div>
                </div>
                <div className="loader-text">
                    <span className="loader-dot">Ads</span>
                    <span className="loader-dot">on</span>
                    <span className="loader-dot">WiFi</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
