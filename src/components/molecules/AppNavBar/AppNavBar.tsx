import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button, SHAPE } from "baseui/button";
import { Drawer } from "baseui/drawer";
import LoginForm from "../LoginForm";
import { useAuth } from "src/hooks/useAuth";
import DarkModeToggle from "src/components/atoms/DarkModeToggle";
import Logo from "src/components/atoms/Logo";
import ChangeLocaleButton from "@components/atoms/ChangeLocaleButton";
import AvatarButton from "@components/atoms/AvatarButton";
interface Props {}

const AppNavBar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const auth = useAuth();
  const signOut = auth.signOut;
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Logo />
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <ChangeLocaleButton />
        </StyledNavigationItem>
        <StyledNavigationItem>
          <DarkModeToggle />
        </StyledNavigationItem>
        {auth.user ? (
          <StyledNavigationItem>
            <AvatarButton />
          </StyledNavigationItem>
        ) : (
          <StyledNavigationItem>
            <Button shape={SHAPE.pill} onClick={() => setIsOpen(true)}>
              Get started
            </Button>
          </StyledNavigationItem>
        )}
      </StyledNavigationList>
      {auth.user ? (
        ""
      ) : (
        <Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)}>
          <LoginForm onCompleted={() => setIsOpen(false)} />
        </Drawer>
      )}
      <StyledNavigationList $align={ALIGN.right} />
    </HeaderNavigation>
  );
};

export default AppNavBar;
