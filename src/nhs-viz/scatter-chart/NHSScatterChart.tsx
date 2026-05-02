import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults } from "../theme";

export interface ScatterSeries {
  name: string;
  data: Record<string, number>[];
  color?: string;
}

export interface NHSScatterChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  series: ScatterSeries[];
  xKey: string;
  yKey: string;
  zKey?: string;
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const NHSScatterChart: React.FC<NHSScatterChartProps> = ({
  series,
  xKey,
  yKey,
  zKey,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  showLegend = true,
  showGrid = true,
  xAxisLabel,
  yAxisLabel,
}) => {
  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 30, left: 20, bottom: xAxisLabel ? 40 : 20 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartDefaults.gridColor} />
          )}
          <XAxis
            dataKey={xKey}
            type="number"
            tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
            name={xKey}
            label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -10, fill: chartDefaults.axisColor } : undefined}
          />
          <YAxis
            dataKey={yKey}
            type="number"
            tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
            name={yKey}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: chartDefaults.axisColor } : undefined}
          />
          {zKey && <ZAxis dataKey={zKey} range={[50, 400]} />}
          <Tooltip content={<NHSTooltip />} />
          {showLegend && (
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: chartDefaults.fontSize, paddingBottom: "12px" }}
              formatter={(value: string) => <span style={{ color: "#425563" }}>{value}</span>}
            />
          )}
          {series.map((s, index) => (
            <Scatter
              key={s.name}
              name={s.name}
              data={s.data}
              fill={s.color ?? chartColors[index % chartColors.length]}
              fillOpacity={0.7}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
