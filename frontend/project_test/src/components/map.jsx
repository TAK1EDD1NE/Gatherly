import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationMap = () => {
  // Mapbox access token
  const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

  // Initial viewport settings
  const [viewport, setViewport] = useState({
    latitude: 44.8378,
    longitude: -0.5792,
    zoom: 13,
    width: '100%',
    height: '500px',
  });

  // Marker position
  const markerPosition = [44.8378, -0.5792];

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker latitude={markerPosition[1]} longitude={markerPosition[0]}>
        {/* Add custom marker content here */}
        <div>Exact location</div>
      </Marker>
    </ReactMapGL>
  );
};

export default LocationMap;