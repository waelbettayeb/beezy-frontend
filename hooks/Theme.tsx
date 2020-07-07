import React, { useState, useEffect, useContext, createContext } from "react";
import useLocalStorage from "./useLocalStorage";

export enum THEME {
  Light,
  Dark,
}
export interface ThemeContextType {
  theme: THEME;
  setTheme: (theme: THEME) => void;
}
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: THEME.Light,
  setTheme: () => undefined,
});
export const useTheme = () => {
  return useContext(ThemeContext);
};
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", THEME.Light);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
