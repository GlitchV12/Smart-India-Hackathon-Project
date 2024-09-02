import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const RouteMap = () => {
  return (
    <MapContainer center={[28.7041, 77.1025]} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default RouteMap;
