import React from 'react';
import './style/ListWidget.css'

class ListWidget extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // Ensure it's properly bound

    this.state = {
      elements: [],
      selected: null,
      selectedtype: "",
      selectedIndex: -1,
    };
  }

  add = (item, type) => {
    this.setState((prevState) => ({
      elements: [...prevState.elements, [item, type]],
    }));

    this.clearSelections();
  };

  delete = () => {
    if(this.state.selectedIndex >= 0){
      this.setState(prevState => ({
        elements: prevState.elements.filter((_, i) => i !== prevState.selectedIndex),
        selected: null,
        selectedIndex: -1 // -1 is a more common convention for 'no selection'
      }));
    }
    else{
      console.log("Invalid index for delete operation");
    }
  };

  edit = (index, newItem, newType) => {
    if (index >= 0 && index < this.state.elements.length) {
      this.setState(prevState => ({
        elements: prevState.elements.map((item, i) => {
          if (i === index) {

            return [newItem, newType];
          } else {

            return item;
          }
        }),
        selected: [newItem, newType], 
        selectedIndex: index 
      }));
    } else {
      console.log('Invalid index for edit operation');
    }

    this.clearSelections();
  };

  clearSelections = () => {
    this.setState({
      selected: null,
      selectedtype: "",
      selectedIndex: -1,
    });
  }

  clear = () => {
    this.setState({
      elements: [],
    });
  };

  handleClick = (index) => {
  
    console.log("Something was clicked")
    const selectedItem = this.state.elements[index][0];
    const selectedType = this.state.elements[index][1];


    this.setState({
      selected: selectedItem,
      selectedType: selectedType,
      selectedIndex: index,
    });

    console.log("selectedItem : " + selectedItem);
    console.log("selectedType : " + selectedType);
    console.log("index : " + index);
    this.props.parentHandleClick(selectedItem, selectedType, index);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.elements !== this.state.elements) {
        console.log("Elements : ",this.state.elements);
    }
}

  render() {

    const selectedStyle = {
      backgroundColor: 'lightblue', // the color you want for the selection
    };

    return (
      <div className = "ListWidget">
        <ul>
          {this.state.elements.map(([location, type], index) => (
            <li key={index} 
            onClick={() => this.handleClick(index)}
            style={this.state.selectedIndex === index ? selectedStyle : null}>
              {location} - {type}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListWidget;
