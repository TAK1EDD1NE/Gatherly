import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({position}) => {
  // Define the center position of the map
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      {/* TileLayer provides the map tiles (e.g., streets, terrain, etc.) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add a marker at the map's center */}
      <Marker position={position}>
        <Popup>
          San Francisco <br /> A lovely city!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

