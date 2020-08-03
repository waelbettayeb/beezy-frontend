import React, { useEffect } from "react";
import { Map, TileLayer, Marker, Popup, WMSTileLayer } from "react-leaflet";
interface Props {}

const MapLocationPicker = (props: Props) => {
  const [location, setLocation] = React.useState({
    // address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
    position: {
      lat: 35.919809,
      lng: 0.070937,
      zoom: 8,
    },
    // places: null,
  });

  return (
    <>
      <Map
        center={location.position}
        zoom={location.position.zoom}
        onViewportChange={(e) => {
          setLocation({
            position: {
              lat: e.center[0],
              lng: e.center[1],
              zoom: e.zoom,
            },
          });
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={location.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </>
  );
};

export default MapLocationPicker;
