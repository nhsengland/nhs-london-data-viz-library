import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults, nhsColors } from "../theme";

export interface ReferenceLineConfig {
  value: number;
  label: string;
  color?: string;
}

export interface NHSBarChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  layout?: "vertical" | "horizontal";
  stacked?: boolean;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showValues?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  referenceLines?: ReferenceLineConfig[];
  barSize?: number;
}

export const NHSBarChart: React.FC<NHSBarChartProps> = ({
  data,
  xKey,
  yKeys,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  layout = "horizontal",
  stacked = false,
  colors = chartColors,
  showLegend = true,
  showGrid = true,
  showValues = false,
  xAxisLabel,
  yAxisLabel,
  referenceLines = [],
  barSize,
}) => {
  const isVertical = layout === "vertical";

  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={isVertical ? "vertical" : "horizontal"}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartDefaults.gridColor}
            />
          )}
          {isVertical ? (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
                label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -10, fill: chartDefaults.axisColor } : undefined}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
                width={120}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: chartDefaults.axisColor } : undefined}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
                label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -10, fill: chartDefaults.axisColor } : undefined}
              />
              <YAxis
                tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: chartDefaults.axisColor } : undefined}
              />
            </>
          )}
          <Tooltip content={<NHSTooltip />} />
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: chartDefaults.fontSize }} formatter={(value: string) => <span style={{ color: "#425563" }}>{value}</span>} />
          )}
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId={stacked ? "stack" : undefined}
              barSize={barSize}
              radius={0}
            >
              {showValues && (
                <LabelList
                  dataKey={key}
                  position={isVertical ? "right" : "top"}
                  style={{ fontSize: 11, fill: nhsColors.nhsDarkGrey }}
                />
              )}
            </Bar>
          ))}
          {referenceLines.map((line) => (
            <ReferenceLine
              key={line.label}
              y={isVertical ? undefined : line.value}
              x={isVertical ? line.value : undefined}
              stroke={line.color ?? nhsColors.nhsRed}
              strokeDasharray="5 5"
              label={{
                value: line.label,
                fill: line.color ?? nhsColors.nhsRed,
                fontSize: 11,
                position: "insideBottomRight",
              }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
