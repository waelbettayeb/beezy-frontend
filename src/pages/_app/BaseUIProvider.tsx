import React from "react";
import { BaseProvider, createLightTheme, createDarkTheme } from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";
import { ThemePrimitives } from "baseui/theme";
import { PLACEMENT, ToasterContainer } from "baseui/toast";
import useLocale from "@hooks/useLocale";
import { Locale, localeNames } from "@components/containers/Locale";
import { isServer } from "styletron";

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
    primaryFontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
        fontFamily:
          "Metropolis, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      },
      DisplayMedium: {
        fontFamily:
          "Metropolis, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      },
      DisplaySmall: {
        fontFamily:
          "Metropolis, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      },
      DisplayXSmall: {
        fontFamily:
          "Metropolis, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
  const currentTheme = theme === THEME.Light ? LightTheme : DarkTheme;
  const { locale, setLocale } = useLocale();

  !isServer &&
    document
      .getElementsByTagName("body")[0]
      .setAttribute("dir", locale === Locale.AR ? "rtl" : "ltr");

  return (
    <BaseProvider
      theme={{
        ...currentTheme,
        direction: locale === Locale.AR ? "rtl" : "ltr",
      }}
    >
      <ToasterContainer autoHideDuration={5000}>{children}</ToasterContainer>
    </BaseProvider>
  );
};

export default BaseUIProvider;
