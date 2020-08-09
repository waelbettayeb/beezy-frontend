import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { SIZE } from "baseui/button";
import { Grid, Cell } from "baseui/layout-grid";
import {
  Modal,
  ROLE,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from "baseui/modal";
import { Select, Value } from "baseui/select";
import dynamic from "next/dynamic";

const MapLocationPicker = dynamic(
  () => import("@components/molecules/MapLocationPicker"),
  {
    ssr: false,
  }
);

interface Props extends ModalProps {
  defaultRadius?: number;
  latitude?: number;
  longitude?: number;
  onApply?: (latitude?, longitude?, radius?) => void;
}

const options = [
  { label: "1 kilometer", id: 1 },
  { label: "5 kilometers", id: 5 },
  { label: "20 kilometers", id: 20 },
  { label: "50 kilometers", id: 50 },
  { label: "100 kilometers", id: 100 },
  { label: "200 kilometers", id: 200 },
  { label: "500 kilometers", id: 500 },
];

const LocationPickerModal = (props: Props) => {
  const { defaultRadius, onApply, onClose, latitude, longitude } = props;
  const [css, theme] = useStyletron();
  const [position, setPosition] = React.useState({
    latitude: latitude || 35.919809,
    longitude: longitude || 0,
  });
  const [radius, setRadius] = React.useState<Value>(
    defaultRadius
      ? [options.find((option) => option.id === defaultRadius)]
      : [{ label: "50 kilometers", id: 50 }]
  );
  const handleOnClose = () => {
    onClose && onClose({});
    setPosition({
      latitude: latitude || 35.919809,
      longitude: longitude || 0,
    });
    setRadius(
      defaultRadius
        ? [options.find((option) => option.id === defaultRadius)]
        : [{ label: "50 kilometers", id: 50 }]
    );
  };
  const handleOnApply = () => {
    onApply && onApply(position.latitude, position.longitude, radius[0].id);
    onClose && onClose({});
  };

  return (
    <Modal
      {...props}
      onClose={handleOnClose}
      closeable
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Change Location</ModalHeader>
      <ModalBody>
        <Grid gridMargins={0} gridGaps={10}>
          <Cell span={12}>
            <Select
              clearable={false}
              options={options}
              value={radius}
              placeholder="Select color"
              onChange={(options) => setRadius(options.value)}
            />
          </Cell>
          <Cell span={12}>
            <Block height="50vh" width="100%">
              <MapLocationPicker
                lat={position.latitude}
                lng={position.longitude}
                radius={(radius[0].id as number) * 1000}
                onViewportChange={(lat, lng) => {
                  setPosition({ latitude: lat, longitude: lng });
                }}
              />
            </Block>
          </Cell>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={"tertiary"} onClick={handleOnClose}>
          Cancel
        </ModalButton>
        <ModalButton onClick={handleOnApply}>Apply</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default LocationPickerModal;
