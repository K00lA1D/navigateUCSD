import React, { useState, useRef, useEffect } from 'react';
import ListWidget from './ListWidget.js';
import {locationOptions, types } from './Data.js';
import './style/LeftSideWidget.css'

function LeftSideWidget({ toggleMarkersByType }) {
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
    const [startLocation, setStartLocation] = useState(locationOptions[0]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayAction, setOverlayAction] = useState(''); // 'add' or 'edit'
    const listWidgetRef = useRef();

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleStartLocationChange = (event) => {
        setStartLocation(event.target.value);
    }

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        toggleMarkersByType(event.target.value);
    }

    const toggleOverlay = (action) => {
        setShowOverlay(true);
        setOverlayAction(action);
    };

    const hideOverlay = () => {
        setShowOverlay(false);
        setOverlayAction('');
    };

    const Overlay = () => (
        <div className="Overlay">
            <h4>{overlayAction === 'add' ? 'Add Location' : 'Edit Location'}</h4>
            <select onChange={handleTypeChange} value={selectedType}>
                {types.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
            <button onClick={hideOverlay}>Back</button>
        </div>
    );

    return (
        <div className="LeftSideWidget">
            {showOverlay && <Overlay />}
            <div >
                <label>Start:</label>
                <select onChange={handleStartLocationChange} value={startLocation}>
                    {locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Schedule:</label>
                <ListWidget ref={listWidgetRef} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
            </div>
            <div>
                <button className= "" onClick={() => toggleOverlay('add')}>Add</button>
                <button className= "" onClick={() => toggleOverlay('edit')}>Edit</button>
                <button className= "" onClick={hideOverlay}>Delete</button>
                <button className= "" onClick={hideOverlay}>Clear</button>
                <button className= "" onClick={hideOverlay}>Run</button>
            </div>
        </div>
    );
}

export default LeftSideWidget;


