import React, { useState, useEffect, useContext, createContext } from "react";
import { LightTheme, DarkTheme } from "baseui";
export const THEME = {
  LightTheme,
  DarkTheme,
};
export const ThemeContext = createContext(THEME.LightTheme);
export const useTheme = () => {
  return useContext(ThemeContext);
};
