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
import { Display2, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

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
        <Display2 marginBottom="scale500">Login</Display2>
        <FormControl label={() => "Username"} caption={() => "caption"}>
          <Input />
        </FormControl>
        <FormControl label={() => "Password"} caption={() => "caption"}>
          <Input type="password" />
        </FormControl>
        <Button onClick={() => setIsOpen(false)}>Sign in</Button>
        <Paragraph3>
          Don't have an account? <StyledLink href="/about">Sign up</StyledLink>
        </Paragraph3>
        <Paragraph3>
          Have you forgotten your password?{" "}
          <StyledLink href="/about">Click Here</StyledLink>
        </Paragraph3>
      </Drawer>
    </HeaderNavigation>
  );
};

export default AppNavBar;
