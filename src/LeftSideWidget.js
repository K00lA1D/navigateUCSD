import React, { useState, useRef, useEffect } from 'react';
import ListWidget from './ListWidget.js';
import locationOptions from './Data.js';
import Graph from './Graph.js';
import './style/LeftSideWidget.css'

function LeftSideWidget() {
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
    const [startLocation, setStartLocation] = useState(locationOptions[0]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayAction, setOverlayAction] = useState(''); // 'add' or 'edit'
    const listWidgetRef = useRef();
    const graph = useRef(new Graph());

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const toggleOverlay = (action) => {
        setShowOverlay(true);
        setOverlayAction(action);
    };

    const hideOverlay = () => {
        setShowOverlay(false);
        setOverlayAction('');
    };

    const Overlay = () => (
        <div className="overlay">
            <h4>{overlayAction === 'add' ? 'Add Location' : 'Edit Location'}</h4>
            <select onChange={handleLocationChange} value={selectedLocation}>
                {locationOptions.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
            <button onClick={hideOverlay}>Back</button>
        </div>
    );

    return (
        <div className="left-side-widget">
            {showOverlay && <Overlay />}
            <h3>LOCATIONS</h3>
            <select onChange={handleLocationChange} value={selectedLocation}>
                {locationOptions.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
            <div>
                <label>Schedule:</label>
                <ListWidget ref={listWidgetRef} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
            </div>
            <div>
                <label>Start:</label>
                <select onChange={handleLocationChange} value={startLocation}>
                    {locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={() => toggleOverlay('add')}>Add</button>
                <button onClick={() => toggleOverlay('edit')}>Edit</button>
                <button onClick={hideOverlay}>Delete</button>
                <button onClick={hideOverlay}>Clear</button>
                <button onClick={hideOverlay}>Run</button>
            </div>
        </div>
    );
}

export default LeftSideWidget;

// Add corresponding CSS for overlay styling and sliding effect
