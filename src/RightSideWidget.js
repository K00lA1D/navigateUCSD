import React from 'react';
import './App.css'; // Make sure to adjust the path based on your project structure

class RightSideWidget extends React.Component {
    render() {
        return (
            <div className="right-side-widget">
                <iframe title="map-view" src="http://127.0.0.1:5000" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
            </div>
        );
    }
}


export default RightSideWidget;