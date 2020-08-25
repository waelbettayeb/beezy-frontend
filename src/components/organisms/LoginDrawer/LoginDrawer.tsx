import React from "react";
import { ANCHOR, Drawer, DrawerProps } from "baseui/drawer";
import LoginForm from "@components/molecules/LoginForm";
import { Locale } from "@components/containers/Locale";
import useLocale from "@hooks/useLocale";

interface Props extends DrawerProps {}

const LoginDrawer: React.FC<Props> = (props) => {
  const { onClose, isOpen } = props;
  const { locale, setLocale } = useLocale();

  return (
    <Drawer
      isOpen={isOpen}
      autoFocus
      onClose={onClose}
      anchor={locale === Locale.AR ? ANCHOR.left : ANCHOR.right}
    >
      <LoginForm onCompleted={() => onClose({})} />
    </Drawer>
  );
};

export default LoginDrawer;
