import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Button, KIND, SHAPE } from "baseui/button";
import { Drawer } from "baseui/drawer";
import LoginForm from "../LoginForm";
import { useAuth } from "src/hooks/useAuth";
import Logo from "src/components/atoms/Logo";
import ChangeLocaleButton from "@components/atoms/ChangeLocaleButton";
import AvatarButton from "@components/atoms/AvatarButton";
import Router from "next/router";
import { Theme } from "baseui/theme";
import AddServiceButton from "../AddServiceButton";
import { Block } from "baseui/block";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Grid, ALIGNMENT, Cell } from "baseui/layout-grid";
interface Props {}

const AppNavBar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const auth = useAuth();
  const signOut = auth.signOut;

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
          <Cell span={[1, 0]}></Cell>
          <Cell span={[0, 2, 4]}>
            <Button
              onClick={() => Router.push("/search")}
              kind={"minimal"}
              startEnhancer={<Search size="18px" />}
            >
              Search
            </Button>
          </Cell>
          <Cell span={[2, 4, 4]}>
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
          <Cell span={[1, 2, 4]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {auth.user ? (
                <>
                  <Block marginRight={"8px"}>
                    <AddServiceButton />
                  </Block>
                  <AvatarButton />
                </>
              ) : (
                <>
                  <ChangeLocaleButton />
                  <Button onClick={() => setIsOpen(true)}>Get started</Button>
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

      {/* <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Shop
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Blog
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button onClick={() => alert("click")} disabled kind={KIND.minimal}>
            Ressources
          </Button>
        </StyledNavigationItem> */}
    </HeaderNavigation>
  );
};

export default AppNavBar;
