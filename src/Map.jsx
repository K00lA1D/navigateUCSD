import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';
import './style/AzureMap.css';

// Define CSS for the pulsing animation
const pulseStyle = document.createElement('style');
pulseStyle.type = 'text/css';
pulseStyle.innerHTML = `
.pulseIcon {
display: block;
width: 10px;
height: 10px;
border-radius: 50%;
background: orange;
border: 2px solid white;
cursor: pointer;
box-shadow: 0 0 0 rgba(0, 204, 255, 0.4);
animation: pulse 3s infinite;
}
.pulseIcon:hover {
animation: none;
}
@keyframes pulse {
0% {
box-shadow: 0 0 0 0 rgba(0, 204, 255, 0.4);
}
70% {
box-shadow: 0 0 0 50px rgba(0, 204, 255, 0);
}
100% {
box-shadow: 0 0 0 0 rgba(0, 204, 255, 0);
}
}
`;
document.head.appendChild(pulseStyle);

const AzureMap = forwardRef(({ subscriptionKey }, ref) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const animationRef = useRef(null); // Ref to store the animation
    const routeLayerRef = useRef(null);
    const movingMarkerRef = useRef(null);
    const pulseMarkersRef = useRef([]); // Ref to store pulsating markers


    // Points array
    const points = [
        { position: [-117.240843791937, 32.8756844350981], name: 'Revelle College', type: ["College"] },
        { position: [-117.23281088454, 32.8825866510293], name: 'Warren College', type: ["College"] },
        { position: [-117.241001307279, 32.8787288659333], name: 'Muir College', type: ["College"] },
        { position: [-117.242257615978, 32.8860562258214], name: 'Eleanor Roosevelt College', type: ["College"] },
        { position: [-117.242012888238, 32.8834506082528], name: 'Marshall College', type: ["College"] },
        { position: [-117.24144468769, 32.8808632553821], name: 'Sixth College', type: ["College"] },
        { position: [-117.241654333717, 32.8881059140197], name: 'Seventh College', type: ["College"] },
        { position: [-117.241884691389, 32.8722111492467], name: 'Eighth College', type: ["College"] },
        { position: [-117.240476244813, 32.8851040736188], name: 'RIMAC', type: ["Gym"] },
        { position: [-117.241244984452, 32.8771782863005], name: 'Main Gym', type: ["Gym"] },
        { position: [-117.231787044813, 32.8804446824681], name: 'Canyon View Center', type: ["Gym"] },
        { position: [-117.242563273649, 32.8860762214279], name: 'Cafe Ventanas', type: ["Food"] },
        { position: [-117.242745344813, 32.8830496144318], name: 'Ocean View Terrace', type: ["Food"] },
        { position: [-117.242473487142, 32.878763553017], name: 'Pines', type: ["Food"] },
        { position: [-117.242034102485, 32.874745873623], name: '64 Degrees', type: ["Food"] },
        { position: [-117.237555173649, 32.8810649434171], name: 'Geisel', type: ["Study"] },
        { position: [-117.233480587142, 32.8817645336355], name: 'CSE Building', type: ["Study"] },
        { position: [-117.236180645588, 32.8797142976572], name: 'Price Center', type: ["Food", "Study"] },
        { position: [-117.237385432813, 32.8775377778697], name: 'Center Hall', type: ['Lecture Hall'] },
        { position: [-117.239934429909, 32.8742273689528], name: 'York Hall', type: ['Lecture Hall'] },
        { position: [-117.240968933688, 32.8737011830541], name: 'Galbraith Hall', type: ['Lecture Hall'] },
        { position: [-117.233755823076, 32.8783669920803], name: 'Pepper Canyon Hall', type: ['Lecture Hall'] },
        { position: [-117.239160973649, 32.8843355152156], name: 'SuperComputer Center', type: ['Study', 'Other'] },
        { position: [-117.24178003754, 32.8869401384703], name: 'Rady School', type: ['Lecture Hall'] },
        { position: [-117.240450256902, 32.8839510430299], name: 'Social Sciences Building', type: ['Lecture Hall'] },
        { position: [-117.23492826943, 32.8834472279301], name: 'Franklin Antonio Hall', type: ['Lecture Hall', 'Study', 'Research', 'Food'] },
        { position: [-117.239598866585, 32.8805880659762], name: 'Cognitive Science Building', type: ['Lecture Hall'] },
        { position: [-117.239433702485, 32.8778456944162], name: 'Mandeville Auditorium', type: ['Lecture Hall', 'Other'] },
        { position: [-117.235494602485, 32.8815225235185], name: 'Jacobs School', type: ['Hall'] }, //come back
        { position: [-117.234311902485, 32.880484022991], name: 'Warren Lecture Hall', type: ['Lecture Hall'] },
        { position: [-117.23792917223055, 32.87838427811532], name: 'Career Services Center', type: ['Other'] },
        { position: [-117.23802779031297, 32.87938577957266], name: 'Student Health and Wellness Center', type: ['Other'] },
        { position: [-117.2343682017964, 32.88162141525942], name: 'Powell-Focht Bioengineering Hall', type: ['Research'] },
        { position: [-117.23481451797356, 32.88239788841124], name: 'Atkinson Hall', type: ['Lecture Hall'] },
        { position: [-117.24307517593122, 32.880661536301524], name: 'Kaleidoscope', type: ['Residential Hall'] },
        { position: [-117.24109787414523, 32.88068104724992], name: 'Social Sciences Public Engagement Building', type: ['Other'] }, //come back
        { position: [-117.24107355780056, 32.88018997890346], name: 'School of Arts and Humanities at UC San Diego', type: ['Hall'] }, //come back
        { position: [-117.24158693146595, 32.874624327096264], name: 'Argo Hall', type: ['Residential Hall'] },
        { position: [-117.24167226461945, 32.87494418230868], name: 'Blake Hall', type: ['Residential Hall'] },
        { position: [-117.24239483014155, 32.87600452709638], name: 'Pacific Hall', type: ['Research', 'Lecture Hall'] },
        { position: [-117.24157935594253, 32.87570681888155], name: 'Urey Hall', type: ['Research', 'Lecture Hall'] },
        { position: [-117.2416946934468, 32.87635629642768], name: 'Tata Hall', type: ['Lecture Hall', 'Research'] },
        { position: [-117.2402775840955, 32.87617543918983], name: 'Bonner Hall', type: ['Research'] },
        { position: [-117.2433877689432, 32.87901965343833], name: 'Tioga Hall', type: ['Residential Hall'] },
        { position: [-117.24285896947362, 32.87941057099127], name: 'Tenaya Hall', type: ['Residential Hall'] },
        { position: [-117.24200747281127, 32.87900041961934], name: 'McGill Hall', type: ['Research'] },
        { position: [-117.24121931417284, 32.87994397894231], name: 'The Jeannie Hall', type: ['Lecture Hall'] },
        { position: [-117.24032854403427, 32.87995410323504], name: 'Peterson Hall', type: ['Lecture Hall'] },
        { position: [-117.23398784433655, 32.87924665868274], name: 'Visual Arts Center', type: ['Hall'] }, //come back
        { position: [-117.23235812992175, 32.88478133456401], name: 'Harlan Hall', type: ['Residential Hall'] },
        { position: [-117.2324753532093, 32.884154610792706], name: 'Stewart Hall', type: ['Residential Hall'] },
        { position: [-117.23229554286048, 32.88345211221292], name: 'Brown Hall', type: ['Residential Hall'] },
        { position: [-117.23296891386579, 32.883247475296166], name: 'Douglas Hall', type: ['Residential Hall'] },
        { position: [-117.2338796312001, 32.883101460373446], name: 'Goldberg Hall', type: ['Residential Hall'] },
        { position: [-117.23260239118915, 32.8821801936049], name: 'Black Hall', type: ['Residential Hall'] },
        { position: [-117.2330710150058, 32.879237066853634], name: 'Epstein Family Amphitheater', type: ['Other'] },
        { position: [-117.2417092678867, 32.88325510651142], name: 'Thurgood Marshall College Upper Apartments', type: ['Residential Hall'] },
        { position: [-117.24266780666245, 32.88296613579227], name: 'Thurgood Marshall Residence Halls', type: ['Residential Hall'] },
        { position: [-117.2418521923228, 32.884606414792685], name: 'Cuzco House', type: ['Residential Hall'] },
        { position: [-117.24178853912095, 32.88428527016666], name: 'Asante Hall', type: ['Residential Hall'] },
        { position: [-117.2421686592056, 32.8840157309255], name: 'International House', type: ['Residential Hall'] },
        { position: [-117.24206528776362, 32.88553557967593], name: 'Geneva Hall', type: ['Residential Hall'] },
        { position: [-117.24255959056909, 32.885652608819306], name: 'Middle East Hall', type: ['Residential Hall'] },
        { position: [-117.24282993893044, 32.8856383327211], name: 'Earth Hall North', type: ['Residential Hall'] },
        { position: [-117.24282417128262, 32.884994071668345], name: 'Earth Hall South', type: ['Residential Hall'] },
        { position: [-117.24272176201585, 32.8841959354872], name: 'Pangea Parking', type: ['Parking'] },
        { position: [-117.24347901421082, 32.88613110949712], name: 'Africa Hall', type: ['Residential Hall'] },
        { position: [-117.24348008143913, 32.88577371709709], name: 'Asia Hall', type: ['Residential Hall'] },
        { position: [-117.24347464099401, 32.88542531900868], name: 'Europe Hall', type: ['Residential Hall'] },
        { position: [-117.24339611505867, 32.885091287325274], name: 'Latin America Hall', type: ['Residential Hall'] },
        { position: [-117.24340433564154, 32.88474042332827], name: 'North America Hall', type: ['Residential Hall'] },
        { position: [-117.23940265520766, 32.88374744137705], name: 'Hopkins Parking', type: ['Parking'] },
        { position: [-117.24046195621543, 32.88576205283451], name: 'Ridgewalk Social', type: ['Food'] },
        { position: [-117.24046109710432, 32.885762339762856], name: 'Shake Smart', type: ['Food'] },
        { position: [-117.2422731626408, 32.88859006948903], name: 'Seventh College West Building 1', type: ['Residential Hall'] },
        { position: [-117.2425416104787, 32.88804569390029], name: 'Seventh College West Building 2', type: ['Residential Hall'] },
        { position: [-117.24271702776366, 32.88742019133641], name: 'Seventh College West Building 3', type: ['Residential Hall'] },
        { position: [-117.24307171879236, 32.887449657180234], name: 'Seventh College West Building 4', type: ['Residential Hall'] },
        { position: [-117.24328583205404, 32.887525218892286], name: 'Seventh College West Building 5', type: ['Residential Hall'] },
        { position: [-117.24313578933315, 32.8880629350538], name: 'Seventh College West Building 6', type: ['Residential Hall'] },
        { position: [-117.24284802604721, 32.88812218447321], name: 'Seventh College West Building 7', type: ['Residential Hall'] },
        { position: [-117.24277499841574, 32.888656350030345], name: 'Seventh College West Building 8', type: ['Residential Hall'] },
        { position: [-117.23980054829352, 32.880884594910206], name: 'Solis Hall', type: ['Lecture Hall'] },
        { position: [-117.24169203542854, 32.87387561405933], name: 'Galathea Hall', type: ['Residential Hall'] },
        { position: [-117.24194828312736, 32.87380339303345], name: 'Meteor Hall', type: ['Residential Hall'] },
        { position: [-117.24243946283988, 32.873847059286234], name: 'Atlantis Hall', type: ['Residential Hall'] },
        { position: [-117.24198157575982, 32.8740423678474], name: 'Discovery Hall', type: ['Residential Hall'] },
        { position: [-117.24233495025749, 32.874124874955115], name: 'Challenger Hall', type: ['Residential Hall'] },
        { position: [-117.24318959309997, 32.87823411111004], name: 'Tuolumne Apartments', type: ['Residential Hall'] },
        { position: [-117.24250305492615, 32.8782567784797], name: 'Tamarack Apartments', type: ['Residential Hall'] },
    ];

    useImperativeHandle(ref, () => ({
        toggleMarkersByType: (type) => {
            markers.forEach(marker => {
                const isVisible = marker.types.includes(type);
                marker.setOptions({ visible: isVisible });
            });
        },
        animateRoute: async (mappedPositions, transportMode) => {

            console.log("mapped positions: " + mappedPositions);
            // Accept transportMode as a parameter
            clearRouteAndMarker(); // Clear existing route and marker

            const route = await fetchRoute(mappedPositions, subscriptionKey, transportMode); // Pass transportMode

            if (!route || route.length === 0) {
                console.error("Unable to animate route due to missing or empty route data.");
                return;
            }

            const dataSource = new atlas.source.DataSource();
            map.sources.add(dataSource);
            const line = new atlas.data.LineString(route);
            const lineFeature = new atlas.data.Feature(line, {});
            dataSource.add(lineFeature);

            const lineLayer = new atlas.layer.LineLayer(dataSource, null, {
                strokeColor: '#4bbafc',
                strokeWidth: 3,
            });
            map.layers.add(lineLayer);
            routeLayerRef.current = { dataSource, lineLayer };

            // Add pulsing markers at each mapped position
            mappedPositions.forEach((point, index) => {
                const pulseMarker = new atlas.HtmlMarker({
                    htmlContent: '<div class="pulseIcon"></div>',
                    position: point,
                    anchor: 'center',
                });
                map.markers.add(pulseMarker);
                pulseMarkersRef.current.push(pulseMarker); // Store marker reference
            });

            const movingMarker = new atlas.HtmlMarker({
                htmlContent: '<div style="color: yellow; font-size: 22px; "> ● </div>',
                position: route[0],
                anchor: 'center',
            });
            map.markers.add(movingMarker);
            movingMarkerRef.current = movingMarker;

            let i = 0;
            animationRef.current = setInterval(() => {
                if (i < route.length) {
                    movingMarker.setOptions({ position: route[i] });
                    map.setCamera({ center: route[i], zoom: 15 });
                    i++;
                } else {
                    clearInterval(animationRef.current);
                }
            }, 100);
        },
    }));


    const clearRouteAndMarker = () => {
        if (routeLayerRef.current) {
            map.layers.remove(routeLayerRef.current.lineLayer);
            map.sources.remove(routeLayerRef.current.dataSource);
            routeLayerRef.current = null;
        }
        if (movingMarkerRef.current) {
            map.markers.remove(movingMarkerRef.current);
            movingMarkerRef.current = null;
        }
        if (animationRef.current) {
            clearInterval(animationRef.current);
            animationRef.current = null;
        }
        if (pulseMarkersRef.current.length > 0) {
            pulseMarkersRef.current.forEach(marker => map.markers.remove(marker));
            pulseMarkersRef.current = [];
        }
    };


    useEffect(() => {
        if (!map) {
            const newMap = new atlas.Map(mapRef.current, {
                authOptions: {
                    authType: atlas.AuthenticationType.subscriptionKey,
                    subscriptionKey: subscriptionKey
                },
                center: [-117.241884691389, 32.8808632553821],
                zoom: 15,
                view: 'Auto'
            });
            setMap(newMap);
            newMap.controls.add([
                new atlas.control.ZoomControl(),
                new atlas.control.CompassControl(),
                new atlas.control.PitchControl(),
                new atlas.control.StyleControl()
            ], {
                position: "top-right"
            });

            newMap.events.add('ready', () => {
                setMap(newMap);
                const newMarkers = points.map(point => {
                    const popup = new atlas.Popup({
                        content: `<div class="custom-popup">${point.name}</div>`,
                        pixelOffset: [0, -25]
                    });

                    const marker = new atlas.HtmlMarker({
                        color: 'DodgerBlue',
                        text: '📍',
                        position: point.position,
                        visible: false // Start with all markers hidden
                    });
                    marker.types = point.type; // Attach the types array to the marker
                    newMap.markers.add(marker);
                    marker.popup = popup; // Store popup directly on marker for easy access

                    newMap.events.add('click', marker, () => {
                        popup.open(newMap, marker.getOptions().position);
                    });

                    newMap.events.add('mouseover', marker, () => {
                        popup.setOptions({ position: point.position });
                        popup.open(newMap);
                    });

                    newMap.events.add('mouseout', marker, () => {
                        popup.close();
                    });

                    return marker;
                });

                setMarkers(newMarkers);
            });

            setMap(newMap);
        }

        return () => {
            if (animationRef.current) {
                clearInterval(animationRef.current); // Clear the animation interval on cleanup
            }
        };
    }, [subscriptionKey]); // Run on initial mount and when subscriptionKey changes


    const fetchRoute = async (positions, subscriptionKey, transportMode) => {
        try {
            const waypoints = positions.map(p => `${p[1]},${p[0]}`).join(':');
            const url = `https://atlas.microsoft.com/route/directions/json?api-version=1.0&subscription-key=${subscriptionKey}&query=${waypoints}&travelMode=${transportMode === 'walk' ? 'pedestrian' : transportMode}`;
            const response = await fetch(url);
            const data = await response.json();

            // Validate the data structure
            if (data.routes && data.routes.length > 0 && data.routes[0].legs && data.routes[0].legs.length > 0) {
                return data.routes[0].legs.flatMap(leg => leg.points.map(p => [p.longitude, p.latitude]));
            } else {
                console.error("No valid route found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching route:", error);
            return null;
        }
    };




    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
});

export default AzureMap;