import React, { useState, useRef, useEffect } from 'react';
import ListWidget from './ListWidget.js';
import { locationOptions, types, locationsByType } from './Data.js';
import './style/LeftSideWidget.css'

function LeftSideWidget({ toggleMarkersByType, animateRoute }) {
    const [startLocation, setStartLocation] = useState(locationOptions[0]);
    const [locations, setLocations] = useState([]);
    const [mappedPositions, setMappedPositions] = useState([]); 
    const [focusedIndex, setFocusedIndex] = useState(-5);
    const [focusedType, setFocusedType] = useState('');
    const [focusedLocation, setFocusedLocation] = useState('');
  
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [transportMode, setTransportMode] = useState('car'); // Default to car
  
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayAction, setOverlayAction] = useState(''); // 'add' or 'edit'
  
    const [isOverlayAnimating, setIsOverlayAnimating] = useState(false);
  
    const listWidgetRef = useRef();

  const handleLocationChange = (event) => {
    setFocusedLocation(event.target.value);
  };

  const handleStartLocationChange = (event) => {
    const newStartLocation = event.target.value;
    setStartLocation(newStartLocation);
    listWidgetRef.current.updateStartLocation(newStartLocation); // Call ListWidget's method to update start location
};

const handleTransportModeChange = (event) => {
    setTransportMode(event.target.value);
  };

    const handlePositionsUpdate = (positions) => {
        setMappedPositions(positions);
    };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    console.log("new type : " + type);

    if (type === "") {
      setFocusedType(type);
      setFocusedLocation("");
    }
    else {
      setFocusedType(type);
      setFocusedLocation("");
      setLocations(locationsByType[type]);
      toggleMarkersByType(type);
    }
  }
  
  const handleRun = () => {
    animateRoute(mappedPositions, transportMode); // Pass the transport mode
  }

  const handleClearSelections = () => {
    setFocusedLocation('');
    setFocusedType('');
    setFocusedIndex(-1);
    listWidgetRef.current.clearSelections();
  }

  const parentHandleClick = (location, type, index) => {
    setFocusedLocation(location);
    setFocusedType(type);
    setFocusedIndex(index);
  };

  const handleShowOverlay = (action) => {
    console.log("focusedIndex : " + focusedIndex);
    if (action === 'add') {
      //console.log("were adding here");
      handleClearSelections();
    }
    else if (action === 'edit'){
      console.log("were editing here");
      console.log("focusedLocation : " + focusedLocation + 
    "\nfocusedType : " + focusedType + 
    "\nfocusedIndex : " + focusedIndex);
      setLocations(locationsByType[focusedType]);
      toggleMarkersByType(focusedType);
    }
    setIsVisible(false); 

    setTimeout(() => {
      setShowOverlay(true); 
      setOverlayAction(action);
      setIsOverlayAnimating(true);
    }, 250); 
  };

  const hideOverlay = () => {
    setIsOverlayAnimating(false); 
    handleClearSelections();
    toggleMarkersByType('');
    setTimeout(() => {
      setShowOverlay(false); 
      setIsVisible(true);
    }, 250); 
  };

  const addLocation = () => {
    if (focusedLocation === "") {
      console.log("Please select a location");
    }
    else {
      listWidgetRef.current.add(focusedLocation, focusedType);
      hideOverlay();
    }
  }

  const deleteLocation = () => {
    console.log("In the delete method")
    if (focusedLocation === "") {
      console.log("Please select an item to delete")
    }
    else {
      listWidgetRef.current.delete();
    }
    handleClearSelections();
  }

  const editLocation = () => {
    if(focusedLocation == ""){
      console.log("Please select a valid location before saving");
    }
    else{
      console.log("In the edit function")
      console.log("focusedIndex : " + focusedIndex);
      console.log("focusedType : " + focusedType);
      console.log("focusedLocation : " + focusedLocation);

      listWidgetRef.current.edit(focusedIndex, focusedLocation, focusedType);
      hideOverlay();
    }
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
            value={focusedType}
            onChange={handleTypeChange}
          >
            <option value="">Select a Type</option>
            {types.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={focusedLocation}
            onChange={handleLocationChange}
            disabled={!focusedType} // Disable if no type is selected
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
            value={focusedType}
            onChange={handleTypeChange}
          >
            <option value="">Select a Type</option>
            {types.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={focusedLocation}
            onChange={handleLocationChange}
            disabled={!focusedType} // Disable if no type is selected
          >
            <option value="">Select a Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <button onClick={editLocation}>Save Changes</button>
        </>
      )}

      <button onClick={hideOverlay}>Back</button>
    </div>
  );

  const widgetRef = useRef();
  const [isVisible, setIsVisible] = useState(false); // Start hidden

  useEffect(() => {
    // Delay the initial animation just enough to ensure the initial state is applied
    const timer = setTimeout(() => {
      if (widgetRef.current) {
        setIsVisible(true); // Animate the widget into view
      }
    }, 50); // A minimal timeout

    return () => clearTimeout(timer);
  }, []);

  const toggleVisibility = () => {
    // This toggles the visibility
    setIsVisible(!isVisible);
  };

  return (
    <div ref={widgetRef} className={`LeftSideWidget ${!isVisible ? 'hidden' : ''}`}>
      {showOverlay && <Overlay />}
      <h2 className="Header">NavigateUCSD</h2>
      <div className="List-Container">
        <div className="Control-Container">
          <div className="Start-Container">
            <label>Start:</label>
            <select onChange={handleStartLocationChange} value={startLocation}>
              {locationOptions.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="Transport-Container">
            <label>Mode:</label>
            <select onChange={handleTransportModeChange} value={transportMode}>
              <option value="car">Car</option>
              <option value="walk">Walk</option>
            </select>
          </div> 
        </div>
        <ListWidget
          parentHandleClick={parentHandleClick}
          ref={listWidgetRef}
          onSelect={setSelectedIndex}
          onPositionsUpdate={handlePositionsUpdate}
          selectedIndex={selectedIndex}
          startLocation={startLocation}
        />
      </div>
      <div>
        <button onClick={() => handleShowOverlay('add')}>Add</button>
        <button onClick={() => handleShowOverlay('edit')} disabled={focusedIndex < 0}>Edit</button>
        <button onClick={() => deleteLocation()} disabled={focusedIndex < 0}>Delete</button>
        <button onClick={clearLocations}>Clear</button>
        <button onClick={handleRun}>Run</button>
      </div>
      <div className="Toggle" onClick={toggleVisibility}>
      </div>
    </div>
  );
}

export default LeftSideWidget;