"use client"
import React, {useRef, useEffect, useState} from 'react';
import mapboxgl, {LngLat, Map} from 'mapbox-gl';
import {disasterPoints, stateColors} from "@/data/mapboxdummy";
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';
import {data} from "@/data/dummy";
import {useDisasterStore} from "@/zustand/useDisasterStore";
import {RecenterControl} from "@/lib/MapboxControls";

mapboxgl.accessToken = 'pk.eyJ1IjoibXJmbHluIiwiYSI6ImNsd3YzOWswMDBhc3YyaXNheGc3aTRtdTcifQ.vqe0vVgE90a8B2CH9lYjUg';


const MainMap = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const section = useDisasterStore((state) => state.section);
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, _setLng] = useState(78.9629);
    const [lat, _setLat] = useState(20.5937);
    const [zoom, _setZoom] = useState(4);



    useEffect(() => {
        // (async () => {
        //     let modifiedData = [];
        //     for (const item of data) {
        //         try {
        //             const coords = await getCoordinates(item.location);
        //             console.log(`${item.title}:`, coords);
        //             modifiedData.push({...item, coordinates: coords})
        //         } catch (error) {
        //             console.error(`Error fetching coordinates for ${item.location}:`, error);
        //         }
        //     }
        //     console.log(modifiedData);
        // })();
        if (map.current) return; // initialize map only once
        const bounds = [
            [50, -10],   // Southwest coordinates [lng, lat] - extended far south and west
            [110, 40]    // Northeast coordinates [lng, lat] - extended far north and east
        ];
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            projection: 'mercator', // 'mercator' or 'geographic1
            zoom: zoom,
            maxBounds: bounds,
            minZoom: 4
        });

        map.current.addControl(new mapboxgl.NavigationControl());
        map.current.addControl(new RecenterControl({
            center: [78.9629, 20.5937], // Default center [lng, lat]
            zoom: 4 // Default zoom level
        }));
        map.current.on('load', () => {


            // Fit the map to the bounding box

            map.current.dragRotate.disable();
            map.current.touchZoomRotate.disableRotation();

            // Ensure map bearing remains fixed
            map.current.on('rotate', () => {
                map.current.rotateTo(0, { duration: 0 }); // Reset to 0 degrees
            });

            // Optional: Lock bearing on load
            map.current.rotateTo(0, { duration: 0 });
            // Add state boundaries source
            map.current.addSource('state-boundaries', {
                'type': 'geojson',
                'data': 'india_states1.json' // Replace with the path to your GeoJSON file
            });
            const layerId = 'state-label';

            // Check if the layer exists
            if (map.current.getLayer(layerId)) {
                // Update the layer's paint properties to change the label style
                map.current.setPaintProperty(layerId, 'text-color', 'black'); // Change text color to red
                map.current.setPaintProperty(layerId, 'text-opacity', 1); // Change text color to red
            } else {
                console.error(`Layer ${layerId} not found`);
            }
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
                    'fill-opacity': 0.3 // Faded effect
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
            data.forEach(point => {
                // Create a marker
                const marker = new mapboxgl.Marker()
                    .setLngLat(new LngLat(point.coordinates.lng, point.coordinates.lat))
                    .setPopup(new mapboxgl.Popup({offset: 25}).setText(point.title))
                    .addTo(map.current);
            });
        });
    });

    useEffect(() => {
        if (!map.current) return;
        if(section === 'disasters') {
            (map.current as Map).flyTo({
                center: [78.9629, 20.5937] ,
                zoom: 4,
                essential: true,
                speed: 3
            });
            return;
        }
        (map.current as Map).flyTo({
            center: [disaster.coordinates.lng, disaster.coordinates.lat],
            zoom: 7,
            essential: true,
            speed: 2
        });
    }, [disaster, section]);
    return (
        <div ref={mapContainer} className="map-container w-full h-full"/>
    )
}

export default MainMap;