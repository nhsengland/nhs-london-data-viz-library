import React from "react";
import { nhsColors, nhsTypography } from "../theme";

export interface NHSErrorCardProps {
  /** Additional CSS class name for the root element */
  className?: string;
  title?: string;
  message?: string;
  details?: string;
  componentName?: string;
  onRetry?: () => void;
  height?: number;
}

/**
 * Error visualization card — use when a chart or table fails to render
 * due to corrupted data, missing fields, network errors, etc.
 */
export const NHSErrorCard: React.FC<NHSErrorCardProps> = ({
  title = "Unable to display visualisation",
  message = "There was a problem loading this data. The data may be missing, corrupted, or in an unexpected format.",
  details,
  componentName,
  onRetry,
  height,
}) => {
  return (
    <div
      style={{
        background: nhsColors.nhsWhite,
        border: `1px solid ${nhsColors.nhsPaleGrey}`,
        borderLeft: `4px solid ${nhsColors.nhsRed}`,
        borderRadius: "4px",
        padding: "24px",
        marginBottom: "24px",
        fontFamily: nhsTypography.fontFamily,
        minHeight: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Warning icon */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#FBDEDE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z"
            fill={nhsColors.nhsRed}
          />
          <rect x="11" y="10" width="2" height="5" rx="1" fill={nhsColors.nhsRed} />
          <circle cx="12" cy="17.5" r="1.2" fill={nhsColors.nhsRed} />
        </svg>
      </div>

      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: 700,
          color: nhsColors.nhsDarkGrey,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: "14px",
          color: nhsColors.nhsMidGrey,
          maxWidth: "480px",
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>

      {componentName && (
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "12px",
            color: nhsColors.nhsMidGrey,
          }}
        >
          Component: <code style={{ background: nhsColors.nhsPaleGrey, padding: "2px 6px", borderRadius: "3px" }}>{componentName}</code>
        </p>
      )}

      {details && (
        <details
          style={{
            marginBottom: "16px",
            fontSize: "12px",
            color: nhsColors.nhsMidGrey,
            maxWidth: "480px",
            textAlign: "left",
          }}
        >
          <summary style={{ cursor: "pointer", color: nhsColors.nhsBlue }}>
            Error details
          </summary>
          <pre
            style={{
              marginTop: "8px",
              padding: "12px",
              background: nhsColors.nhsPaleGrey,
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "11px",
            }}
          >
            {details}
          </pre>
        </details>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="nhsuk-button nhsuk-button--secondary"
          style={{ marginTop: "8px" }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
