// App.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';

import customIconUrl from './assets/img/marker-icon-green.png'; // Make sure 'custom-icon.png' is in the 'src' folder

function App() {
  const [position] = React.useState([48.8566, 2.3522]);

  // Placeholder data for points of interest
  const pointsOfInterestData = [
    // Add your points of interest data here
    // Format: { id: 'unique-id', lat: latitude, lon: longitude, name: 'Point of Interest Name' }
    { id: 'commissariat1', lat: 48.8615, lon: 2.3355, name: 'Commissariat 1', contact:'0146484658' },
    { id: 'commissariat2', lat: 48.8505, lon: 2.3453, name: 'Commissariat 2', contact:'0146484658' },
    // Add more police stations here

    { id: 'hopital1', lat: 48.8632, lon: 2.3075, name: 'Hôpital 1', contact:'0146484658' },
    { id: 'hopital2', lat: 48.8519, lon: 2.3332, name: 'Hôpital 2', contact:'0146484658' },
    // Add more hospitals here

    { id: 'prestation1', lat: 48.8698, lon: 2.3341, name: 'Prestation sociale 1', contact:'0146484658' },
    { id: 'prestation2', lat: 48.8583, lon: 2.3088, name: 'Prestation sociale 2', contact:'0146484658' },
    // Add more social services here
  ];

  const poiIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="App">
      <h1>Contrôlez et fiabilisez les adresses</h1>

      <MapContainer center={position} zoom={13} style={{ height: '600px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Display points of interest on the map */}
        {pointsOfInterestData.map((poi) => (
         <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={poiIcon}>
         <Popup>{poi.name}<br></br>{poi.contact}</Popup>
       </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
