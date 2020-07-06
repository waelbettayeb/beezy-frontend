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
import { useAuth } from "@hooks/useAuth";
import styles from "./sass/AppNavBar.module.sass";
interface Props {}

const AppNavBar = (props: Props) => {
  const auth = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const signOut = auth.signOut;
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <img src="/Beeezy.svg" alt="Beeezy Logo" className={styles.logo} />
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        {auth.user ? (
          <StyledNavigationItem>
            <Button shape={SHAPE.pill} onClick={() => signOut()}>
              Sign out
            </Button>
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
        <Drawer
          isOpen={isOpen}
          autoFocus
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <LoginForm />
        </Drawer>
      )}
      <StyledNavigationList $align={ALIGN.right} />
    </HeaderNavigation>
  );
};

export default AppNavBar;
