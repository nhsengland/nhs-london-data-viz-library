import React from "react";
import {
  LineChart,
  AreaChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults, nhsColors } from "../theme";

export interface ReferenceLineConfig {
  value: number;
  label: string;
  color?: string;
}

export interface NHSLineChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: string[];
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  area?: boolean;
  stacked?: boolean;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showDots?: boolean;
  curved?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  referenceLines?: ReferenceLineConfig[];
}

export const NHSLineChart: React.FC<NHSLineChartProps> = ({
  data,
  xKey,
  yKeys,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  area = false,
  stacked = false,
  colors = chartColors,
  showLegend = true,
  showGrid = true,
  showDots = true,
  curved = true,
  xAxisLabel,
  yAxisLabel,
  referenceLines = [],
}) => {
  const sharedAxis = (
    <>
      {showGrid && (
        <CartesianGrid strokeDasharray="3 3" stroke={chartDefaults.gridColor} />
      )}
      <XAxis
        dataKey={xKey}
        tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
        label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -10, fill: chartDefaults.axisColor } : undefined}
      />
      <YAxis
        tick={{ fontSize: chartDefaults.fontSize, fill: chartDefaults.axisColor }}
        label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", fill: chartDefaults.axisColor } : undefined}
      />
          <Tooltip content={<NHSTooltip />} />
      {showLegend && <Legend wrapperStyle={{ fontSize: chartDefaults.fontSize }} formatter={(value: string) => <span style={{ color: "#425563" }}>{value}</span>} />}
    </>
  );

  const referenceLineElements = referenceLines.map((line) => (
    <ReferenceLine
      key={line.label}
      y={line.value}
      stroke={line.color ?? nhsColors.nhsRed}
      strokeDasharray="5 5"
      label={{
        value: line.label,
        fill: line.color ?? nhsColors.nhsRed,
        fontSize: 11,
        position: "insideBottomRight",
      }}
    />
  ));

  if (area) {
    return (
      <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            {sharedAxis}
            {yKeys.map((key, index) => (
              <Area
                key={key}
                type={curved ? "monotone" : "linear"}
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.3}
                stackId={stacked ? "stack" : undefined}
                dot={showDots}
              />
            ))}
            {referenceLineElements}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {sharedAxis}
          {yKeys.map((key, index) => (
            <Line
              key={key}
              type={curved ? "monotone" : "linear"}
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={showDots ? { r: 4 } : false}
              activeDot={{ r: 6 }}
            />
          ))}
          {referenceLineElements}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
