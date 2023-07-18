
//ControlAdresse.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { searchAddresses, getAddressDetails } from '../services/api';

const ControlAdresse = () => {
  const [query, setQuery] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await searchAddresses(query);
      setAddresses(data);
    } catch (error) {
      console.error('Error searching addresses:', error);
    }
  };

  const handleAddressClick = async (code) => {
    try {
      const data = await getAddressDetails(code);
      setSelectedAddress(data);
    } catch (error) {
      console.error('Error getting address details:', error);
    }
  };

  const center = [48.852140375792565, 2.279514618653622]; // Coordonnées pour le centre de la carte

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Rechercher</button>

      <div style={{ height: '500px' }}> {/* Ajustez la hauteur de la carte en fonction de vos besoins */}
        <MapContainer center={center} zoom={13} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {addresses.map((address) => (
            <Marker key={address.code} position={[address.geolocalisation[0], address.geolocalisation[1]]} onClick={() => handleAddressClick(address.code)}>
              <Popup>
                {address.adresse}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedAddress && (
        <div>
          <h3>Détails de l'adresse sélectionnée</h3>
          <p>Geolocalisation: {selectedAddress.geolocalisation.join(', ')}</p>
          <p>Adresse: {selectedAddress.blocAdresse.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ControlAdresse;