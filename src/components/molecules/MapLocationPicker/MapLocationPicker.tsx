import React from "react";
import { Map, TileLayer, Marker, Circle } from "react-leaflet";
import { Label1 } from "baseui/typography";
interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  radius?: number;
  onViewportChange?: (lat?, lng?, zoom?) => void;
  onViewportChanged?: (lat?, lng?, zoom?) => void;
  onLoad?: (lat?, lng?, zoom?) => void;
}

export function simpleReverseGeocoding(position): Promise<Response> {
  const url = `http://nominatim.openstreetmap.org/reverse?format=json&lon=${position.lng}&lat=${position.lat}`;
  return fetch(url);
}

const MapLocationPicker = (props: Props) => {
  const { lat, lng, onViewportChange, onViewportChanged, radius } = props;
  const [zoom, setZoom] = React.useState(props.zoom | 7);
  const handleViewportchange = (e) => {
    setZoom(e.zoom);
    onViewportChange && onViewportChange(e.center[0], e.center[1]);
  };
  const handleViewportchanged = (e) => {
    setZoom(e.zoom);
    onViewportChanged && onViewportChanged(e.center[0], e.center[1]);
  };

  return (
    <>
      <Map
        center={{ lat, lng }}
        zoom={zoom}
        onViewportChange={(e) => {
          handleViewportchange(e);
        }}
        onViewportChanged={(e) => {
          handleViewportchanged(e);
        }}
        animate={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat, lng }}></Marker>
        {radius && <Circle center={{ lat, lng }} radius={radius}></Circle>}
      </Map>
    </>
  );
};

export default MapLocationPicker;
