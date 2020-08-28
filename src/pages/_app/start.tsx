import React, { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { isServer } from "styletron";

import { useTheme, THEME } from "src/hooks/Theme";
import LoadingScreen from "src/components/molecules/LoadingScreen";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();
  const { data, loading, error } = auth.fetchUser();
  const { theme } = useTheme();
  const color = theme === THEME.Light ? "white" : "black";
  !loading && !error && auth.setUser(data?._me);
  (!loading && !error) ||
    (!loading && !data?._me && localStorage.removeItem("jwt"));
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
