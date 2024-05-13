import React from 'react';
import LeftSideWidget from './LeftSideWidget';
import RightSideWidget from './RightSideWidget';
import './style/MainWindow.css';

const MainWindow = () => {  
    const azureMapRef = React.useRef();

    return (
      <div className="MainWindow">
        <div>
        <LeftSideWidget
  toggleMarkersByType={type => azureMapRef.current.toggleMarkersByType(type)}
  animateRoute={(mappedPositions, transportMode) => azureMapRef.current.animateRoute(mappedPositions, transportMode)}
/>

        </div>
        <div>
        <RightSideWidget azureMapRef={azureMapRef} />
        </div>
      </div>
    );
};


export default MainWindow;
