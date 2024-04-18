import React from 'react';
import SplitPane from 'react-split-pane';
import LeftSideWidget from './LeftSideWidget';
import RightSideWidget from './RightSideWidget';

const MainWindow = () => {
    const [minSizeLeft, setMinSizeLeft] = React.useState(300);
    const [maxSizeRight, setMaxSizeRight] = React.useState(window.innerWidth - 300);
  
    React.useEffect(() => {
      // Event handler to recalculate the minSize and maxSize on window resize
      const handleResize = () => {
        setMinSizeLeft(window.innerWidth * 0.2);
        setMaxSizeRight(window.innerWidth * 0.4);
      };
  
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
  
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div style={{ height: '100vh' }}>
        <SplitPane
          split="vertical"
          minSize={minSizeLeft}
          maxSize={maxSizeRight}
          defaultSize={parseInt(minSizeLeft, 10)}
          paneStyle={{ overflow: 'auto' }}
        >
          <div>
            <LeftSideWidget />
          </div>
          <div>
            <RightSideWidget />
          </div>
        </SplitPane>
      </div>
    );
  };
  
  export default MainWindow;
/*
class MainWindow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentSize: undefined,
      };
    }
  
    handleDrag = (newSize) => {
      // Get the window's width
      const windowWidth = window.innerWidth;
  
      // Calculate 30% and 60% of the window's width
      const minSize = windowWidth * 0.3;
      const maxSize = windowWidth * 0.6;
  
      // Restrict the size of the pane between 30% and 60% of the window's width
      if (newSize > minSize && newSize < maxSize) {
        this.setState({ currentSize: newSize });
      }
    }
  
    render() {
      // ... render logic
  
      return (
        <div className={styles.container}>
          <SplitPane
            split="vertical"
            minSize="30%"
            maxSize="60%"
            size={this.state.currentSize}
            onChange={size => this.handleDrag(size)}
            // If the SplitPane supports onDrag, use it; otherwise, use onChange
            // onDrag={size => this.handleDrag(size)}
          >
            <div><LeftSideWidget /></div>
            <div><RightSideWidget /></div>
          </SplitPane>
        </div>
      );
    }
  }
  
  export default MainWindow;
  */