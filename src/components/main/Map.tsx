"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {disasterPoints, stateColors} from "@/data/mapboxdummy";

mapboxgl.accessToken = 'pk.eyJ1IjoibXJmbHluIiwiYSI6ImNsd3YzOWswMDBhc3YyaXNheGc3aTRtdTcifQ.vqe0vVgE90a8B2CH9lYjUg';
const MainMap = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, _setLng] = useState(78.9629);
    const [lat, _setLat] = useState(20.5937);
    const [zoom, _setZoom] = useState(4.2);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng,lat],
            projection: 'mercator', // 'mercator' or 'geographic1
            zoom: zoom
        });
        map.current.on('load', () => {
            // Add state boundaries source
            map.current.addSource('state-boundaries', {
                'type': 'geojson',
                'data': 'india_state_geo.json' // Replace with the path to your GeoJSON file
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
            map.current.addSource('disaster-points', {
                'type': 'geojson',
                'data': disasterPoints
            });

            // Add disaster points layer
            map.current.addLayer({
                'id': 'disaster-points-layer',
                'type': 'symbol',
                'source': 'disaster-points',
                'layout': {
                    'icon-image': 'marker', // Icon used for points
                    'text-field': '{disaster}', // Display disaster type as label
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-offset': [0, 1.5],
                    'text-anchor': 'top'
                },
                'paint': {
                    'text-color': '#FF0000' // Color of the text
                }
            });
        });
    });
    return (
            <div ref={mapContainer} className="map-container w-full h-full" />
    )
}

export default MainMap;