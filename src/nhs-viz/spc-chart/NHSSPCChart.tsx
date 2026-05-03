import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer } from "../chart-container/ChartContainer";
import { nhsColors, chartDefaults, nhsTypography } from "../theme";

// ─── SPC Rule Detection ───────────────────────────────────────────────────────

type RuleViolation = "special-high" | "special-low" | "shift" | "trend" | "2of3" | "none";

function detectViolations(
  values: number[],
  mean: number,
  ucl: number,
  lcl: number
): RuleViolation[] {
  const violations: RuleViolation[] = values.map(() => "none");

  for (let i = 0; i < values.length; i++) {
    // Rule 1: Point beyond control limits
    if (values[i] > ucl) { violations[i] = "special-high"; continue; }
    if (values[i] < lcl) { violations[i] = "special-low"; continue; }

    // Rule 2: Shift — 7+ consecutive points on same side of mean
    if (i >= 6) {
      const window = values.slice(i - 6, i + 1);
      const allAbove = window.every((v) => v > mean);
      const allBelow = window.every((v) => v < mean);
      if (allAbove || allBelow) { violations[i] = "shift"; continue; }
    }

    // Rule 3: Trend — 7+ consecutive increasing or decreasing
    if (i >= 6) {
      const window = values.slice(i - 6, i + 1);
      let increasing = true;
      let decreasing = true;
      for (let j = 1; j < window.length; j++) {
        if (window[j] <= window[j - 1]) increasing = false;
        if (window[j] >= window[j - 1]) decreasing = false;
      }
      if (increasing || decreasing) { violations[i] = "trend"; continue; }
    }

    // Rule 4: 2 of 3 consecutive points in outer third (beyond 2 sigma)
    if (i >= 2) {
      const sigma = (ucl - mean) / 3;
      const twoSigmaHigh = mean + 2 * sigma;
      const twoSigmaLow = mean - 2 * sigma;
      const window = values.slice(i - 2, i + 1);
      const beyondCount = window.filter((v) => v > twoSigmaHigh || v < twoSigmaLow).length;
      if (beyondCount >= 2) { violations[i] = "2of3"; continue; }
    }
  }

  return violations;
}

// ─── Variation Assessment ─────────────────────────────────────────────────────

export type SPCVariation = "common-cause" | "special-cause-improving" | "special-cause-deteriorating";

