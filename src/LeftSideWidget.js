import React, { useState, useRef, useEffect } from 'react';
import ListWidget from './ListWidget.js';
import {locationOptions, types, locationsByType } from './Data.js';
import './style/LeftSideWidget.css'

function LeftSideWidget({ toggleMarkersByType }) {
    const [startLocation, setStartLocation] = useState(locationOptions[0]);
    const [locations, setLocations] = useState([]);

    const [focusedIndex, setFocusedIndex] = useState('');
    const [focusedType, setFocusedType] = useState('');
    const [focusedLocation, setFocusedLocation] = useState('');

    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayAction, setOverlayAction] = useState(''); // 'add' or 'edit'

    const [isOverlayAnimating, setIsOverlayAnimating] = useState(false);

    const listWidgetRef = useRef();

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleStartLocationChange = (event) => {
        setStartLocation(event.target.value);
    }

    const handleTypeChange = (event) => {
        const type = event.target.value;
        if(type == ""){
            //console.log("This type is empty")
            setSelectedType(event.target.value);
            setSelectedLocation("");
        }
        else{
            setSelectedType(event.target.value);
            setLocations(locationsByType[event.target.value]);
            toggleMarkersByType(event.target.value); 
        }
    }

    const handleClearSelections = () => {
        setFocusedLocation('');
        setFocusedType('');
        setFocusedIndex(-1);
    }

    const parentHandleClick = (location, type, index) => {
        //console.log("location : " + location);
        //console.log("Type : " + type);
        //console.log("index : " + index);
        setFocusedLocation(location);
        setFocusedType(type);
        setFocusedIndex(index);
    };

    const handleShowOverlay = (action) => {
        //console.log("In the handleshowOverlay function")
        if(action == 'add'){
            console.log("were adding here");
            handleClearSelections();
        }
        setSelectedLocation(focusedLocation);
        setSelectedType(focusedType);
        setSelectedIndex(focusedIndex);

        setIsVisible(false); // Trigger the LeftSideWidget to slide out

        // Wait for the LeftSideWidget to finish sliding out
        setTimeout(() => {
            setShowOverlay(true); // Show overlay after LeftSideWidget hides
            setOverlayAction(action);
            setIsOverlayAnimating(true); // Start overlay slide-in animation
        }, 250); // Match this timeout to the transition duration of LeftSideWidget
    };

    const hideOverlay = () => {
        setIsOverlayAnimating(false); // Trigger overlay slide-out
        handleClearSelections();
        // Wait for the overlay to finish sliding out
        setTimeout(() => {
            setShowOverlay(false); // Hide overlay after animation
            setIsVisible(true); // Show LeftSideWidget after overlay hides
        }, 250); // Match this timeout to the transition duration of Overlay
    };

    const addLocation = () => {
        if(selectedLocation == ""){
            console.log("Please select a location");
        }
        else{
            listWidgetRef.current.add(selectedLocation, selectedType);
            hideOverlay();
        }
    }

    const deleteLocation = () => {

        console.log("In the delete method")
        if(focusedLocation == ""){
            console.log("Please select an item to delete")
        }
        else{
            listWidgetRef.current.delete();
        }
        setSelectedLocation('');
        setSelectedIndex(-1);
        setSelectedType('');
    }

    const editLocation = () => {
        console.log("In the edit function")
        console.log("focusedIndex : " + focusedIndex);
        console.log("selectedType : " + selectedType);
        console.log("selectedLocation : " + selectedLocation);

        listWidgetRef.current.edit(focusedIndex, selectedLocation, selectedType);
        hideOverlay();
    }

    const clearLocations = () => {
        listWidgetRef.current.clear();
    }

    const Overlay = () => (

        <div className={`Overlay ${isOverlayAnimating ? 'active' : ''}`}>
            <h4>{overlayAction === 'add' ? 'Add Location' : 'Edit Location'}</h4>

            {overlayAction === 'add' ? (
                <>
                <select 
                    value={selectedType}
                    onChange={handleTypeChange}  
                >
                    <option value="">Select a Type</option>
                    {types.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>

                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    disabled={!selectedType} // Disable if no type is selected
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                    ))}
                </select>

                <button onClick={addLocation}>Add</button>
                 </>
            ) : (
                <>
                <select 
                    value={selectedType}
                    onChange={handleTypeChange}  
                >
                    {types.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>

                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    disabled={!selectedType} // Disable if no type is selected
                >
                    {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                    ))}
                </select>
                    
                <button onClick={() => editLocation(selectedIndex, selectedLocation, selectedType)}>Save Changes</button>
                </>
            )}

            <button onClick={hideOverlay}>Back</button>
        </div>
    );

    const widgetRef = useRef();
    const [isVisible, setIsVisible] = useState(false); // Start hidden
    //const [widgetWidth, setWidgetWidth] = useState(0);

    useEffect(() => {
        // Delay the initial animation just enough to ensure the initial state is applied
        const timer = setTimeout(() => {
            if (widgetRef.current) {
                //setWidgetWidth(widgetRef.current.offsetWidth);
                setIsVisible(true); // Animate the widget into view
            }
        }, 50); // A minimal timeout
    
        return () => clearTimeout(timer);
    }, []);
    
    const toggleVisibility = () => {
        // This toggles the visibility
        setIsVisible(!isVisible);
        /*<div ref={widgetRef} className="LeftSideWidget" style={isVisible ? { transform: 'translateX(0)' } : {}}>*/
    };

    return (
        <div ref={widgetRef} className={`LeftSideWidget ${!isVisible ? 'hidden' : ''}`}>
            {showOverlay && <Overlay />}
            <h2 className="Header" >NavigateUCSD</h2>
            <div className="List-Container">
                <div className="Start-Container">
                    <label>Start:</label>
                    <select onChange={handleStartLocationChange} value={startLocation}>
                        {locationOptions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <ListWidget 
                    parentHandleClick={parentHandleClick}// Correctly passed as a prop
                    ref={listWidgetRef} 
                    onSelect={setSelectedIndex} 
                    selectedIndex={selectedIndex} />

            </div>

            <div>
                <button onClick={() => handleShowOverlay('add')}>Add</button>
                <button onClick={() => handleShowOverlay('edit')} disabled={focusedIndex < 0}>Edit</button>
                <button onClick={() => deleteLocation()} disabled={focusedIndex < 0}>Delete</button>
                <button onClick={clearLocations}>Clear</button>
                <button onClick={hideOverlay}>Run</button>
            </div>

            <div className="Toggle" onClick={toggleVisibility}>
                {/*isVisible ? "Hide" : "Show"*/}
                
            </div>
        </div>
    );
}

export default LeftSideWidget;


