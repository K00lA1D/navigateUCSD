import React, { useEffect, useRef } from 'react';
import AzureMap from './Map.jsx'
import './style/RightSideWidget.css'


const RightSideWidget = ({ azureMapRef }) => {   

    const subscriptionKey = process.env.REACT_APP_AZURE_MAPS_SUBSCRIPTION_KEY;

    return (
        <div className="RightSideWidget" style={{ height: '100vh', width: '100%' }}>
            <AzureMap  ref={azureMapRef} subscriptionKey= {subscriptionKey} />
        </div>
    );
};

export default RightSideWidget;
