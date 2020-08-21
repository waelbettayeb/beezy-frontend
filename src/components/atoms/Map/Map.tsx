import { useStyletron } from "baseui";
import { Label1 } from "baseui/typography";
import { circle } from "leaflet";
import React from "react";
import {
  Map as M,
  TileLayer,
  Marker,
  Circle,
  Popup,
  Tooltip,
  Rectangle,
} from "react-leaflet";

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
    label?: string;
    onclick?: any;
    popupContent?: any;
  }[];
  circles?: {
    lat: number;
    lng: number;
    radius: number;
  }[];
  rectangles?: any[];
}

const Map: React.FC<Props> = (props) => {
  const {
    lat,
    lng,
    onViewportChange,
    onViewportChanged,
    markers,
    circles,
    rectangles,
  } = props;
  const [zoom, setZoom] = React.useState(props.zoom | 5);
  const handleViewportchange = (e) => {
    setZoom(e.zoom);
    onViewportChange && onViewportChange(e.center[0], e.center[1]);
  };
  const handleViewportchanged = (e) => {
    setZoom(e.zoom);
    onViewportChanged && onViewportChanged(e.center[0], e.center[1]);
  };
  const [css, theme] = useStyletron();

  return (
    <M
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
            <Popup
              className={css({
                width: theme.sizing.scale4800,
                padding: 0,
              })}
            >
              {marker.popupContent}
            </Popup>
            {marker.label && zoom > 7 && (
              <Tooltip opacity={1} permanent>
                {marker.label}
              </Tooltip>
            )}
          </Marker>
        ))}
      {circles &&
        circles.map((circle, key) => (
          <Circle center={circle} radius={circle.radius}></Circle>
        ))}
      {rectangles && rectangles.map((r) => <Rectangle bounds={r}></Rectangle>)}
    </M>
  );
};

export default Map;
