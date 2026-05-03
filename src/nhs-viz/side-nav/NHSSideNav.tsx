import React from "react";
import { nhsColors, nhsTypography } from "../theme";

export interface NavItem {
  /** URL path for the navigation item */
  path: string;
  /** Display label */
  label: string;
  /** Optional icon or badge to display */
  icon?: React.ReactNode;
  /** Optional group/category for visual grouping */
  group?: string;
}

export interface NHSSideNavProps {
  /** Navigation items to display */
  items: NavItem[];
  /** Currently active path (used for highlighting) */
  activePath?: string;
  /** Whether the navigation panel is open */
  isOpen: boolean;
  /** Callback when a navigation item is clicked */
  onNavigate?: (path: string) => void;
  /** Callback to close the nav (e.g., after selection on mobile) */
  onClose?: () => void;
  /** Title displayed at the top of the nav panel */
  title?: string;
  /** Additional CSS class name for the root element */
  className?: string;
}

/**
 * NHS-styled collapsible side navigation panel.
 *
 * Designed to work with NHSHeader's hamburger toggle. Slides in from the left
 * and overlays content on mobile, or sits alongside content on wider screens.
 * Supports grouped navigation items.
 */
export const NHSSideNav: React.FC<NHSSideNavProps> = ({
  items,
  activePath,
  isOpen,
  onNavigate,
  onClose,
  title,
  className,
}) => {
  // Group items by their group property
  const groupedItems = items.reduce<Record<string, NavItem[]>>((acc, item) => {
    const group = item.group ?? "";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const groups = Object.entries(groupedItems);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
            transition: "opacity 0.2s",
          }}
        />
      )}

      {/* Navigation panel */}
      <nav
        aria-label={title ?? "Side navigation"}
        className={className}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "280px",
          backgroundColor: nhsColors.nhsWhite,
          borderRight: `1px solid ${nhsColors.nhsPaleGrey}`,
          boxShadow: isOpen ? "4px 0 12px rgba(0, 0, 0, 0.1)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          zIndex: 1000,
          overflowY: "auto",
          fontFamily: nhsTypography.fontFamily,
        }}
      >
        {/* Nav header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${nhsColors.nhsPaleGrey}`,
            backgroundColor: nhsColors.nhsBlue,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "16px", color: nhsColors.nhsWhite }}>
            {title ?? "Navigation"}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: nhsColors.nhsWhite,
              fontSize: "20px",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation items */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {groups.map(([group, groupItems]) => (
            <React.Fragment key={group}>
              {group && (
                <li
                  style={{
                    padding: "12px 20px 4px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: nhsColors.nhsMidGrey,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {group}
                </li>
              )}
              {groupItems.map((item) => {
                const isActive = activePath === item.path;
                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.(item.path);
                        onClose?.();
                      }}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 20px",
                        textDecoration: "none",
                        color: isActive ? nhsColors.nhsBlue : nhsColors.nhsDarkGrey,
                        backgroundColor: isActive ? "#e8f4fd" : "transparent",
                        borderLeft: isActive ? `4px solid ${nhsColors.nhsBlue}` : "4px solid transparent",
                        fontWeight: isActive ? 700 : 400,
                        fontSize: "15px",
                        transition: "background-color 0.15s",
                      }}
                    >
                      {item.icon && <span style={{ flexShrink: 0 }}>{item.icon}</span>}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </>
  );
};
