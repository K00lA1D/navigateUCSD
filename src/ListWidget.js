import React from 'react';
import './style/ListWidget.css'

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

    const selectedStyle = {
      backgroundColor: 'lightblue', // the color you want for the selection
    };

    return (
      <div className = "ListWidget">
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
