import React from "react";
import { ChartContainer } from "../chart-container/ChartContainer";
import { chartColors, nhsColors, nhsTypography } from "../theme";

export interface GanttTask {
  name: string;
  start: number;
  end: number;
  category?: string;
  progress?: number;
}

export interface NHSGanttChartProps {
  /** Additional CSS class name for the root element */
  className?: string;
  tasks: GanttTask[];
  title?: string;
  subtitle?: string;
  source?: string;
  xAxisLabel?: string;
  colors?: string[];
}

export const NHSGanttChart: React.FC<NHSGanttChartProps> = ({
  tasks,
  title,
  subtitle,
  source,
  xAxisLabel,
  colors = chartColors,
}) => {
  const allValues = tasks.flatMap((t) => [t.start, t.end]);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;

  const categories = [...new Set(tasks.map((t) => t.category ?? "default"))];
  const getCategoryColor = (cat: string): string => {
    const idx = categories.indexOf(cat);
    return colors[idx % colors.length];
  };

  const barHeight = 28;
  const rowHeight = 40;
  const leftPad = 180;
  const rightPad = 40;
  const topPad = 30;
  const chartWidth = 800;
  const barArea = chartWidth - leftPad - rightPad;
  const chartHeight = topPad + tasks.length * rowHeight + 40;

  const ticks: number[] = [];
  const tickCount = 6;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(minVal + (range * i) / tickCount);
  }

  return (
    <ChartContainer title={title} subtitle={subtitle} source={source}>
      <div style={{ overflowX: "auto" }}>
        <svg
          width={chartWidth}
          height={chartHeight}
          style={{ fontFamily: nhsTypography.fontFamily }}
        >
          {ticks.map((tick) => {
            const x = leftPad + ((tick - minVal) / range) * barArea;
            return (
              <line
                key={tick}
                x1={x}
                y1={topPad}
                x2={x}
                y2={chartHeight - 30}
                stroke={nhsColors.nhsPaleGrey}
                strokeDasharray="3 3"
              />
            );
          })}

          {ticks.map((tick) => {
            const x = leftPad + ((tick - minVal) / range) * barArea;
            return (
              <text
                key={`label-${tick}`}
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize={11}
                fill={nhsColors.nhsMidGrey}
              >
                {Math.round(tick)}
              </text>
            );
          })}

          {xAxisLabel && (
            <text
              x={leftPad + barArea / 2}
              y={chartHeight}
              textAnchor="middle"
              fontSize={12}
              fill={nhsColors.nhsMidGrey}
            >
              {xAxisLabel}
            </text>
          )}

          {tasks.map((task, i) => {
            const y = topPad + i * rowHeight;
            const x = leftPad + ((task.start - minVal) / range) * barArea;
            const width = ((task.end - task.start) / range) * barArea;
            const barColor = getCategoryColor(task.category ?? "default");
            return (
              <g key={i}>
                <text
                  x={leftPad - 8}
                  y={y + rowHeight / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontSize={12}
                  fill={nhsColors.nhsDarkGrey}
                  fontWeight={500}
                >
                  {task.name}
                </text>
                <rect
                  x={x}
                  y={y + (rowHeight - barHeight) / 2}
                  width={Math.max(width, 2)}
                  height={barHeight}
                  rx={3}
                  fill={barColor}
                  opacity={0.4}
                />
                {task.progress != null && task.progress > 0 && (
                  <rect
                    x={x}
                    y={y + (rowHeight - barHeight) / 2}
                    width={Math.max(width * (task.progress / 100), 2)}
                    height={barHeight}
                    rx={3}
                    fill={barColor}
                    opacity={1}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </ChartContainer>
  );
};