function assessVariation(
  violations: RuleViolation[],
  improvementDirection: "up" | "down"
): SPCVariation {
  const hasSpecial = violations.some((v) => v !== "none");
  if (!hasSpecial) return "common-cause";

  // Look at the last few special cause points
  const lastSpecial = [...violations].reverse().find((v) => v !== "none");
  if (lastSpecial === "special-high") {
    return improvementDirection === "up" ? "special-cause-improving" : "special-cause-deteriorating";
  }
  if (lastSpecial === "special-low") {
    return improvementDirection === "down" ? "special-cause-improving" : "special-cause-deteriorating";
  }
  return "common-cause";
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SPCChartType = "xmr" | "p-chart" | "c-chart" | "u-chart" | "run";

export interface SPCDataPoint {
  /** X-axis label (typically a date/period) */
  label: string;
  /** The measured value */
  value: number;
  /** Optional sample size (required for p-chart and u-chart) */
  sampleSize?: number;
  /** Optional annotation text for this point */
  annotation?: string;
}

export interface SPCLimitOverride {
  /** Index from which these limits apply */
  fromIndex: number;
  /** Recalculated mean */
  mean: number;
  /** Recalculated UCL */
  ucl: number;
  /** Recalculated LCL */
  lcl: number;
}

export interface NHSSPCChartProps {
  /** Data points for the chart */
  data: SPCDataPoint[];
  /** Type of SPC chart */
  chartType?: SPCChartType;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Data source attribution */
  source?: string;
  /** Chart height in pixels */
  height?: number;
  /** Direction that represents improvement (for NHS icons) */
  improvementDirection?: "up" | "down";
  /** Optional target/goal line value */
  target?: number;
  /** Optional target label */
  targetLabel?: string;
  /** Whether to shade the area between control limits */
  showControlLimitShading?: boolean;
  /** Whether to highlight rule violations with markers */
  showViolations?: boolean;
  /** Whether to show the NHS variation icon */
  showVariationIcon?: boolean;
  /** Manually override control limits (for recalculated limits) */
  limitOverrides?: SPCLimitOverride[];
  /** Additional CSS class name */
  className?: string;
}

// ─── Helper: Calculate Limits ─────────────────────────────────────────────────

function calculateLimits(data: SPCDataPoint[], chartType: SPCChartType) {
  const values = data.map((d) => d.value);
  const n = values.length;

  if (n < 2) return { mean: values[0] ?? 0, ucl: values[0] ?? 0, lcl: values[0] ?? 0 };

  if (chartType === "xmr" || chartType === "run") {
    const mean = values.reduce((a, b) => a + b, 0) / n;
    // Moving range
    const movingRanges: number[] = [];
    for (let i = 1; i < n; i++) {
      movingRanges.push(Math.abs(values[i] - values[i - 1]));
    }
    const avgMR = movingRanges.reduce((a, b) => a + b, 0) / movingRanges.length;
    const ucl = mean + 2.66 * avgMR;
    const lcl = mean - 2.66 * avgMR;
    return { mean, ucl, lcl };
  }

  if (chartType === "p-chart") {
    const totalDefects = values.reduce((a, b) => a + b, 0);
    const totalSamples = data.reduce((a, d) => a + (d.sampleSize ?? 1), 0);
    const pBar = totalDefects / totalSamples;
    const avgSample = totalSamples / n;
    const ucl = pBar + 3 * Math.sqrt((pBar * (1 - pBar)) / avgSample);
    const lcl = Math.max(0, pBar - 3 * Math.sqrt((pBar * (1 - pBar)) / avgSample));
    return { mean: pBar, ucl, lcl };
  }

  if (chartType === "c-chart") {
    const cBar = values.reduce((a, b) => a + b, 0) / n;
    const ucl = cBar + 3 * Math.sqrt(cBar);
    const lcl = Math.max(0, cBar - 3 * Math.sqrt(cBar));
    return { mean: cBar, ucl, lcl };
  }

  if (chartType === "u-chart") {
    const totalDefects = values.reduce((a, b) => a + b, 0);
    const totalUnits = data.reduce((a, d) => a + (d.sampleSize ?? 1), 0);
    const uBar = totalDefects / totalUnits;
    const avgUnits = totalUnits / n;
    const ucl = uBar + 3 * Math.sqrt(uBar / avgUnits);
    const lcl = Math.max(0, uBar - 3 * Math.sqrt(uBar / avgUnits));
    return { mean: uBar, ucl, lcl };
  }

  return { mean: 0, ucl: 0, lcl: 0 };
}

// ─── Variation Icon Component ─────────────────────────────────────────────────

const VariationIcon: React.FC<{ variation: SPCVariation }> = ({ variation }) => {
  if (variation === "special-cause-improving") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "4px", backgroundColor: "#e7f5e6", border: `1px solid ${nhsColors.nhsGreen}` }}>
        <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={nhsColors.nhsGreen} /><path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span style={{ fontSize: "13px", fontWeight: 700, color: nhsColors.nhsDarkGreen }}>Special cause — improving</span>
      </div>
    );
  }
  if (variation === "special-cause-deteriorating") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "4px", backgroundColor: "#fde8e8", border: `1px solid ${nhsColors.nhsRed}` }}>
        <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={nhsColors.nhsRed} /><path d="M7 7l6 6M13 7l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        <span style={{ fontSize: "13px", fontWeight: 700, color: nhsColors.nhsRed }}>Special cause — deteriorating</span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "4px", backgroundColor: nhsColors.nhsPaleGrey, border: `1px solid ${nhsColors.nhsMidGrey}` }}>
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={nhsColors.nhsMidGrey} /><rect x="6" y="9" width="8" height="2" rx="1" fill="white" /></svg>
      <span style={{ fontSize: "13px", fontWeight: 700, color: nhsColors.nhsDarkGrey }}>Common cause — no significant change</span>
    </div>
  );
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface SPCTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: Record<string, unknown> }>;
  label?: string;
}

const SPCTooltip: React.FC<SPCTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  const violation = point._violation as RuleViolation;
  const violationLabels: Record<string, string> = {
    "special-high": "⚠️ Beyond upper control limit",
    "special-low": "⚠️ Beyond lower control limit",
    "shift": "⚠️ Shift detected (7+ points same side)",
    "trend": "⚠️ Trend detected (7+ consecutive)",
    "2of3": "⚠️ 2 of 3 points in outer third",
    "none": "",
  };

  return (
    <div style={{ backgroundColor: nhsColors.nhsWhite, borderRadius: "6px", borderLeft: `4px solid ${nhsColors.nhsBlue}`, boxShadow: "0 2px 12px rgba(0,0,0,0.12)", padding: "12px 16px", fontFamily: nhsTypography.fontFamily, minWidth: "180px" }}>
      <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: 700, color: nhsColors.nhsDarkGrey }}>{label}</p>
      <p style={{ margin: "0 0 4px", fontSize: "14px", color: nhsColors.nhsDarkGrey }}>
        <strong>Value:</strong> {String(point.value)}
      </p>
      {point._annotation != null && (
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: nhsColors.nhsMidGrey, fontStyle: "italic" }}>
          {String(point._annotation as string)}
        </p>
      )}
      {violation && violation !== "none" && (
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: nhsColors.nhsRed, fontWeight: 600 }}>
          {violationLabels[violation]}
        </p>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * NHS Statistical Process Control (SPC) Chart.
 *
 * Supports XmR, P-chart, C-chart, U-chart, and Run charts following
 * NHS England "Making Data Count" methodology.
 *
 * Features:
 * - Auto-calculated control limits (UCL/LCL) and mean
 * - Rule violation detection (beyond limits, shifts, trends, 2-of-3)
 * - NHS improvement icons (improving/deteriorating/common cause)
 * - Optional target line
 * - Control limit shading
 * - Recalculated limits for process changes
 */
