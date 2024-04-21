import React from 'react';
import SplitPane from 'react-split-pane';
import LeftSideWidget from './LeftSideWidget';
import RightSideWidget from './RightSideWidget';
import './style/MainWindow.css'

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
      <div className="main-window">
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
