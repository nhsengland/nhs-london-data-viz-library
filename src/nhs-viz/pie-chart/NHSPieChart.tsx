import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults, nhsColors } from "../theme";

export interface PieDataItem {
  name: string;
  value: number;
}

export interface NHSPieChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: PieDataItem[];
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  donut?: boolean;
  colors?: string[];
  showLegend?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
}

export const NHSPieChart: React.FC<NHSPieChartProps> = ({
  data,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  donut = false,
  colors = chartColors,
  showLegend = true,
  showLabels = true,
}) => {
  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={donut ? "55%" : 0}
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            label={showLabels ? ({
              name,
              percent,
              fill,
              x,
              y,
              textAnchor,
            }: {
              name?: string;
              percent?: number;
              fill?: string;
              x?: number;
              y?: number;
              textAnchor?: string;
            }) => (
              <text
                x={x}
                y={y}
                textAnchor={textAnchor as "start" | "middle" | "end" | undefined}
                dominantBaseline="central"
                fontSize={12}
              >
                <tspan fill={nhsColors.nhsDarkGrey}>{name ?? ""} </tspan>
                <tspan fill={fill ?? nhsColors.nhsDarkGrey} fontWeight={700}>
                  ({((percent ?? 0) * 100).toFixed(0)}%)
                </tspan>
              </text>
            ) : false}
            labelLine={showLabels ? { stroke: nhsColors.nhsMidGrey, strokeDasharray: "3 3", strokeWidth: 1 } : false}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke={nhsColors.nhsWhite}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<NHSTooltip />} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: chartDefaults.fontSize }}
              formatter={(value: string) => <span style={{ color: nhsColors.nhsDarkGrey }}>{value}</span>}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
