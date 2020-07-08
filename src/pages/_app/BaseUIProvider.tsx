import React from "react";
import { BaseProvider, LightTheme, DarkTheme } from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";

const BaseUIProvider: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <BaseProvider theme={theme === THEME.Light ? LightTheme : DarkTheme}>
      {children}
    </BaseProvider>
  );
};

export default BaseUIProvider;
