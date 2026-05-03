# NHS London Data Visualization Component Library

[![npm version](https://img.shields.io/npm/v/nhs-london-data-viz-library.svg)](https://www.npmjs.com/package/nhs-london-data-viz-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A production-ready React component library for NHS-branded data visualization. Built following **NHS England Data Viz Community of Practice** guidelines with full TypeScript support.

## 🌐 Live Demo

**[london-react-template.developersandbox.federateddataplatform.nhs.uk](https://london-react-template.developersandbox.federateddataplatform.nhs.uk)**

> ℹ️ The demo site is hosted on the NHS Federated Data Platform (FDP). You will need FDP access to view it.

## 📦 Installation

```bash
npm install nhs-london-data-viz-library
```

### Peer Dependencies

```bash
npm install react react-dom recharts nhsuk-frontend
```

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^18` | React framework |
| `react-dom` | `^18` | React DOM renderer |
| `recharts` | `^3.0.0` | Charting engine used by chart components |
| `nhsuk-frontend` | `^10.4.2` | NHS Design System base CSS |

> **No special Vite/Webpack configuration required.** This library ships as pure ESM with no CommonJS dependencies.

## 🚀 Quick Start

```tsx
import { NHSBarChart, NHSKPICard, nhsColors } from "nhs-london-data-viz-library";

// Required: NHS Design System base styles
import "nhsuk-frontend/dist/nhsuk/nhsuk-frontend.css";

// Optional: only needed if using SubNavigation component
import "nhs-london-data-viz-library/sub-navigation.css";

function App() {
  const data = [
    { region: "North West London", attendances: 42000 },
    { region: "North Central London", attendances: 38500 },
    { region: "South East London", attendances: 35200 },
    { region: "South West London", attendances: 31800 },
    { region: "North East London", attendances: 29400 },
  ];

  return (
    <div>
      <NHSKPICard
        title="Total A&E Attendances"
        value="176.9K"
        trend="up"
        trendValue="+4.1%"
        trendLabel="vs previous quarter"
        color={nhsColors.nhsBlue}
      />

      <NHSBarChart
        data={data}
        xKey="region"
        yKeys={["attendances"]}
        title="A&E Attendances by Sub-Region (Q4 2025/26)"
        layout="horizontal"
      />
    </div>
  );
}
```

## 📊 Available Components

### Charts

| Component | Use Case |
|-----------|----------|
| `NHSBarChart` | Comparisons — horizontal bar, vertical column, stacked, grouped |
| `NHSLineChart` | Trends over time — single/multi-series line, area, stacked area |
| `NHSComboChart` | Dual measures — combined bar + line with dual Y-axis |
| `NHSPieChart` | Proportions — pie and donut with labels |
| `NHSScatterChart` | Correlations — scatter plots and bubble charts |
| `NHSHeatmap` | Patterns — matrix heatmaps with sequential colour scales |
| `NHSTreemap` | Hierarchies — area-based proportional visualization |
| `NHSGanttChart` | Timelines — horizontal bars with progress indicators |
| `NHSSparkline` | At-a-glance — inline mini-charts for tables and cards |

### Dashboard Components

| Component | Use Case |
|-----------|----------|
| `NHSKPICard` | Key metrics — scorecard tiles with trend arrows |
| `NHSTable` | Data exploration — sortable, filterable, paginated, conditional formatting |
| `ChartContainer` | Layout — wrapper with title, subtitle, download button |

### UI Components

| Component | Use Case |
|-----------|----------|
| `SubNavigation` | Navigation — NHS-styled horizontal tab bar |
| `NHSLogo` | Branding — SVG logo (blue/white variants, any size) |
| `NHSLoadingSpinner` | States — loading indicator |
| `NHSErrorCard` | States — error display when data fails to load |
| `NHSTooltip` | Interaction — styled chart tooltip |

### Type Exports

All prop interfaces are exported for consumers building wrapper components:

```tsx
import type {
  NHSBarChartProps,
  NHSKPICardProps,
  NHSTableProps,
  ColumnDef,
  SeriesConfig,
  GanttTask,
} from "nhs-london-data-viz-library";
```

### Theme & Utilities

```tsx
import {
  nhsColors,          // Full NHS colour palette object
  chartColors,        // Array of 12 categorical colours
  sequentialBlue,     // Array of 8 light-to-dark blues
  divergingRedBlue,   // Array of 9 red-white-blue values
  nhsTypography,      // Font family, weights, sizes
  chartDefaults,      // Default chart config (height, animation, grid)
  getChartColor,      // getChartColor(index) - cycles through palette
} from "nhs-london-data-viz-library";
```

## 🎨 Colour Reference

```tsx
// Core Brand
nhsColors.nhsBlue       // #005EB8
nhsColors.nhsDarkBlue   // #003087
nhsColors.nhsBrightBlue // #0072CE
nhsColors.nhsLightBlue  // #41B6E6

// Semantic
nhsColors.nhsGreen      // #009639 (positive/success)
nhsColors.nhsRed        // #DA291C (negative/alert)
nhsColors.nhsOrange     // #ED8B00 (warning)
nhsColors.nhsYellow     // #FAE100 (caution)

// Neutrals
nhsColors.nhsBlack      // #231F20
nhsColors.nhsDarkGrey   // #425563
nhsColors.nhsMidGrey    // #768692
nhsColors.nhsPaleGrey   // #E8EDEE
nhsColors.nhsWhite      // #FFFFFF
```

## 🏥 Using with Palantir Foundry OSDK React Apps

This library works **out of the box** with the default Foundry OSDK React template. No special Vite configuration is needed.

```bash
# In your Foundry OSDK React repo
npm install nhs-london-data-viz-library nhsuk-frontend recharts
```

Then import and use components as shown in the Quick Start above.

## 🔧 Development (for contributors)

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
git clone git@github.com:nhsengland/nhs-london-data-viz-library.git
cd nhs-london-data-viz-library
npm install
```

### Build the library

```bash
npm run build:lib
```

Produces:
- `dist-lib/index.js` — Pure ESM bundle (~43 KB)
- `dist-lib/types/` — Full TypeScript declarations

### Run tests

```bash
npm run test
```

44 tests across 9 suites covering rendering, props, interactions, and accessibility.

### Lint

```bash
npm run lint
```

### Project structure

```
src/nhs-viz/
├── index.ts                  ← Library entry point & type exports
├── theme.ts                  ← NHS colours, typography, chart defaults
├── bar-chart/
│   ├── NHSBarChart.tsx
│   └── NHSBarChart.test.tsx
├── kpi-card/
│   ├── NHSKPICard.tsx
│   └── NHSKPICard.test.tsx
├── table/
│   ├── NHSTable.tsx
│   └── NHSTable.test.tsx
├── sub-navigation/
│   ├── SubNavigation.tsx
│   ├── SubNavigation.test.tsx
│   └── sub-navigation.css
├── ... (14 more component folders)
```

### Publishing a new version

1. Update components and ensure tests pass
2. Push changes to `main`
3. Create a GitHub Release with a semantic version tag (e.g., `1.1.0`)
4. GitHub Actions automatically builds, tests, and publishes to npmjs.com

## 📁 What's Published to npm

> ℹ️ The `dist-lib/` folder is **not committed to the repository**. It is generated during the GitHub Actions CI workflow (`npm run build:lib`) and included in the npm package automatically.

```
nhs-london-data-viz-library/
├── dist-lib/                         ← Generated at build time by CI
│   ├── index.js              ← ESM bundle (all components)
│   └── types/                ← TypeScript declarations
│       ├── index.d.ts
│       ├── theme.d.ts
│       ├── bar-chart/
│       ├── kpi-card/
│       ├── table/
│       └── ... (all component types)
├── src/nhs-viz/sub-navigation/
│   └── sub-navigation.css    ← Optional SubNavigation styles
├── package.json
├── README.md
└── LICENSE
```

## 📋 Design Principles

Built following the [NHS England Data Viz Community of Practice](https://nhsengland.github.io/data-viz-community-of-practice/) guidelines:

- ✅ NHS brand colours with WCAG 2.1 AA accessible contrast
- ✅ Categorical palette ordered for colour-blind distinction
- ✅ Sequential and diverging palettes for continuous data
- ✅ Arial font (NHS Design System standard)
- ✅ Responsive — all components adapt to container width
- ✅ Accessible — ARIA labels, keyboard navigation, screen reader support
- ✅ Pure ESM — no CommonJS, works in all modern bundlers
- ✅ Tree-shakeable — import only what you use
- ✅ TypeScript-first — full type definitions included

## 📄 License

MIT

## 👥 Maintainers

**NHS London Data Team**
📧 england.london.info-out_of_hospital@nhs.net
