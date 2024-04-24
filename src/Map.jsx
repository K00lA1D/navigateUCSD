import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';
import './style/AzureMap.css';

const AzureMap = forwardRef(({ subscriptionKey }, ref) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const points = [
        { position: [-117.240843791937, 32.8756844350981], name: 'Revelle College', type: ["College"]},
        { position: [-117.23281088454, 32.8825866510293], name: 'Warren College', type: ["College"] },
        { position: [-117.241001307279, 32.8787288659333], name: 'Muir College', type: ["College"] },
        { position: [-117.242257615978, 32.8860562258214], name: 'Eleanor Roosevelt College', type: ["College"] },
        { position: [-117.242012888238, 32.8834506082528], name: 'Marshall College', type: ["College"] },
        { position: [-117.24144468769, 32.8808632553821], name: 'Sixth College', type: ["College"] },
        { position: [-117.241654333717, 32.8881059140197], name: 'Seventh College', type: ["College"] },
        { position: [-117.241884691389, 32.8722111492467], name: 'Eighth College', type: ["College"] },
        { position: [-117.240476244813, 32.8851040736188], name: 'RIMAC', type: ["Gym"] },
        { position: [-117.241244984452, 32.8771782863005], name: 'Main Gym', type: ["Gym"] },
        { position: [-117.231787044813, 32.8804446824681], name: 'Canyon View Center', type: ["Gym"]},
        { position: [-117.242563273649, 32.8860762214279], name: 'Cafe Ventanas', type: ["Food"]},
        { position: [-117.242745344813, 32.8830496144318], name: 'Ocean View Terrace', type: ["Food"] },
        { position: [-117.242473487142, 32.878763553017], name: 'Pines' , type: ["Food"]},
        { position: [-117.242034102485, 32.874745873623], name: '64 Degrees', type: ["Food"] },
        { position: [-117.237555173649, 32.8810649434171], name: 'Geisel', type: ["Study"] },
        { position: [-117.233480587142, 32.8817645336355], name: 'CSE Building', type: ["Study"] },
        { position: [-117.236180645588, 32.8797142976572], name: 'Price Center', type: ["Food", "Study"] },
        { position: [-117.237385432813, 32.8775377778697], name: 'Center Hall', type: ['Hall']},
        { position: [-117.239934429909, 32.8742273689528], name: 'York Hall', type: ['Hall']},
        { position: [-117.240968933688, 32.8737011830541], name: 'Galbraith Hall', type: ['Hall']},
        { position: [-117.233755823076, 32.8783669920803], name: 'Pepper Canyon Hall', type: ['Hall']},
        { position: [-117.239160973649, 32.8843355152156], name: 'SuperComputer Center', type: ['Study','Other']},
        { position: [-117.24178003754, 32.8869401384703], name: 'Rady School', type: ['Hall']},
        { position: [-117.240450256902, 32.8839510430299], name: 'Social Sciences Building', type: ['Hall']},
        { position: [-117.23492826943, 32.8834472279301], name: 'Franklin Antonio Hall', type: ['Hall']},
        { position: [-117.239598866585, 32.8805880659762], name: 'Cognitive Science Building', type: ['Hall']},
        { position: [-117.239433702485, 32.8778456944162], name: 'Mandeville Auditorium', type: ['Hall']},
        { position: [-117.235494602485, 32.8815225235185], name: 'Jacobs School', type: ['Hall']},
        { position: [-117.234311902485, 32.880484022991], name: 'Warren Lecture Hall', type: ['Hall']},
        { position: [ -117.23792917223055, 32.87838427811532], name: 'Career Services Center', type: ['Other']},
        { position: [-117.23802779031297, 32.87938577957266], name: 'Student Health and Wellness Center', type: ['Study','Other'] },
        { position: [-117.2343682017964, 32.88162141525942], name: 'Powell-Focht Bioengineering Hall', type: ['Hall']},
        { position: [-117.23481451797356, 32.88239788841124], name: 'Atkinson Hall', type: ['Hall']},
        { position: [-117.24307517593122, 32.880661536301524], name: 'Kaleidoscope', type: ['Hall', 'College']},
        { position: [-117.24109787414523, 32.88068104724992], name: 'Social Sciences Public Engagement Building', type: ['Other']},
        { position: [-117.24107355780056, 32.88018997890346], name: 'School of Arts and Humanities at UC San Diego', type: ['Hall']}
    ];

    useImperativeHandle(ref, () => ({
        toggleMarkersByType: (type) => {
            markers.forEach(marker => {
                const isVisible = marker.types.includes(type);
                marker.setOptions({ visible: isVisible });
            });
        }
    }));

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

            newMap.events.add('ready', () => {
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
            if (map) {
                map.dispose();
            }
        };
    }, [subscriptionKey]); // Only run on initial mount

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
});

export default AzureMap;
