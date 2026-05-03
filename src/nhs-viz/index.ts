// Layout & Navigation Components
export { NHSHeader } from "./header/NHSHeader";
export { NHSSideNav } from "./side-nav/NHSSideNav";
export { NHSFilters } from "./filters/NHSFilters";
export { NHSSPCChart } from "./spc-chart/NHSSPCChart";

// Components
export { ChartContainer } from "./chart-container/ChartContainer";
export { NHSBarChart } from "./bar-chart/NHSBarChart";
export { NHSLineChart } from "./line-chart/NHSLineChart";
export { NHSComboChart } from "./combo-chart/NHSComboChart";
export { NHSPieChart } from "./pie-chart/NHSPieChart";
export { NHSScatterChart } from "./scatter-chart/NHSScatterChart";
export { NHSTable } from "./table/NHSTable";
export { NHSKPICard } from "./kpi-card/NHSKPICard";
export { NHSHeatmap } from "./heatmap/NHSHeatmap";
export { NHSTreemap } from "./treemap/NHSTreemap";
export { NHSGanttChart } from "./gantt-chart/NHSGanttChart";
export { NHSSparkline } from "./sparkline/NHSSparkline";
export { NHSLogo } from "./logo/NHSLogo";
export { NHSErrorCard } from "./error-card/NHSErrorCard";
export { NHSLoadingSpinner } from "./loading-spinner/NHSLoadingSpinner";
export { NHSTooltip } from "./tooltip/NHSTooltip";
export { SubNavigation } from "./sub-navigation/SubNavigation";

// Prop types (for consumers who need to type wrapper components)
export type { NHSHeaderProps, DataFreshnessConfig } from "./header/NHSHeader";
export type { NHSSideNavProps, NavItem } from "./side-nav/NHSSideNav";
export type { NHSFiltersProps, FilterField, FilterOption } from "./filters/NHSFilters";
export type { NHSSPCChartProps, SPCDataPoint, SPCChartType, SPCVariation, SPCLimitOverride } from "./spc-chart/NHSSPCChart";
export type { ChartContainerProps } from "./chart-container/ChartContainer";
export type { NHSBarChartProps, ReferenceLineConfig } from "./bar-chart/NHSBarChart";
export type { NHSLineChartProps } from "./line-chart/NHSLineChart";
export type { NHSComboChartProps, SeriesConfig } from "./combo-chart/NHSComboChart";
export type { NHSPieChartProps, PieDataItem } from "./pie-chart/NHSPieChart";
export type { NHSScatterChartProps, ScatterSeries } from "./scatter-chart/NHSScatterChart";
export type { NHSTableProps, ColumnDef, ConditionalFormatRule } from "./table/NHSTable";
export type { NHSKPICardProps } from "./kpi-card/NHSKPICard";
export type { NHSHeatmapProps } from "./heatmap/NHSHeatmap";
export type { NHSTreemapProps, TreemapDataItem } from "./treemap/NHSTreemap";
export type { NHSGanttChartProps, GanttTask } from "./gantt-chart/NHSGanttChart";
export type { NHSSparklineProps } from "./sparkline/NHSSparkline";
export type { NHSErrorCardProps } from "./error-card/NHSErrorCard";
export type { NHSLoadingSpinnerProps } from "./loading-spinner/NHSLoadingSpinner";
export type { NHSTooltipProps, TooltipPayloadItem } from "./tooltip/NHSTooltip";

// Theme & utilities
export {
  nhsColors,
  chartColors,
  sequentialBlue,
  divergingRedBlue,
  nhsTypography,
  chartDefaults,
  getChartColor,
} from "./theme";
