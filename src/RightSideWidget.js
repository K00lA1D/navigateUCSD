import React, { useEffect, useRef } from 'react';
import AzureMap from './Map.jsx'


const RightSideWidget = ({ azureMapRef }) => {   

    return (
        <div className="right-side-widget" style={{ height: '100vh', width: '100%' }}>
            <AzureMap  ref={azureMapRef} subscriptionKey="q6E90CxFS1bb3-MfR4m0rEnV7HD7cuSLd9TZGi75O64" />
        </div>
    );
};

export default RightSideWidget;
