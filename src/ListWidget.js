import React from 'react';
import './style/ListWidget.css'
import { points } from './Data';

class ListWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      elements: [],
      selected: null,
      selectedtype: "",
      selectedIndex: -1,
      selectedLocations: [this.props.startLocation], 
      positions: [],
    };
  }

  getPositions = () => {
    return this.state.positions;
  };

  updatePositions = () => {
    const newPositions = this.state.selectedLocations.map((locationName) => {
      const point = points.find((p) => p.name === locationName);
      return point ? point.position : null;
    }).filter((position) => position !== null);
  
    this.setState({ positions: newPositions }, () => {
      console.log("Mapped Positions:", this.state.positions);
  
      if (this.props.onPositionsUpdate) {
        this.props.onPositionsUpdate(newPositions);
      }
    });
  };

  updateStartLocation = (newStartLocation) => {
    this.setState((prevState) => {
      const updatedLocations = [newStartLocation, ...prevState.selectedLocations.filter(loc => loc !== prevState.selectedLocations[0])];
      return {
        selectedLocations: updatedLocations,
      };
    }, this.updatePositions); 
  };

  add = (item, type) => {
    this.setState((prevState) => {
      const updatedElements = [...prevState.elements, [item, type]];
      const updatedLocations = [...prevState.selectedLocations, item];

      const startLocation = this.props.startLocation;
      if (!updatedLocations.includes(startLocation)) {
        updatedLocations.unshift(startLocation);
      }

      return {
        elements: updatedElements,
        selectedLocations: updatedLocations,
      };
    }, this.updatePositions); 
    this.clearSelections();
  };

  delete = () => {
    if (this.state.selectedIndex >= 0) {
      this.setState((prevState) => {
        const updatedElements = prevState.elements.filter((_, i) => i !== prevState.selectedIndex);
        const updatedLocations = prevState.selectedLocations.filter((_, i) => i !== prevState.selectedIndex);

        return {
          elements: updatedElements,
          selected: null,
          selectedIndex: -1,
          selectedLocations: updatedLocations,
        };
      }, this.updatePositions); 
    } else {
      console.log("Invalid index for delete operation");
    }
  };

  edit = (index, newItem, newType) => {
    if (index >= 0 && index < this.state.elements.length) {
      this.setState((prevState) => {
        const updatedElements = prevState.elements.map((item, i) => {
          return i === index ? [newItem, newType] : item;
        });

        const updatedLocations = prevState.selectedLocations.map((loc, i) =>
          i === index ? newItem : loc
        );

        return {
          elements: updatedElements,
          selected: [newItem, newType],
          selectedIndex: index,
          selectedLocations: updatedLocations,
        };
      }, this.updatePositions); 
    } else {
      console.log("Invalid index for edit operation");
    }

    this.clearSelections();
  };

  clearSelections = () => {
    this.setState({
      selected: null,
      selectedtype: "",
      selectedIndex: -1,
    });
  };

  clear = () => {
    this.setState({
      elements: [],
      selectedLocations: [this.props.startLocation], 
    }, this.updatePositions); 
  };

  handleClick = (index) => {
    const selectedItem = this.state.elements[index][0];
    const selectedType = this.state.elements[index][1];

    this.setState({
      selected: selectedItem,
      selectedType: selectedType,
      selectedIndex: index,
    });

    console.log("selectedItem : " + selectedItem + "\nselectedType  : " + selectedType +  "\nindex : " + index);
    this.props.parentHandleClick(selectedItem, selectedType, index);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startLocation !== this.props.startLocation) {
      this.setState((prevState) => {
        const updatedLocations = [this.props.startLocation, ...prevState.selectedLocations.filter(loc => loc !== this.props.startLocation)];
        return {
          selectedLocations: updatedLocations,
        };
      }, this.updatePositions); 
    }

    if (prevState.elements !== this.state.elements) {
      console.log("Elements:", this.state.elements);
      console.log("Selected Locations:", this.state.selectedLocations);
    }
  }

  render() {
    const selectedStyle = {
      backgroundColor: 'lightblue',
    };

    return (
      <div className="ListWidget">
        <ul>
          {this.state.elements.map(([location, type], index) => (
            <li
              key={index}
              onClick={() => this.handleClick(index)}
              style={this.state.selectedIndex === index ? selectedStyle : null}
            >
              {location} - {type}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListWidget;