import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { nhsColors, nhsTypography } from "../theme";

export interface NHSSparklineProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  showLabel?: boolean;
  label?: string;
  showValue?: boolean;
}

export const NHSSparkline: React.FC<NHSSparklineProps> = ({
  data,
  color = nhsColors.nhsBlue,
  height = 40,
  width = 120,
  showLabel = false,
  label,
  showValue = false,
}) => {
  const chartData = data.map((value, index) => ({ index, value }));
  const lastValue = data[data.length - 1];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: nhsTypography.fontFamily,
      }}
    >
      {showLabel && label && (
        <span
          style={{
            fontSize: "13px",
            color: nhsColors.nhsDarkGrey,
            fontWeight: 500,
            minWidth: "80px",
          }}
        >
          {label}
        </span>
      )}
      <div style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <YAxis domain={["dataMin", "dataMax"]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showValue && (
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: nhsColors.nhsDarkGrey,
          }}
        >
          {lastValue != null ? lastValue.toLocaleString() : ""}
        </span>
      )}
    </div>
  );
};
