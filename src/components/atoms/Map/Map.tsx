import { Label1 } from "baseui/typography";
import React from "react";
import { Map, TileLayer, Marker, Circle, Popup, Tooltip } from "react-leaflet";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  radius?: number;
  onViewportChange?: (lat?, lng?, zoom?) => void;
  onViewportChanged?: (lat?, lng?, zoom?) => void;
  onLoad?: (lat?, lng?, zoom?) => void;
  markers?: {
    lat: number;
    lng: number;
    onclick?: any;
  }[];
}

const Logo: React.FC<Props> = (props) => {
  const { lat, lng, onViewportChange, onViewportChanged, markers } = props;
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
      {markers &&
        markers.map((marker, key) => (
          <Marker position={marker} onclick={marker.onclick}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            <Tooltip opacity={1} permanent>
              {key || "0"}
            </Tooltip>
          </Marker>
        ))}
    </Map>
  );
};

export default Logo;
