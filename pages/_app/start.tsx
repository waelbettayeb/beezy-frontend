import React, { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { isServer } from "styletron";

import { useTheme, THEME } from "@hooks/Theme";
import LoadingScreen from "@components/molecules/LoadingScreen";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();
  const { loading } = auth.getUser();
  const { theme } = useTheme();
  const color = theme === THEME.Light ? "white" : "black";
  useEffect(() => {
    document.body.style.background = color;
  }, [color]);
  return (
    <React.Fragment>
      {isServer || loading ? (
        <LoadingScreen />
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Start;
