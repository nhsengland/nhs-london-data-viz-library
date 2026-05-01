import React, { useState } from "react";
import { ChartContainer } from "../chart-container/ChartContainer";
import { nhsColors, nhsTypography, sequentialBlue } from "../theme";

export interface NHSHeatmapProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  valueKey: string;
  title?: string;
  subtitle?: string;
  source?: string;
  colors?: string[];
  showValues?: boolean;
}

export const NHSHeatmap: React.FC<NHSHeatmapProps> = ({
  data,
  xKey,
  yKey,
  valueKey,
  title,
  subtitle,
  source,
  colors = sequentialBlue,
  showValues = true,
}) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const xLabels = [...new Set(data.map((d) => String(d[xKey])))];
  const yLabels = [...new Set(data.map((d) => String(d[yKey])))];

  const values = data.map((d) => Number(d[valueKey]) || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getColor = (val: number): string => {
    if (maxVal === minVal) return colors[Math.floor(colors.length / 2)];
    const ratio = (val - minVal) / (maxVal - minVal);
    const idx = Math.min(Math.floor(ratio * (colors.length - 1)), colors.length - 1);
    return colors[idx];
  };

  const getTextColor = (val: number): string => {
    if (maxVal === minVal) return nhsColors.nhsDarkGrey;
    const ratio = (val - minVal) / (maxVal - minVal);
    // For diverging palettes: middle values (white/light) need dark text
    // Check if the background is light by looking at the ratio relative to middle
    const midPoint = (colors.length - 1) / 2;
    const colorIdx = Math.min(Math.floor(ratio * (colors.length - 1)), colors.length - 1);
    const distFromMid = Math.abs(colorIdx - midPoint) / midPoint;
    // If close to middle (light colours), use dark text; if at extremes (dark colours), use white
    return distFromMid < 0.4 ? nhsColors.nhsDarkGrey : ratio > 0.5 ? nhsColors.nhsWhite : nhsColors.nhsDarkGrey;
  };

  return (
    <ChartContainer title={title} subtitle={subtitle} source={source}>
      <div className="nhs-heatmap-wrapper" style={{ overflowX: "auto", position: "relative" }}>
        <table
          className="nhs-heatmap-table"
          style={{
            borderCollapse: "separate",
            borderSpacing: "2px",
            fontFamily: nhsTypography.fontFamily,
            display: "inline-table",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "8px", fontSize: "12px" }} />
              {xLabels.map((label) => (
                <th
                  key={label}
                  style={{
                    padding: "8px",
                    fontSize: "12px",
                    color: nhsColors.nhsDarkGrey,
                    fontWeight: 600,
                    textAlign: "center",
                    minWidth: "60px",
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yLabels.map((yLabel) => (
              <tr key={yLabel}>
                <td
                  style={{
                    padding: "8px 12px 8px 0",
                    fontSize: "12px",
                    color: nhsColors.nhsDarkGrey,
                    fontWeight: 600,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    border: "none",
                    background: "none",
                  }}
                >
                  {yLabel}
                </td>
                {xLabels.map((xLabel) => {
                  const cell = data.find(
                    (d) => String(d[xKey]) === xLabel && String(d[yKey]) === yLabel
                  );
                  const val = cell ? Number(cell[valueKey]) || 0 : 0;
                  return (
                    <td
                      key={xLabel}
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: getColor(val),
                        color: getTextColor(val),
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: "12px",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: "2px",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const parentRect = e.currentTarget.closest(".nhs-heatmap-wrapper")?.getBoundingClientRect();
                        if (parentRect) {
                          setTooltip({
                            x: rect.left - parentRect.left + rect.width / 2,
                            y: rect.top - parentRect.top - 8,
                            label: `${yLabel} / ${xLabel}`,
                            value: val,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {showValues ? val : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Custom NHS-styled tooltip */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
              backgroundColor: nhsColors.nhsWhite,
              borderRadius: "6px",
              borderLeft: `4px solid ${nhsColors.nhsBlue}`,
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
              padding: "8px 12px",
              fontFamily: nhsTypography.fontFamily,
              pointerEvents: "none",
              zIndex: 100,
              whiteSpace: "nowrap",
            }}
          >
            <p style={{ margin: "0 0 4px 0", fontSize: "12px", fontWeight: 700, color: nhsColors.nhsDarkGrey }}>
              {tooltip.label}
            </p>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: nhsColors.nhsBlue }}>
              {tooltip.value.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </ChartContainer>
  );
};
