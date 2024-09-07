"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, {LngLat} from 'mapbox-gl';
import {disasterPoints, stateColors} from "@/data/mapboxdummy";
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibXJmbHluIiwiYSI6ImNsd3YzOWswMDBhc3YyaXNheGc3aTRtdTcifQ.vqe0vVgE90a8B2CH9lYjUg';
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
            center: [lng,lat],
            projection: 'mercator', // 'mercator' or 'geographic1
            zoom: zoom,
            minZoom: 4
        });
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