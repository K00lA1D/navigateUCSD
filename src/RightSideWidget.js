import React, { useEffect, useRef } from 'react';
import AzureMap from './Map.jsx'


const RightSideWidget = (props) => {
    /*
    const mapRef = useRef(null);
    
    useEffect(() => {
        // Function to initialize the Azure Map
        const initializeMap = () => {
            // Ensure the map ref is valid and the map instance exists
            if (!mapRef.current || !mapRef.current.azureMap) return;

            // Get the map instance
            const map = mapRef.current.azureMap;

            // Here, add any additional setup or layers to the map as needed
            // For example, adding a data source or setting up event handlers
            const dataSource = new data.DataSource();
            map.sources.add(dataSource);

            // Example of adding a simple point to the map
            const point = new data.Point([-117.240476244813, 32.8851040736188]);
            const pointFeature = new data.Feature(point, {
                name: 'Example Location'
            });
            dataSource.add(pointFeature);
        };

        // Call the initialize function
        initializeMap();

        // Function to handle map resizing
        const resizeMap = () => {
            if (mapRef.current && mapRef.current.azureMap) {
                mapRef.current.azureMap.resize();
            }
        };

        // Setup event listener for window resizing
        window.addEventListener('resize', resizeMap);

        // Cleanup function for the useEffect hook
        return () => {
            window.removeEventListener('resize', resizeMap);
            // Any additional cleanup like removing data sources or layers
            if (mapRef.current && mapRef.current.azureMap) {
                const map = mapRef.current.azureMap;
                map.sources.removeById('yourDataSourceId');
            }
        };
    }, []);  // Empty dependency array means this effect runs only once after the initial rendering

    const mapOptions = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: 'q6E90CxFS1bb3-MfR4m0rEnV7HD7cuSLd9TZGi75O64'
        },
        center: [-117.240476244813, 32.8851040736188],
        zoom: 15
    };
    */

    return (
        <div className="right-side-widget" style={{ height: '100vh', width: '100%' }}>
            <AzureMap subscriptionKey="q6E90CxFS1bb3-MfR4m0rEnV7HD7cuSLd9TZGi75O64" />
        </div>
    );
};

export default RightSideWidget;
