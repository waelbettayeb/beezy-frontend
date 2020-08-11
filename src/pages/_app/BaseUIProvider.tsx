import React from "react";
import { BaseProvider, createLightTheme, createDarkTheme } from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";
import { ThemePrimitives } from "baseui/theme";
import { PLACEMENT, ToasterContainer } from "baseui/toast";

const BaseUIProvider: React.FC = ({ children }) => {
  const { theme } = useTheme();
  const primitives: Partial<ThemePrimitives> = {
    primaryFontFamily: "Inter",
    primary: "#8368CB",
    // primary50: "#C8BBE9",
    // primary100: "#B7A6E2",
    // primary200: "#A591DB",
    // primary300: "#947CD3",
    // primary400: "#8368CB",
    // primary500: "#7253C4",
    // primary600: "#6241B9",
    primary700: "#573AA4",
  };
  const primitivesDark: Partial<ThemePrimitives> = {
    primaryFontFamily: "Inter",
    // primary: "#EDDDFF",
    // primary50: "#C8BBE9",
    primary100: "#B7A6E2",
    // primary200: "#A591DB",
    // primary300: "#947CD3",
    // primary400: "#8368CB",
    // primary500: "#7253C4",
    // primary600: "#6241B9",
    // primary700: "#573AA4",
  };
  const overrides = {
    typography: {
      DisplayLarge: {
        fontFamily: "Metropolis",
      },
      DisplayMedium: {
        fontFamily: "Metropolis",
      },
      DisplaySmall: {
        fontFamily: "Metropolis",
      },
      DisplayXSmall: {
        fontFamily: "Metropolis",
      },
    },
    borders: {
      useRoundedCorners: true,
      buttonBorderRadius: "8px",
      inputBorderRadius: "4px",
      popoverBorderRadius: "8px",
      surfaceBorderRadius: "4px",
    },
  };
  const LightTheme = createLightTheme(primitives, overrides);
  const DarkTheme = createDarkTheme(primitivesDark, overrides);

  return (
    <BaseProvider theme={theme === THEME.Light ? LightTheme : DarkTheme}>
      <ToasterContainer autoHideDuration={5000}>{children}</ToasterContainer>
    </BaseProvider>
  );
};

export default BaseUIProvider;
