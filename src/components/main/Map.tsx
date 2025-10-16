"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDisasterStore } from "@/zustand/useDisasterStore";
import { disasterPoints } from "@/data/mapboxdummy";
import { GridLoader } from "react-spinners";

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Fix Leaflet marker icons
if (typeof window !== 'undefined') {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

const MainMap = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const section = useDisasterStore((state) => state.section);
    const disasters = useDisasterStore((state) => state.disasters);
    const [mapLoadingState, setMapLoadingState] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
    const [mapZoom, setMapZoom] = useState(4);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => {
            setMapLoadingState(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Handle map updates when disaster changes
    useEffect(() => {
        if (section === 'disasters') {
            setMapCenter([20.5937, 78.9629]);
            setMapZoom(4);
            return;
        }

        console.log("Map responding to disaster change:", disaster.title, disaster.coordinates);
        if (!disaster.coordinates) {
            console.log("No coordinates found for disaster");
            return;
        }
        if (!disaster.coordinates.lng || !disaster.coordinates.lat) {
            console.log("Invalid coordinates:", disaster.coordinates);
            return;
        }

        setMapCenter([disaster.coordinates.lat, disaster.coordinates.lng]);
        setMapZoom(7);
    }, [disaster, section]);

    // Convert GeoJSON features to simple array for mapping (dummy data)
    const disasterMarkers = disasterPoints.features.map((feature, index) => ({
        id: `dummy-${index}`,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        type: feature.properties.disaster,
        title: `${feature.properties.disaster} Event`
    }));

    // Convert store disasters to markers (user-added reports)
    const userDisasterMarkers = disasters
        .filter(d => d.coordinates && d.coordinates.lat && d.coordinates.lng)
        .map((disaster, index) => ({
            id: `user-${disaster._id}`,
            lat: disaster.coordinates.lat,
            lng: disaster.coordinates.lng,
            type: disaster.disasterType,
            title: disaster.title,
            disaster: disaster
        }));

    // Combine all markers
    const allMarkers = [...disasterMarkers, ...userDisasterMarkers];

    if (!isClient) {
        return (
            <div className="w-full h-full relative">
                <div className="w-full h-full bg-gray-100 absolute z-20 flex flex-col justify-center gap-6 items-center">
                    <GridLoader
                        color={"#2e8bfd"}
                        loading={true}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <div className={"text-2xl text-blue-400"}>Loading Map</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <div className={`w-full h-full bg-gray-100 absolute z-20 ${mapLoadingState ? '' : 'hidden'} flex flex-col justify-center gap-6 items-center`}>
                <GridLoader
                    color={"#2e8bfd"}
                    loading={mapLoadingState}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <div className={"text-2xl text-blue-400"}>Loading Map</div>
            </div>
            
            <div className="w-full h-full absolute z-10">
                <MapContainer
                    key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`} // Force re-render when center/zoom changes
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%', zIndex: 1 }}
                    bounds={[[-10, 50], [40, 110]]}
                    minZoom={4}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    doubleClickZoom={true}
                    dragging={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={18}
                        minZoom={4}
                    />
                    
                    {/* Render all disaster markers */}
                    {allMarkers.map((point) => (
                        <Marker key={point.id} position={[point.lat, point.lng]}>
                            <Popup>
                                <div className="popup-content">
                                    <h3>{point.title}</h3>
                                    <p><strong>Type:</strong> {point.type}</p>
                                    <p><strong>Status:</strong> Ongoing</p>
                                    {point.disaster && (
                                        <>
                                            <p><strong>Time:</strong> {new Date(point.disaster.timestamp).toLocaleDateString()}</p>
                                            <p><strong>Location:</strong> {point.disaster.location}</p>
                                        </>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    
                    {/* Show selected disaster marker */}
                    {section === 'disasterinfo' && disaster.coordinates && disaster.coordinates.lat && disaster.coordinates.lng && (
                        <Marker position={[disaster.coordinates.lat, disaster.coordinates.lng]}>
                            <Popup>
                                <div className="popup-content">
                                    <h3>{disaster.title}</h3>
                                    <p><strong>Time:</strong> {new Date(disaster.timestamp).toLocaleDateString()}</p>
                                    <p><strong>Type:</strong> {disaster.disasterType.replace('_', ' ')}</p>
                                    <p><strong>Status:</strong> Ongoing</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default MainMap;