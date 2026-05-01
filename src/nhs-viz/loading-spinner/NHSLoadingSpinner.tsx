import React from "react";
import { nhsColors, nhsTypography } from "../theme";

export interface NHSLoadingSpinnerProps {
  /** Additional CSS class name for the root element */
  className?: string;
  message?: string;
  height?: number;
  size?: "small" | "medium" | "large";
}

/**
 * NHS-styled loading spinner.
 * Use when data is being fetched or charts are rendering.
 */
export const NHSLoadingSpinner: React.FC<NHSLoadingSpinnerProps> = ({
  message = "Loading data...",
  height,
  size = "medium",
}) => {
  const sizes = { small: 24, medium: 40, large: 64 };
  const s = sizes[size];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        minHeight: height,
        fontFamily: nhsTypography.fontFamily,
      }}
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 40 40"
        style={{ animation: "nhs-spin 1s linear infinite" }}
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={nhsColors.nhsPaleGrey}
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={nhsColors.nhsBlue}
          strokeWidth="4"
          strokeDasharray="80"
          strokeDashoffset="60"
          strokeLinecap="round"
        />
      </svg>
      {message && (
        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: nhsColors.nhsMidGrey,
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
      <style>{`
        @keyframes nhs-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
