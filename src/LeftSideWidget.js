import React from 'react';
import ListWidget from './ListWidget.js';
import locationOptions from './Data.js';
import Graph from './Graph.js';
import Thread from './Thread.js';

class LeftSideWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            selectedLocation: locationOptions[0],
            selectedIndex: null,
            startLocation: ''
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
        //console.log("selectedLocation: " + location);
        if (location && location !== this.state.startLocation) {
            //this.setState(prevState => ({
              //  schedule: [...prevState.schedule, prevState.selectedLocation]
            //}), () => {
            this.listWidgetRef.current.add(location);
                //console.log("This is the add method schedule : " + this.state.schedule);
            //});
        }
    }

    deleteRow = () => {

       //const delSelected = this.listWidgetRef.current.state.selected;

       //console.log("delSelected : " + delSelected);
       //if(delSelected){
        console.log("we're inside leftside delete method");
        this.listWidgetRef.current.delete();
        
        //this.setState((prevState) => ({
          //  schedule: prevState.schedule.filter((element) => JSON.stringify(element) !== JSON.stringify(delSelected)),
          //}));
       //}
        //console.log("This is the delete method schedule : " + this.state.schedule);
    }

    clearTable = () => {
        this.setState({ schedule: [] }, () => {
            //console.log("schedule within clear method: " + this.state.schedule);
            this.listWidgetRef.current.clear();
        });
    }

    runAlgorithm = () => {
        if (!this.state.schedule.length) {
            console.log("Please add items to your schedule");
            return;
        }

        const thread = new Thread(this.graph.optimize_schedule(), 
        [this.state.startLocation, this.state.schedule]);

        thread.setOnFinish(result => {
            console.log('Thread finished with result:', result);
            this.onTaskCompleted();
        });

        thread.run(); 
    }

    onTaskCompleted = () => {
        console.log("The algorithm has finished running");
    }

    selectItem = (index) => {
        this.setState({ selectedIndex: index });
    }
    /*
    componentDidUpdate(prevProps, prevState) {
        if (prevState.schedule !== this.state.schedule) {
            console.log("This is the updated schedule: " + this.state.schedule);
        }
    }
    */

    
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
                    <ListWidget ref={this.listWidgetRef} items={this.state.schedule} onSelect={this.selectItem} selectedIndex={this.state.selectedIndex} />
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
