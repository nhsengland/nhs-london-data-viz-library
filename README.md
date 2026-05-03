# NHS London Data Visualization Component Library

[![Build](https://github.com/nhsengland/nhs-london-data-viz-library/actions/workflows/publish.yml/badge.svg)](https://github.com/nhsengland/nhs-london-data-viz-library/actions/workflows/publish.yml)
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
import {
  NHSBarChart,
  NHSKPICard,
  NHSSPCChart,
  NHSHeader,
  NHSFilters,
  nhsColors,
} from "nhs-london-data-viz-library";

// Required: NHS Design System base styles
import "nhsuk-frontend/dist/nhsuk/nhsuk-frontend.css";

// Optional: only needed if using SubNavigation component
import "nhs-london-data-viz-library/sub-navigation.css";

function App() {
  return (
    <div>
      <NHSHeader
        title="My Dashboard"
        dataFreshness={{ lastRefreshed: "1 May 2026", latestDataAvailable: "March 2026" }}
      />

      <NHSKPICard
        title="A&E Attendances"
        value="2.31M"
        trend="up"
        trendValue="+3.2%"
        trendLabel="vs last month"
        color={nhsColors.nhsBlue}
      />

      <NHSBarChart
        data={[
          { name: "London", value: 420 },
          { name: "South East", value: 380 },
          { name: "East", value: 310 },
        ]}
        xKey="name"
        yKeys={["value"]}
        title="Admissions by Region"
      />

      <NHSSPCChart
        data={[
          { label: "Jan", value: 74.2 },
          { label: "Feb", value: 73.8 },
          { label: "Mar", value: 75.1 },
          // ... more data points
        ]}
        chartType="xmr"
        title="A&E 4-Hour Performance"
        improvementDirection="up"
        target={95}
        targetLabel="95% national target"
        showViolations
        showVariationIcon
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
| `NHSSPCChart` | Process control — XmR, P-chart, C-chart, U-chart, Run chart |
| `NHSHeatmap` | Patterns — matrix heatmaps with sequential colour scales |
| `NHSTreemap` | Hierarchies — area-based proportional visualization |
| `NHSGanttChart` | Timelines — horizontal bars with progress indicators |
| `NHSSparkline` | At-a-glance — inline mini-charts for tables and cards |

### SPC Chart Features

The `NHSSPCChart` follows NHS England "Making Data Count" methodology:

- **Auto-calculated control limits** (UCL/LCL) and mean from your data
- **Rule violation detection**: beyond limits, shifts (7+), trends (7+), 2-of-3
- **NHS improvement icons**: 🟢 improving, 🔴 deteriorating, ⚪ common cause
- **Chart types**: XmR (individuals), P-chart, C-chart, U-chart, Run chart
- **Optional target line** with label
- **Control limit shading** between UCL and LCL
- **Recalculated limits** support for process changes
- **Tooltip** showing point details and which rule was violated

### Dashboard & Data

| Component | Use Case |
|-----------|----------|
| `NHSKPICard` | Key metrics — scorecard tiles with trend arrows |
| `NHSTable` | Data exploration — sortable, filterable, paginated, conditional formatting |
| `NHSFilters` | Filter panel — select, multi-select, radio, search, date, date-range |
| `ChartContainer` | Layout — wrapper with title, subtitle, download button |

### Layout & Navigation

| Component | Use Case |
|-----------|----------|
| `NHSHeader` | App header — hamburger toggle, NHS logo, title, data freshness bar |
| `NHSSideNav` | Side navigation — collapsible panel with grouped items and backdrop |
| `SubNavigation` | Tabs — horizontal tab bar for switching between in-page views |

### UI Components

| Component | Use Case |
|-----------|----------|
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
  NHSSPCChartProps,
  SPCDataPoint,
  SPCChartType,
  SPCVariation,
  SPCLimitOverride,
  NHSHeaderProps,
  DataFreshnessConfig,
  NHSSideNavProps,
  NavItem,
  NHSFiltersProps,
  FilterField,
  FilterOption,
  NHSTableProps,
  ColumnDef,
  ConditionalFormatRule,
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
├── spc-chart/
│   └── NHSSPCChart.tsx
├── header/
│   └── NHSHeader.tsx
├── side-nav/
│   └── NHSSideNav.tsx
├── filters/
│   └── NHSFilters.tsx
├── sub-navigation/
│   ├── SubNavigation.tsx
│   ├── SubNavigation.test.tsx
│   └── sub-navigation.css
├── ... (14 more component folders)
```

### Publishing a new version

1. Update components and ensure tests pass
2. Push changes to `main`
3. Create a GitHub Release with a semantic version tag (e.g., `1.3.0`)
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
│       ├── spc-chart/
│       ├── header/
│       ├── side-nav/
│       ├── filters/
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
- ✅ SPC methodology following NHS "Making Data Count"
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