export const NHSSPCChart: React.FC<NHSSPCChartProps> = ({
  data,
  chartType = "xmr",
  title,
  subtitle,
  source,
  height = chartDefaults.height,
  improvementDirection = "up",
  target,
  targetLabel,
  showControlLimitShading = true,
  showViolations = true,
  showVariationIcon = true,
  limitOverrides,
  className,
}) => {
  const { chartData, mean, ucl, lcl, variation } = useMemo(() => {
    const { mean, ucl, lcl } = limitOverrides && limitOverrides.length > 0
      ? limitOverrides[limitOverrides.length - 1]
      : calculateLimits(data, chartType);

    const values = data.map((d) => d.value);
    const violations = chartType === "run"
      ? values.map(() => "none" as RuleViolation)
      : detectViolations(values, mean, ucl, lcl);

    const variation = assessVariation(violations, improvementDirection);

    const chartData = data.map((d, i) => ({
      label: d.label,
      value: d.value,
      mean,
      ucl,
      lcl,
      _violation: violations[i],
      _annotation: d.annotation,
      _isViolation: violations[i] !== "none",
    }));

    return { chartData, mean, ucl, lcl, violations, variation };
  }, [data, chartType, improvementDirection, limitOverrides]);

  const violationPoints = showViolations
    ? chartData.filter((d) => d._isViolation)
    : [];

  return (
    <div className={className}>
      <ChartContainer title={title} subtitle={subtitle} source={source}>
        {/* Variation icon */}
        {showVariationIcon && (
          <div style={{ marginBottom: "16px" }}>
            <VariationIcon variation={variation} />
          </div>
        )}

        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartDefaults.gridColor} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: chartDefaults.axisColor }}
              axisLine={{ stroke: chartDefaults.axisColor }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: chartDefaults.axisColor }}
              axisLine={{ stroke: chartDefaults.axisColor }}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<SPCTooltip />} />
            <Legend />

            {/* Control limit shading */}
            {showControlLimitShading && (
              <ReferenceArea y1={lcl} y2={ucl} fill={nhsColors.nhsBlue} fillOpacity={0.04} />
            )}

            {/* Mean line */}
            <ReferenceLine y={mean} stroke={nhsColors.nhsBlue} strokeDasharray="5 5" strokeWidth={1.5} label={{ value: `Mean: ${mean.toFixed(1)}`, position: "right", fontSize: 11, fill: nhsColors.nhsBlue }} />

            {/* UCL */}
            <ReferenceLine y={ucl} stroke={nhsColors.nhsMidGrey} strokeDasharray="3 3" strokeWidth={1} label={{ value: `UCL: ${ucl.toFixed(1)}`, position: "right", fontSize: 10, fill: nhsColors.nhsMidGrey }} />

            {/* LCL */}
            <ReferenceLine y={lcl} stroke={nhsColors.nhsMidGrey} strokeDasharray="3 3" strokeWidth={1} label={{ value: `LCL: ${lcl.toFixed(1)}`, position: "right", fontSize: 10, fill: nhsColors.nhsMidGrey }} />

            {/* Target line */}
            {target != null && (
              <ReferenceLine y={target} stroke={nhsColors.nhsRed} strokeDasharray="8 4" strokeWidth={1.5} label={{ value: targetLabel ?? `Target: ${target}`, position: "right", fontSize: 11, fill: nhsColors.nhsRed }} />
            )}

            {/* Main data line */}
            <Line
              type="linear"
              dataKey="value"
              stroke={nhsColors.nhsDarkGrey}
              strokeWidth={2}
              dot={(props: Record<string, unknown>) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: { _isViolation: boolean; _violation: RuleViolation } };
                const isViolation = payload?._isViolation;
                const color = isViolation ? nhsColors.nhsOrange : nhsColors.nhsBlue;
                const size = isViolation ? 6 : 4;
                return (
                  <circle
                    key={`dot-${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={size}
                    fill={color}
                    stroke={isViolation ? nhsColors.nhsRed : nhsColors.nhsBlue}
                    strokeWidth={isViolation ? 2 : 1}
                  />
                );
              }}
              name="Value"
              activeDot={{ r: 6, fill: nhsColors.nhsBlue }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Violation summary */}
        {showViolations && violationPoints.length > 0 && (
          <div style={{ marginTop: "12px", padding: "8px 12px", backgroundColor: "#fef8e8", border: `1px solid ${nhsColors.nhsWarmYellow}`, borderRadius: "4px", fontSize: "13px" }}>
            <strong>⚠️ {violationPoints.length} special cause signal{violationPoints.length > 1 ? "s" : ""} detected</strong>
            <span style={{ color: nhsColors.nhsMidGrey }}> — highlighted points indicate potential process changes requiring investigation.</span>
          </div>
        )}
      </ChartContainer>
    </div>
  );
};
