import React, { useEffect, useRef } from 'react';
import './App.css';
import { AzureMapsProvider, AzureMap, IAzureMapOptions, useAzureMap } from 'react-azure-maps';
import { AuthenticationType, HtmlMarker, source, Popup, data } from 'azure-maps-control';

class RightSideWidget extends React.Component {
    constructor(props) {
      super(props);
      // Ref for the map
      this.mapRef = React.createRef();
      this.state = {
        // Initial state here if needed
      };
    }
  
    componentDidMount() {
      this.initializeMap();
    }

    componentDidMount() {
        // Setup event listener to handle window resize events
        window.addEventListener('resize', this.resizeMap);
    
        // Additional setup for your map can go here
    }

    componentWillUnmount() {
        // Make sure to remove the event listener when the component is unmounted
        window.removeEventListener('resize', this.resizeMap);
    }

    resizeMap = () => {
    // Call the Azure Map's resize method here, if available
    if (this.mapRef.current && this.mapRef.current.azureMap) {
      this.mapRef.current.azureMap.resize();
    }
    };
  
    initializeMap() {
      // Ensure the map ref is current and the map instance is available
      if (!this.mapRef.current || !this.mapRef.current.azureMap) return;
  
      const map = this.mapRef.current.azureMap;
      const dataSource = new source.DataSource();
      map.sources.add(dataSource);
  
      const points = [
        { position: [-117.240843791937, 32.8756844350981], name: 'Revelle College' },
        { position: [-117.23281088454, 32.8825866510293], name: 'Warren College' },
        { position: [-117.241001307279, 32.8787288659333], name: 'Muir College' },
        { position: [-117.242257615978, 32.8860562258214], name: 'Eleanor Roosevelt College' },
        { position: [-117.242012888238, 32.8834506082528], name: 'Marshall College' },
        { position: [-117.24144468769, 32.8808632553821], name: 'Sixth College' },
        { position: [-117.241654333717, 32.8881059140197], name: 'Seventh College' },
        { position: [-117.241884691389, 32.8722111492467], name: 'Eighth College' },
        { position: [-117.240476244813, 32.8851040736188], name: 'RIMAC' },
        { position: [-117.241244984452, 32.8771782863005], name: 'Main Gym' },
        { position: [-117.231787044813, 32.8804446824681], name: 'Canyon View Center' },
        { position: [-117.242563273649, 32.8860762214279], name: 'Cafe Ventanas' },
        { position: [-117.242745344813, 32.8830496144318], name: 'Ocean View Terrace' },
        { position: [-117.242473487142, 32.878763553017], name: 'Pines' },
        { position: [-117.242034102485, 32.874745873623], name: '64 Degrees' },
        { position: [-117.237555173649, 32.8810649434171], name: 'Geisel' },
        { position: [-117.233480587142, 32.8817645336355], name: 'CSE Building' },
        { position: [-117.236180645588, 32.8797142976572], name: 'Price Center' },
        { position: [-117.237385432813, 32.8775377778697], name: 'Center Hall' },
        { position: [-117.239934429909, 32.8742273689528], name: 'York Hall' },
        { position: [-117.240968933688, 32.8737011830541], name: 'Galbraith Hall' },
        { position: [-117.233755823076, 32.8783669920803], name: 'Pepper Canyon Hall' },
        { position: [-117.239160973649, 32.8843355152156], name: 'SuperComputer Center' },
        { position: [-117.24178003754, 32.8869401384703], name: 'Rady School' },
        { position: [-117.240450256902, 32.8839510430299], name: 'Social Sciences Building' },
        { position: [-117.23492826943, 32.8834472279301], name: 'Franklin Antonio Hall' },
        { position: [-117.239598866585, 32.8805880659762], name: 'Cognitive Science Building' },
        { position: [-117.239433702485, 32.8778456944162], name: 'Mandeville Auditorium' },
        { position: [-117.235494602485, 32.8815225235185], name: 'Jacobs School' },
        { position: [-117.234311902485, 32.880484022991], name: 'Warren Lecture Hall' }
      ];
  
      points.forEach((point, index) => {
        const marker = new HtmlMarker({
          color: 'DodgerBlue',
          text: (index + 1).toString(),
          position: point.position,
          popup: new Popup({
            content: `<div style='padding: 10px;'>${point.name}</div>`,
            pixelOffset: [0, -30]
          })
        });
        dataSource.add(new data.Feature(new data.Point(point.position), point));
        map.markers.add(marker);
      });
  
      this.animatePoints(points);
    }
  
    animatePoints(points) {
      let i = 0;
      const map = this.mapRef.current.azureMap;
  
      const animate = () => {
        map.setCamera({
          center: points[i].position,
          zoom: 17,
          type: 'ease',
          duration: 1000
        });
        i = (i + 1) % points.length;
        setTimeout(animate, 3000);
      };
  
      animate();
    }
  
    render() {
        const mapOptions = {
            authOptions: {
              authType: AuthenticationType.subscriptionKey,
              subscriptionKey: 'q6E90CxFS1bb3-MfR4m0rEnV7HD7cuSLd9TZGi75O64'
            },
            center: [-117.240476244813, 32.8851040736188],
            zoom: 15
          };
  
      return (
        <div className="right-side-widget" style={{ height: '100vh', width: '100%' }}>
          <AzureMapsProvider>
            <AzureMap ref={this.mapRef} options={mapOptions} />
          </AzureMapsProvider>
        </div>
      );
    }
  }
  
  export default RightSideWidget;