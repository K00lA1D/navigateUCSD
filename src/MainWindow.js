import React from 'react';
import SplitPane from 'react-split-pane';
import LeftSideWidget from './LeftSideWidget';
import RightSideWidget from './RightSideWidget';
import './style/MainWindow.css';

// If RightSideWidget needs to receive a ref, ensure you forward it correctly

const MainWindow = () => {
    const [minSizeLeft, setMinSizeLeft] = React.useState(300);
    const [maxSizeRight, setMaxSizeRight] = React.useState(window.innerWidth - 300);
  
    React.useEffect(() => {
      const handleResize = () => {
        setMinSizeLeft(window.innerWidth * 0.2);
        setMaxSizeRight(window.innerWidth * 0.4);
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
      /*
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
    */

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
