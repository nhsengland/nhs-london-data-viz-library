import React from "react";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { NHSTooltip } from "../tooltip/NHSTooltip";
import { chartColors, chartDefaults } from "../theme";

export interface TreemapDataItem {
  name: string;
  value: number;
  children?: TreemapDataItem[];
  [key: string]: unknown;
}

export interface NHSTreemapProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: TreemapDataItem[];
  title?: string;
  subtitle?: string;
  source?: string;
  height?: number;
  colors?: string[];
}

interface TreemapContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
  colors: string[];
}

const CustomTreemapContent: React.FC<TreemapContentProps> = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name,
  index = 0,
  colors,
}) => {
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={colors[index % colors.length]}
        stroke="#fff"
        strokeWidth={2}
        rx={2}
      />
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={Math.min(14, width / 8)}
          fontWeight={300}
        >
          {name}
        </text>
      )}
    </g>
  );
};

export const NHSTreemap: React.FC<NHSTreemapProps> = ({
  data,
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  colors = chartColors,
}) => {
  return (
    <ChartContainer title={title} subtitle={subtitle} source={source} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="value"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomTreemapContent colors={colors} />}
        >
          <Tooltip content={<NHSTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
