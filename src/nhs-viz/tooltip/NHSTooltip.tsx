import React from "react";
import { nhsColors, nhsTypography, getChartColor } from "../theme";

export interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
}

export interface NHSTooltipProps {
  /** Additional CSS class name for the root element */
  className?: string;
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  /** Optional: show previous values for comparison (key = series name, value = previous value) */
  previousValues?: Record<string, number>;
}

/**
 * NHS-styled custom tooltip for Recharts.
 * Card-style with blue accent border, colour dots, and optional % change.
 */
export const NHSTooltip: React.FC<NHSTooltipProps> = ({
  active,
  payload,
  label,
  previousValues,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: nhsColors.nhsWhite,
        borderRadius: "6px",
        borderLeft: `4px solid ${nhsColors.nhsBlue}`,
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
        padding: "12px 16px",
        fontFamily: nhsTypography.fontFamily,
        minWidth: "160px",
        maxWidth: "280px",
      }}
    >
      {/* Title row */}
      {label != null && (
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "13px",
            fontWeight: 700,
            color: nhsColors.nhsDarkGrey,
            borderBottom: `1px solid ${nhsColors.nhsPaleGrey}`,
            paddingBottom: "6px",
          }}
        >
          {label}
        </p>
      )}

      {/* Value rows */}
      {payload.map((entry, index) => {
        const prevVal = previousValues?.[String(entry.name ?? entry.dataKey ?? "")];
        const currentVal = typeof entry.value === "number" ? entry.value : null;
        const pctChange =
          prevVal != null && currentVal != null && prevVal !== 0
            ? ((currentVal - prevVal) / prevVal) * 100
            : null;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "3px 0",
            }}
          >
            {/* Left: colour dot + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: entry.color ?? getChartColor(index),
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: nhsColors.nhsDarkGrey,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {entry.name ?? entry.dataKey ?? ""}
              </span>
            </div>

            {/* Right: value + optional % change */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: nhsColors.nhsDarkGrey,
                  whiteSpace: "nowrap",
                }}
              >
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString()
                  : String(entry.value ?? "")}
              </span>
              {pctChange != null && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: pctChange > 0 ? nhsColors.nhsGreen : pctChange < 0 ? nhsColors.nhsRed : nhsColors.nhsMidGrey,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pctChange > 0 ? "▲" : pctChange < 0 ? "▼" : "●"}
                  {Math.abs(pctChange).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
