import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Label1 } from "baseui/typography";
interface Props {}

const MapLocationPicker = (props: Props) => {
  const [position, setPosition] = React.useState({
    lat: 35.919809,
    lng: 0.070937,
    zoom: 8,
  });
  const [address, setAddress] = React.useState("zejfze jkfzk fkzejfs");

  const handleViewportchange = (e) => {
    setPosition({
      lat: e.center[0],
      lng: e.center[1],
      zoom: e.zoom,
    });
  };
  function simpleReverseGeocoding(position) {
    const url = `http://nominatim.openstreetmap.org/reverse?format=json&lon=${position.lng}&lat=${position.lat}`;
    console.log(url);
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        setAddress("");
      })
      .then(function (json) {
        setAddress(json.display_name);
        console.log(json);
      });
  }
  return (
    <>
      <Label1>{address}</Label1>
      <Map
        center={position}
        zoom={position.zoom}
        onViewportChange={(e) => {
          handleViewportchange(e);
        }}
        onViewportChanged={(e) => {
          simpleReverseGeocoding(position);
        }}
        onload={() => {
          simpleReverseGeocoding(position);
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}></Marker>
      </Map>
    </>
  );
};

export default MapLocationPicker;
