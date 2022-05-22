import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const MarkerClickLocation = ({ location, setLocation }) => {
  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png'
  });

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);
    }
  });

  return location && <Marker icon={icon} position={location} />;
};

export default MarkerClickLocation;
