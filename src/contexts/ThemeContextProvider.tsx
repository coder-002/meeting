import { ReactNode, createContext, useState } from "react";
import { getThemeByName } from "../Theme/theme";
import { FluentProvider } from "@fluentui/react-components";

export const ThemeContext = createContext((themeName: string): void => {});
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const curThemeName =
    localStorage.getItem("appTheme") ||
    "oceanLightThemes" ||
    "forestLightThemes" ||
    "purpleLightThemes";
  const [themeName, _setThemeName] = useState(curThemeName);

  const theme = getThemeByName(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <FluentProvider theme={theme}>{children}</FluentProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
