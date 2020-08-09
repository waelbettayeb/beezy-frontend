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
import { Slider } from "baseui/slider";

import dynamic from "next/dynamic";
import { FormControl } from "baseui/form-control";

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

const LocationPickerModal = (props: Props) => {
  const { defaultRadius, onApply, onClose, latitude, longitude } = props;
  const [css, theme] = useStyletron();
  const [position, setPosition] = React.useState({
    latitude: latitude || 35.919809,
    longitude: longitude || 0,
  });
  const [radius, setRadius] = React.useState(
    defaultRadius ? [defaultRadius] : [50]
  );
  const handleOnClose = () => {
    onClose && onClose({});
    setPosition({
      latitude: latitude || 35.919809,
      longitude: longitude || 0,
    });
    setRadius(defaultRadius ? [defaultRadius] : [50]);
  };
  const handleOnApply = () => {
    onApply && onApply(position.latitude, position.longitude, radius[0]);
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
        <FormControl label={"Radius"}>
          <Slider
            value={radius}
            onChange={({ value }) => value && setRadius(value)}
            onFinalChange={({ value }) => console.log(value)}
            min={0}
            max={500}
            step={20}
            overrides={{
              ThumbValue: ({ $value }) => (
                <div
                  className={css({
                    position: "absolute",
                    top: `-${theme.sizing.scale800}`,
                    ...theme.typography.font200,
                    backgroundColor: "transparent",
                  })}
                >
                  {$value}km
                </div>
              ),
              TickBar: ({ $min, $max }) => (
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: theme.sizing.scale600,
                    paddingLeft: theme.sizing.scale600,
                    paddingBottom: theme.sizing.scale400,
                  })}
                >
                  <div>{0}km</div>
                  <div>{250}km</div>
                  <div>{500}km</div>
                </div>
              ),
            }}
          />
        </FormControl>

        <FormControl label={"Location"}>
          <Block height="50vh" width="100%">
            <MapLocationPicker
              lat={position.latitude}
              lng={position.longitude}
              radius={radius[0] * 1000}
              onViewportChange={(lat, lng) => {
                setPosition({ latitude: lat, longitude: lng });
              }}
            />
          </Block>
        </FormControl>
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
