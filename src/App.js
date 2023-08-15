///app
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchBar from './components/SearchBar';
import { searchAddresses } from './services/api';


function App() {
  const [position] = useState([48.8566, 2.3522]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      
      const responseData = await searchAddresses(query);
      setSearchResults(responseData);
      console.log(responseData);
    } catch (error) {
      console.error('Erreur lors de la recherche des adresses :', error);
    }
  };

  return (
    <div className="App">
      <h1>Contrôlez et fiabilisez les adresses</h1>
      <SearchBar onSearch={handleSearch} />

      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Ajoutez une vérification pour vous assurer que searchResults est un tableau non vide */}
        {Array.isArray(searchResults) && searchResults.length > 0 && searchResults.map((address) => (
          <Marker key={address.code} position={[address.geolocalisation[0], address.geolocalisation[1]]}>
            <Popup>{address.adresse}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
