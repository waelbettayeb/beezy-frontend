import React from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@components/atoms/Map"), {
  ssr: false,
});
interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  radius?: number;
  onViewportChange?: (lat?, lng?, zoom?) => void;
  onViewportChanged?: (lat?, lng?, zoom?) => void;
  onLoad?: (lat?, lng?, zoom?) => void;
}

const MapLocationPicker = (props: Props) => {
  const { lat, lng, onViewportChange, onViewportChanged, radius } = props;
  const [zoom, setZoom] = React.useState(props.zoom | 7);
  const handleViewportchange = (lat, lng, zoom) => {
    setZoom(zoom);
    onViewportChange && onViewportChange(lat, lng, zoom);
  };
  const handleViewportchanged = (lat, lng, zoom) => {
    setZoom(zoom);
    onViewportChanged && onViewportChanged(lat, lng, zoom);
  };

  return (
    <>
      <Map
        lat={lat}
        lng={lng}
        zoom={zoom}
        onViewportChange={(lat, lng, zoom) => {
          handleViewportchange(lat, lng, zoom);
        }}
        onViewportChanged={(lat, lng, zoom) => {
          handleViewportchanged(lat, lng, zoom);
        }}
        markers={[{ lat, lng }]}
        circles={radius && [{ lat, lng, radius }]}
      />
    </>
  );
};

export default MapLocationPicker;
