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
import { simpleReverseGeocoding } from "@components/molecules/MapLocationPicker";
import { FormattedMessage, useIntl } from "react-intl";
import { buttonMessages } from "@utils/intl";

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
  onApply?: (latitude?, longitude?, radius?, address?) => void;
}

const LocationPickerModal = (props: Props) => {
  const intl = useIntl();
  const { defaultRadius, onApply, onClose, latitude, longitude } = props;
  const [css, theme] = useStyletron();
  const [position, setPosition] = React.useState({
    latitude: latitude || 35.919809,
    longitude: longitude || 0,
  });
  const [radius, setRadius] = React.useState(
    defaultRadius ? [defaultRadius] : [50]
  );
  const [address, setAddress] = React.useState(null);

  const handleOnClose = () => {
    onClose && onClose({});
    setPosition({
      latitude: latitude || 35.919809,
      longitude: longitude || 0,
    });
    setRadius(defaultRadius ? [defaultRadius] : [50]);
  };
  const handleOnApply = () => {
    onApply &&
      onApply(position.latitude, position.longitude, radius[0], address);
    onClose && onClose({});
  };
  React.useEffect(() => {
    setPosition({ latitude, longitude });
  }, [latitude, longitude]);
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
      <ModalHeader>
        <FormattedMessage defaultMessage="Change Location" />
      </ModalHeader>
      <ModalBody>
        <FormControl label={intl.formatMessage({ defaultMessage: "Radius" })}>
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

        <FormControl label={intl.formatMessage({ defaultMessage: "Location" })}>
          <Block height="50vh" width="100%">
            <MapLocationPicker
              lat={position.latitude}
              lng={position.longitude}
              radius={radius[0] * 1000}
              onViewportChange={(lat, lng) => {
                setPosition({ latitude: lat, longitude: lng });
              }}
              onViewportChanged={(lat, lng) => {
                simpleReverseGeocoding(lat, lng)
                  .catch(function (error) {
                    console.log(error);
                    return "";
                  })
                  .then(function (json) {
                    setAddress(json.address);
                    return json.display_name;
                  });
              }}
            />
          </Block>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={"tertiary"} onClick={handleOnClose}>
          <FormattedMessage {...buttonMessages.cancel} />
        </ModalButton>
        <ModalButton onClick={handleOnApply}>
          <FormattedMessage {...buttonMessages.apply} />
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default LocationPickerModal;
