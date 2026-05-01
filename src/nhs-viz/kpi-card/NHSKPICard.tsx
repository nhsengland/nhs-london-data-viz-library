import React from "react";
import { nhsColors, nhsTypography } from "../theme";

export interface NHSKPICardProps {
  /** Additional CSS class name for the root element */
  className?: string;
  title: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendLabel?: string;
  color?: string;
}

export const NHSKPICard: React.FC<NHSKPICardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  trendLabel,
  color = nhsColors.nhsBlue,
  className,
}) => {
  const trendColors = {
    up: nhsColors.nhsGreen,
    down: nhsColors.nhsRed,
    neutral: nhsColors.nhsMidGrey,
  };
  const trendArrows = {
    up: "▲",
    down: "▼",
    neutral: "●",
  };

  return (
    <div
      className={className}
      style={{
        background: nhsColors.nhsWhite,
        border: `1px solid ${nhsColors.nhsPaleGrey}`,
        borderTop: `4px solid ${color}`,
        borderRadius: "4px",
        padding: "24px",
        fontFamily: nhsTypography.fontFamily,
        minWidth: "200px",
      }}
    >
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "14px",
          fontWeight: 600,
          color: nhsColors.nhsMidGrey,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: nhsColors.nhsDarkGrey,
            lineHeight: 1,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: "16px",
              color: nhsColors.nhsMidGrey,
              fontWeight: 400,
            }}
          >
            {unit}
          </span>
        )}
      </div>
      {trend && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              color: trendColors[trend],
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {trendArrows[trend]} {trendValue}
          </span>
          {trendLabel && (
            <span style={{ fontSize: "13px", color: nhsColors.nhsMidGrey }}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
