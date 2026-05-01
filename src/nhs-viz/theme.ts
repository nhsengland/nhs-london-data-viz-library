// NHS Data Visualization Theme
// Based on NHS England Data Viz Community of Practice guidelines
// https://nhsengland.github.io/data-viz-community-of-practice/

export const nhsColors = {
  // Core NHS Brand Colours
  nhsBlue: "#005EB8",
  nhsDarkBlue: "#003087",
  nhsBrightBlue: "#0072CE",
  nhsLightBlue: "#41B6E6",
  nhsAquaBlue: "#00A9CE",

  // Greens
  nhsDarkGreen: "#006747",
  nhsGreen: "#009639",
  nhsLightGreen: "#78BE20",

  // Warm Colours
  nhsYellow: "#FAE100",
  nhsWarmYellow: "#FFB81C",
  nhsOrange: "#ED8B00",
  nhsRed: "#DA291C",

  // Pinks & Purples
  nhsDarkPink: "#7C2855",
  nhsPink: "#AE2573",
  nhsPurple: "#330072",

  // Neutrals
  nhsBlack: "#231F20",
  nhsDarkGrey: "#425563",
  nhsMidGrey: "#768692",
  nhsPaleGrey: "#E8EDEE",
  nhsWhite: "#FFFFFF",
} as const;

// Chart colour palette - ordered for maximum distinction
// Following NHS Data Viz CoP guidelines for categorical data
export const chartColors = [
  nhsColors.nhsBlue,
  nhsColors.nhsOrange,
  nhsColors.nhsGreen,
  nhsColors.nhsRed,
  nhsColors.nhsPink,
  nhsColors.nhsAquaBlue,
  nhsColors.nhsLightGreen,
  nhsColors.nhsPurple,
  nhsColors.nhsWarmYellow,
  nhsColors.nhsLightBlue,
  nhsColors.nhsDarkGreen,
  nhsColors.nhsDarkPink,
];

// Sequential palette for ordered data (light to dark blue)
export const sequentialBlue = [
  "#C3DCF0",
  "#7FB3DE",
  "#4A93CC",
  "#1A74BA",
  "#005EB8",
  "#004E99",
  "#003E7A",
  "#002E5C",
];

// Diverging palette (red-white-blue)
export const divergingRedBlue = [
  "#DA291C",
  "#E8645B",
  "#F5A09A",
  "#FDDCDA",
  "#FFFFFF",
  "#C3DCF0",
  "#7FB3DE",
  "#4A93CC",
  "#005EB8",
];

// Typography
export const nhsTypography = {
  fontFamily: "Arial, sans-serif",
  heading: {
    fontWeight: 700,
    color: nhsColors.nhsDarkGrey,
  },
  body: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: 1.5,
    color: nhsColors.nhsDarkGrey,
  },
  caption: {
    fontWeight: 400,
    fontSize: "14px",
    color: nhsColors.nhsMidGrey,
  },
};

// Chart configuration defaults
export const chartDefaults = {
  fontFamily: nhsTypography.fontFamily,
  fontSize: 12,
  axisColor: nhsColors.nhsMidGrey,
  gridColor: nhsColors.nhsPaleGrey,
  tooltipBg: nhsColors.nhsWhite,
  tooltipBorder: nhsColors.nhsPaleGrey,
  height: 400,
  animationDuration: 800,
};

export function getChartColor(index: number): string {
  return chartColors[index % chartColors.length];
}
