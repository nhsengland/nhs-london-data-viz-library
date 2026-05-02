import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults } from "../theme";

export interface SeriesConfig {
  key: string;
  type: "bar" | "line";
  color?: string;
  yAxisId?: string;
}

export interface NHSComboChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesConfig[];
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  dualAxis?: boolean;
  yAxisLabel?: string;
  yAxisRightLabel?: string;
}

export const NHSComboChart: React.FC<NHSComboChartProps> = ({
  data,
  xKey,
  series,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  showLegend = true,
  showGrid = true,
  dualAxis = false,
  yAxisLabel,
  yAxisRightLabel,
}) => {
  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={8} barCategoryGap="20%">
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartDefaults.gridColor} />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: chartDefaults.axisColor } : undefined}
          />
          {dualAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
              label={yAxisRightLabel ? { value: yAxisRightLabel, angle: 90, position: "insideRight", fill: chartDefaults.axisColor } : undefined}
            />
          )}
          <Tooltip content={<NHSTooltip />} />
          {showLegend && <Legend wrapperStyle={{ fontSize: chartDefaults.fontSize }} formatter={(value: string) => <span style={{ color: "#425563" }}>{value}</span>} />}
          {series.map((s, index) =>
            s.type === "bar" ? (
              <Bar
                key={s.key}
                dataKey={s.key}
                fill={s.color ?? chartColors[index % chartColors.length]}
                yAxisId={s.yAxisId ?? "left"}
                barSize={30}
                radius={0}
              />
            ) : (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color ?? chartColors[index % chartColors.length]}
                strokeWidth={2}
                yAxisId={s.yAxisId ?? "left"}
                dot={{ r: 4 }}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
