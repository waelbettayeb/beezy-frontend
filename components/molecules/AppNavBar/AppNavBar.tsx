import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button, SHAPE } from "baseui/button";
import { Drawer, ANCHOR, SIZE } from "baseui/drawer";
import LoginForm from "../LoginForm";

interface Props {}

const AppNavBar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Beezy</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <StyledLink href="/about">About us</StyledLink>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button shape={SHAPE.pill} onClick={() => setIsOpen(true)}>
            Get started
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
      <Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)}>
        <LoginForm />
      </Drawer>
    </HeaderNavigation>
  );
};

export default AppNavBar;
