import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Location {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
}

interface InteractiveMapProps {
    location: Location;
}

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '400px'
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ location }) => {
    const [showInfo, setShowInfo] = useState(true);
    const mapType = 'roadmap';

    const center = {
        lat: location.lat,
        lng: location.lng
    };

    const mapOptions = {
        mapTypeId: mapType,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: 2, // google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            position: 3, // google.maps.ControlPosition.TOP_LEFT
            mapTypeIds: ['roadmap', 'satellite']
        },
        zoomControl: true,
        zoomControlOptions: {
            position: 7 // google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControl: true,
        streetViewControlOptions: {
            position: 7 // google.maps.ControlPosition.RIGHT_CENTER
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 6 // google.maps.ControlPosition.RIGHT_TOP
        }
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={mapOptions}
            >
                <Marker
                    position={center}
                    onClick={() => setShowInfo(true)}
                />

                {showInfo && (
                    <InfoWindow
                        position={center}
                        onCloseClick={() => setShowInfo(false)}
                    >
                        <div style={{ maxWidth: '250px' }}>
                            <h3 style={{
                                margin: '0 0 8px 0',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#333'
                            }}>
                                {location.name}
                            </h3>
                            <p style={{
                                margin: 0,
                                fontSize: '12px',
                                color: '#666',
                                lineHeight: '1.4'
                            }}>
                                {location.address}
                            </p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default InteractiveMap;
