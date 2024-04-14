import React from 'react';
import ListWidget from './ListWidget.js';
import locationOptions from './Data.js';
import Graph from './Graph.js';
//import Thread from './Thread.js';

class LeftSideWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: locationOptions[0],
            selectedIndex: null,
            startLocation: locationOptions[0]
        };
        this.listWidgetRef = React.createRef(); // Create the ref here
        this.graph = new Graph();
    }

    handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        if (selectedLocation !== this.state.startLocation) {
            this.setState({ selectedLocation });
        }
    }

    handleStartLocationChange = (event) => {
        this.setState({ startLocation: event.target.value });
    }

    addRow = () => {
        const location = this.state.selectedLocation;
        if (location && location !== this.state.startLocation) {
            this.listWidgetRef.current.add(location);
        }
    }

    deleteRow = () => {
        this.listWidgetRef.current.delete();
    }

    clearTable = () => {
        this.listWidgetRef.current.clear();
    }

    runAlgorithm = () => {
        if (!this.listWidgetRef.current.state.elements.length) {
            console.log("Please add items to your schedule");
            return;
        }
        fetch('http://localhost:3000/optimize_schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startLocation: this.state.startLocation,
                schedule: this.listWidgetRef.current.state.elements,
            }),
        })
        .then(response => response.json())
        /*
        .then(result => {
            console.log('Response:', result);
            console.log('Thread finished with result:', result);
            this.onTaskCompleted();
        })
        */
        .catch(error => console.error('Error:', error));
    }

    onTaskCompleted = () => {
        console.log("The algorithm has finished running");
    }

    selectItem = (index) => {
        this.setState({ selectedIndex: index });
    }
   
    render() {
        return (
            <div className="left-side-widget">
                <h3>LOCATIONS</h3>
                <select onChange={this.handleLocationChange} value={this.state.selectedLocation}>
                    {locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <div>
                    <label>Schedule:</label>
                    <ListWidget ref={this.listWidgetRef} onSelect={this.selectItem} selectedIndex={this.state.selectedIndex} />
                </div>
                <div>
                    <label>Start:</label>
                    <select onChange={this.handleStartLocationChange} value={this.state.startLocation}>
                        {locationOptions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={this.addRow}>Add</button>
                    <button onClick={this.deleteRow}>Delete</button>
                    <button onClick={this.clearTable}>Clear</button>
                    <button onClick={this.runAlgorithm}>Run</button>
                </div>
            </div>
        );
    }
}

export default LeftSideWidget;
