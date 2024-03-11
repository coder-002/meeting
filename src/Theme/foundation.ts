import {
  BrandVariants,
  Theme,
  createDarkTheme,
  createLightTheme,
} from "@fluentui/react-components";

const ocean: BrandVariants = {
  10: "#020305",
  20: "#111723",
  30: "#16263D",
  40: "#193253",
  50: "#1B3F6A",
  60: "#1B4C82",
  70: "#18599B",
  80: "#1267B4",
  90: "#3174C2",
  100: "#4F82C8",
  110: "#6790CF",
  120: "#7D9ED5",
  130: "#92ACDC",
  140: "#A6BAE2",
  150: "#BAC9E9",
  160: "#CDD8EF",
};

const forest: BrandVariants = {
  10: "#020402",
  20: "#101C15",
  30: "#162E21",
  40: "#1A3C29",
  50: "#1D4A32",
  60: "#1F583B",
  70: "#226745",
  80: "#24774E",
  90: "#258658",
  100: "#269662",
  110: "#33A66E",
  120: "#57B281",
  130: "#75BF95",
  140: "#90CCA8",
  150: "#ABD8BD",
  160: "#C6E4D1",
};

const purple: BrandVariants = {
  10: "#040204",
  20: "#1C151C",
  30: "#2F212F",
  40: "#3F2B3F",
  50: "#4F354F",
  60: "#603F60",
  70: "#714971",
  80: "#825483",
  90: "#955F95",
  100: "#A76AA8",
  110: "#BA76BB",
  120: "#CD81CE",
  130: "#DE8FDF",
  140: "#E5A4E5",
  150: "#ECB8EB",
  160: "#F2CCF1",
};

export const oceanLightThemes = createLightTheme(ocean);
export const forestLightThemes = createLightTheme(forest);
export const purpleLightThemes = createLightTheme(purple);

export const oceanDarkThemes = createDarkTheme(ocean);
export const forestDarkThemes = createDarkTheme(forest);
export const purpleDarkThemes = createDarkTheme(purple);
