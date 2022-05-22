import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMapControl from '../LocationMapControl';
import MarkerClickLocation from '../MarkerClickLocation';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ location, setLocation, setMapInstance }) => {
  const initialViewMapPosition = [39.7, -8.08];
  return (
    <MapContainer
      style={{ width: '100%', height: '300px', borderRadius: '2px' }}
      center={initialViewMapPosition}
      zoom={6}
      minZoom={5}
      whenCreated={setMapInstance}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
      />
      <LocationMapControl position="topleft" setLocation={setLocation} />

      <MarkerClickLocation location={location} setLocation={setLocation} />
    </MapContainer>
  );
};

export default LocationMap;
