import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Label1 } from "baseui/typography";
interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  onViewportChange: (lat, lng, zoom?) => void;
}

const MapLocationPicker = (props: Props) => {
  const { lat, lng, onViewportChange } = props;
  const [zoom, setZoom] = React.useState(props.zoom | 8);
  const [address, setAddress] = React.useState("");

  const handleViewportchange = (e) => {
    onViewportChange(e.center[0], e.center[1], zoom);
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
      <Map
        center={{ lat, lng }}
        zoom={zoom}
        onViewportChange={(e) => {
          handleViewportchange(e);
        }}
        onViewportChanged={(e) => {
          simpleReverseGeocoding({ lat, lng });
        }}
        onload={() => {
          simpleReverseGeocoding({ lat, lng });
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={{ lat, lng }}></Marker>
      </Map>
      <Label1>{address}</Label1>
    </>
  );
};

export default MapLocationPicker;
