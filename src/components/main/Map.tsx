"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { disasterPoints, stateColors } from "@/data/mapboxdummy";
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibXJmbHluIiwiYSI6ImNsd3YzOWswMDBhc3YyaXNheGc3aTRtdTcifQ.vqe0vVgE90a8B2CH9lYjUg';

class RecenterControl {
    private _center: number[];
    private _zoom: number;
    private _map: any;

    constructor(options = {
        center: [78.9629, 20.5937],
        zoom: 4
    }) {
        this._center = options.center || [78.9629, 20.5937];
        this._zoom = options.zoom || 4;
    }

    onAdd(map: any) {
        this._map = map;

        // Create the container for the control
        const container = document.createElement('div');
        container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        // Create the button
        const button = document.createElement('button');
        button.className = 'mapboxgl-ctrl-button';
        button.textContent = 'Recenter';
        button.innerHTML = '<i style="color: black; display: flex; justify-content: center; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg></i>';

        // Add click event to the button
        button.addEventListener('click', () => {
            this._map.flyTo({
                center: this._center,
                zoom: this._zoom,
                essential: true,
                speed: 3
            });
        });

        // Append the button to the container
        container.appendChild(button);

        return container;
    }

    onRemove() {
        this._map = null;
    }
}

const MainMap = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, _setLng] = useState(78.9629);
    const [lat, _setLat] = useState(20.5937);
    const [zoom, _setZoom] = useState(4);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            projection: 'mercator', // 'mercator' or 'geographic1
            zoom: zoom,
            minZoom: 4
        });
        map.current.addControl(new mapboxgl.NavigationControl());
        map.current.addControl(new RecenterControl({
            center: [78.9629, 20.5937], // Default center [lng, lat]
            zoom: 4 // Default zoom level
        }));
        map.current.on('load', () => {
            // Add state boundaries source
            map.current.addSource('state-boundaries', {
                'type': 'geojson',
                'data': 'india_states1.json' // Replace with the path to your GeoJSON file
            });

            // Add state boundaries layer
            map.current.addLayer({
                'id': 'state-fill',
                'type': 'fill',
                'source': 'state-boundaries',
                'paint': {
                    'fill-color': [
                        'match',
                        ['get', 'NAME_1'], // Property name from GeoJSON that identifies the state
                        ...Object.entries(stateColors).flat(), // Flatten the stateColors object into an array of [stateName, color]
                        '#ffffff' // Default color if the state name does not match
                    ],
                    'fill-opacity': 0.5 // Faded effect
                }
            });

            // Add state boundaries layer
            map.current.addLayer({
                'id': 'state-boundaries-layer',
                'type': 'line',
                'source': 'state-boundaries',
                'layout': {},
                'paint': {
                    'line-color': '#686666', // Color of the state boundaries
                    'line-width': 1 // Width of the state boundaries
                }
            });

            // Add disaster points source
            disasterPoints.features.forEach(point => {
                // Create a marker
                const marker = new mapboxgl.Marker()
                    .setLngLat(new LngLat(point.geometry.coordinates[0], point.geometry.coordinates[1]))
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(point.properties.disaster))
                    .addTo(map.current);
            });
        });
    });
    return (
        <div ref={mapContainer} className="map-container w-full h-full" />
    )
}

export default MainMap;