import React, { useState } from "react";
import { NHSLogo } from "../logo/NHSLogo";
import { nhsColors, nhsTypography } from "../theme";

/** Configuration for the data freshness bar below the header */
export interface DataFreshnessConfig {
  /** Date when data was last refreshed */
  lastRefreshed?: string;
  /** Latest period of data available */
  latestDataAvailable?: string;
  /** Custom content to display instead of default fields */
  customContent?: React.ReactNode;
}

export interface NHSHeaderProps {
  /** Application/service title displayed next to the NHS logo */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Callback when hamburger menu is toggled. Receives the new open state. */
  onMenuToggle?: (isOpen: boolean) => void;
  /** Whether the menu is currently open (controlled mode) */
  menuOpen?: boolean;
  /** Data freshness configuration for the grey bar below the header */
  dataFreshness?: DataFreshnessConfig;
  /** Additional CSS class name for the root element */
  className?: string;
}

/**
 * NHS-styled application header with hamburger menu, logo, title, and data freshness bar.
 *
 * Based on the NHS.UK header pattern. Includes a toggleable hamburger button for
 * side navigation on pages with many nav items.
 */
export const NHSHeader: React.FC<NHSHeaderProps> = ({
  title,
  subtitle,
  onMenuToggle,
  menuOpen = false,
  dataFreshness,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = onMenuToggle ? menuOpen : internalOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (onMenuToggle) {
      onMenuToggle(newState);
    } else {
      setInternalOpen(newState);
    }
  };

  return (
    <div className={className}>
      {/* Main header bar */}
      <header
        role="banner"
        style={{
          backgroundColor: nhsColors.nhsBlue,
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Hamburger button */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={handleToggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
              width: "32px",
              height: "32px",
            }}
          >
            <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: nhsColors.nhsWhite, borderRadius: "1px", transition: "transform 0.2s" }} />
            <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: nhsColors.nhsWhite, borderRadius: "1px", transition: "opacity 0.2s", opacity: isOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: nhsColors.nhsWhite, borderRadius: "1px", transition: "transform 0.2s" }} />
          </button>

          {/* NHS Logo */}
          <NHSLogo height={32} variant="white" />

          {/* Title */}
          <div>
            <span
              style={{
                color: nhsColors.nhsWhite,
                fontSize: "22px",
                fontWeight: 700,
                fontFamily: nhsTypography.fontFamily,
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  display: "block",
                  color: nhsColors.nhsWhite,
                  fontSize: "14px",
                  fontWeight: 400,
                  fontFamily: nhsTypography.fontFamily,
                  opacity: 0.85,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Data freshness bar */}
      {dataFreshness && (
        <div
          style={{
            backgroundColor: nhsColors.nhsPaleGrey,
            borderBottom: `1px solid ${nhsColors.nhsMidGrey}`,
            padding: "8px 24px",
          }}
        >
          <div
            style={{ maxWidth: "1400px", margin: "0 auto", fontFamily: nhsTypography.fontFamily }}
          >
            {dataFreshness.customContent ?? (
              <p className="nhsuk-body-s" style={{ margin: 0, color: nhsColors.nhsDarkGrey }}>
                {dataFreshness.lastRefreshed && (
                  <><strong>Data last refreshed:</strong> {dataFreshness.lastRefreshed}</>
                )}
                {dataFreshness.lastRefreshed && dataFreshness.latestDataAvailable && " \u00A0|\u00A0 "}
                {dataFreshness.latestDataAvailable && (
                  <><strong>Latest data available:</strong> {dataFreshness.latestDataAvailable}</>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
