import { Theme } from "@fluentui/react-components";
import {
  forestDarkThemes,
  forestLightThemes,
  oceanDarkThemes,
  oceanLightThemes,
  purpleDarkThemes,
  purpleLightThemes,
} from "./foundation";

export function getThemeByName(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  oceanLightThemes,
  forestLightThemes,
  purpleLightThemes,
  purpleDarkThemes,
  forestDarkThemes,
  oceanDarkThemes,
};
