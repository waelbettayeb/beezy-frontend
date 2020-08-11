import React from "react";
import { HeaderNavigation } from "baseui/header-navigation";

import { Button, KIND } from "baseui/button";
import Router from "next/router";
import { ChevronLeft, Search } from "baseui/icon";
import Logo from "src/components/atoms/Logo";

import { Theme } from "baseui/theme";
import { Block } from "baseui/block";
import { ALIGNMENT, Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { useAuth } from "@hooks/useAuth";
import AvatarButton from "@components/atoms/AvatarButton";
import { Drawer } from "baseui/drawer";
import LoginForm from "../LoginForm";
import { AimOutlined } from "@ant-design/icons";
import LocationPickerModal from "@components/organisms/LocationPickerModal";
import { LabelXSmall } from "baseui/typography";

interface Props {
  searchTerm?: string;
  onSearchTermChange?: (e: any) => void;
  onLocationChange?: (lat, lon, radius, address) => void;
  position: any;
  radius: number;
  city: string;
}

const SearchNavBar = (props: Props) => {
  const {
    searchTerm,
    onSearchTermChange,
    onLocationChange,
    position,
    radius,
    city,
  } = props;
  const [css, theme] = useStyletron();
  const auth = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = React.useState(false);

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => {
            const theme: Theme = $theme;
            return {
              padding: theme.sizing.scale300,
            };
          },
        },
      }}
    >
      <Block width="100%">
        <Grid align={ALIGNMENT.center}>
          <Cell span={[1, 0]}>
            <Button
              onClick={() => Router.push("/")}
              kind={KIND.tertiary}
              startEnhancer={() => <ChevronLeft size={24} />}
            ></Button>
          </Cell>
          <Cell span={[2, 1, 1]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Logo onClick={() => Router.push("/")} />
            </Block>
          </Cell>
          <Cell span={[1, 0]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onClick={() => setIsLocationPickerOpen(true)}
                kind={"tertiary"}
                startEnhancer={
                  <>
                    <AimOutlined />
                  </>
                }
              >{`${radius}km`}</Button>
            </Block>
          </Cell>
          <Cell span={[0, 4, 6]}>
            <Input
              type="search"
              placeholder="Search..."
              startEnhancer={<Search size="18px" />}
              value={searchTerm}
              clearable
              onChange={onSearchTermChange}
            />
          </Cell>
          <Cell span={[4, 0]}>
            <Input
              type="search"
              placeholder="Search..."
              startEnhancer={<Search size="18px" />}
              endEnhancer={<LabelXSmall>{city}</LabelXSmall>}
              value={searchTerm}
              clearable
              onChange={onSearchTermChange}
            />
          </Cell>
          <Cell span={[0, 3, 5]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() => setIsLocationPickerOpen(true)}
                kind={"secondary"}
                startEnhancer={
                  <>
                    <AimOutlined /> <LabelXSmall>{`${radius}km`}</LabelXSmall>
                  </>
                }
              >
                {city}
              </Button>
              <LocationPickerModal
                longitude={position.longitude}
                latitude={position.latitude}
                onClose={() => setIsLocationPickerOpen(false)}
                isOpen={isLocationPickerOpen}
                onApply={(latitude, longitude, radius, address) => {
                  onLocationChange(latitude, longitude, radius, address);
                }}
              />
              {auth.user ? (
                <AvatarButton />
              ) : (
                <>
                  <Button onClick={() => setIsOpen(true)} kind={"tertiary"}>
                    Login
                  </Button>
                  <Drawer
                    isOpen={isOpen}
                    autoFocus
                    onClose={() => setIsOpen(false)}
                  >
                    <LoginForm onCompleted={() => setIsOpen(false)} />
                  </Drawer>
                </>
              )}
            </Block>
          </Cell>
        </Grid>
      </Block>
    </HeaderNavigation>
  );
};

export default SearchNavBar;
