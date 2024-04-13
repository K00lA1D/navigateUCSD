
import React from 'react';
import Graph from './Graph.js'
import Thread from './Thread.js'

class ButtonPanel extends React.Component {

    constructor(props) {
        super(props);

        this.start = '';
        this.schedule = [];
        this.graph = new Graph();
        this.leftWidget = props.leftWidget;

    }

    addRow = () => {
        const selectedLocation = this.props.leftWidget.locationCombobox.value;
        
        if (selectedLocation) {
            this.schedule.push(selectedLocation);
            this.leftWidget.listWidget.add(selectedLocation);
        }
    }

    deleteRow = () => {

        const selectedIndex = this.leftWidget.listWidget.selected;
        
        if (selectedIndex !== -1) {
            
            this.schedule.splice(selectedIndex, 1);
            this.leftWidget.listWidget.delete(selectedIndex);

            console.log("this.schedule : ${this.schedule}");
        }
    }

    clearTable = () => {

        this.leftWidget.listWidget.clear(); //to be changed frontend

        this.schedule = []; //backend
        console.log("this.schedule : ${this.schedule}");
    }

    runAlgorithm = () => {

        this.start = this.props.leftWidget.startLocationBox.value;
        if (!this.schedule.length) {
            console.log("Please add items to your schedule");
            return;
        }

        const thread = new Thread(this.graph.optimize_schedule(), 
        [this.start, this.schedule]);

        thread.setOnFinish(result => {
            console.log('Thread finished with result:', result);
            this.onTaskCompleted();
        });

        thread.run(); 
    }

    onTaskCompleted = () => {
        console.log("The algorithm has finished running")
    }



    render() {
        return (
            <div className="left-side-widget">
                <h3>LOCATIONS</h3>
                <select ref={(ref) => this.locationCombobox = ref}> {/* Directly assign ref to class variable */}
                    {this.state.locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <ListWidget ref={(ref) => this.listWidgetRef = ref} /> {/* Optional: if you need to access ListWidget */}
                <div>
                    <label>Start:</label>
                    <select ref={(ref) => this.startLocationBox = ref}>
                        {this.state.locationOptions.map((location, index) => (
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


    render() {
        return (
            <div className="button-panel">
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

export default ButtonPanel;

