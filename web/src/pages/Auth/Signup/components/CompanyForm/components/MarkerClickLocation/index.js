import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { markenIcon } from '@get_appointment/web/src/constants/global';

const MarkerClickLocation = ({ location, setLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);
    }
  });

  return location && <Marker icon={markenIcon} position={location} />;
};

export default MarkerClickLocation;
