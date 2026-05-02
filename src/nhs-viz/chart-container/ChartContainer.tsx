import React from "react";
import { nhsColors, nhsTypography } from "../theme";

export interface ChartContainerProps {
  /** Additional CSS class name for the root element */
  className?: string;
  title?: string;
  subtitle?: string;
  source?: string;
  children: React.ReactNode;
  height?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  source,
  children,
  height,
}) => {
  return (
    <div
      style={{
        background: nhsColors.nhsWhite,
        border: `1px solid ${nhsColors.nhsPaleGrey}`,
        borderRadius: "4px",
        padding: "24px",
        marginBottom: "24px",
        fontFamily: nhsTypography.fontFamily,
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 4px 0",
            fontSize: "20px",
            fontWeight: 700,
            color: nhsColors.nhsDarkGrey,
          }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p
          style={{
            margin: "0 0 16px 0",
            fontSize: "14px",
            color: nhsColors.nhsMidGrey,
          }}
        >
          {subtitle}
        </p>
      )}
      <div style={{ width: "100%", height: height ?? "auto" }}>
        {children}
      </div>
      {source && (
        <p
          style={{
            margin: "12px 0 0 0",
            fontSize: "12px",
            color: nhsColors.nhsMidGrey,
            fontStyle: "italic",
          }}
        >
          Source: {source}
        </p>
      )}
    </div>
  );
};
