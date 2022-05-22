import React from 'react';
import { AimOutlined } from '@ant-design/icons';
import Control from 'react-leaflet-custom-control';
import { useMap } from 'react-leaflet';
const LocationMapControl = ({ position, setLocation }) => {
  const map = useMap();

  const handleClick = (event) => {
    event.preventDefault();
    map.locate().on('locationfound', ({ latlng }) => {
      const location = Object.values(latlng);
      setLocation(location);
      map.setView(latlng, 15);
    });
  };

  return (
    <Control position={position}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={handleClick}>
        <AimOutlined />
      </a>
    </Control>
  );
};

export default LocationMapControl;
