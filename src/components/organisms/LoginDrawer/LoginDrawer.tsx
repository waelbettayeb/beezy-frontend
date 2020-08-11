import React from "react";
import { Drawer, DrawerProps } from "baseui/drawer";
import LoginForm from "@components/molecules/LoginForm";

interface Props extends DrawerProps {}

const LoginDrawer: React.FC<Props> = (props) => {
  const { onClose, isOpen } = props;
  return (
    <Drawer isOpen={isOpen} autoFocus onClose={onClose}>
      <LoginForm onCompleted={() => onClose({})} />
    </Drawer>
  );
};

export default LoginDrawer;
