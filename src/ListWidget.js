import React from 'react';

class ListWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      selected: null,
      selectedIndex: -5,
    };
  }

  add = (item) => {
    this.setState((prevState) => ({
      elements: [...prevState.elements, item],
    }));
  };

  delete = () => {
    if(this.state.selectedIndex >= 0){
      this.setState(prevState => ({
        elements: prevState.elements.filter((_, i) => i !== prevState.selectedIndex),
        selected: null,
        selectedIndex: -5
      }));
    }
  };

  clear = () => {
    this.setState({
      elements: [],
    });
  };

  handleClick = (index) => {
    console.log("Something was clicked")
    this.setState({
      selected: this.state.elements[index],
      selectedIndex: index,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.elements !== this.state.elements) {
        console.log("Elements: " + this.state.elements);
    }
}

  render() {

    const listWidgetStyle = {
      minHeight: '50vh',
      maxHeight: '50vh', // 50% of the viewport height
      overflowY: 'auto', // Add a scrollbar when content overflows  
      border: '1px solid #ccc', // Optional, adds a border for visual structure
      padding: '5px', // Optional, adds some spacing inside the div
    };

    const selectedStyle = {
      backgroundColor: 'lightblue', // the color you want for the selection
    };

    return (
      <div style={listWidgetStyle}>
        <ul>
          {this.state.elements.map((item, index) => (
            <li key={index} 
            onClick={() => this.handleClick(index)}
            style={this.state.selectedIndex === index ? selectedStyle : null}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListWidget;
