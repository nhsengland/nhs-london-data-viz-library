import React from "react";
import { nhsColors, nhsTypography } from "../theme";

/** A single option for select dropdowns and radio groups */
export interface FilterOption {
  /** Display label */
  label: string;
  /** Option value */
  value: string;
}

/** Configuration for a single filter field */
export interface FilterField {
  /** Unique identifier for this filter */
  id: string;
  /** Display label */
  label: string;
  /** Type of filter input */
  type: "select" | "multi-select" | "radio" | "search" | "date" | "date-range";
  /** Options for select, multi-select, and radio types */
  options?: FilterOption[];
  /** Placeholder text for search and select inputs */
  placeholder?: string;
  /** Current value (controlled) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
}

export interface NHSFiltersProps {
  /** Array of filter field configurations */
  fields: FilterField[];
  /** Callback when any filter value changes */
  onChange?: (fieldId: string, value: string | string[]) => void;
  /** Callback when filters are applied (if using apply button) */
  onApply?: () => void;
  /** Callback when filters are cleared */
  onClear?: () => void;
  /** Layout direction */
  layout?: "horizontal" | "vertical";
  /** Whether to show Apply/Clear buttons */
  showActions?: boolean;
  /** Title displayed above filters */
  title?: string;
  /** Whether the filter panel is collapsible */
  collapsible?: boolean;
  /** Additional CSS class name for the root element */
  className?: string;
}

/**
 * NHS-styled filter panel with support for dropdowns, radio groups, search,
 * and date inputs. Designed for dashboard filtering use cases.
 *
 * Follows NHS Design System form patterns for consistency.
 */
export const NHSFilters: React.FC<NHSFiltersProps> = ({
  fields,
  onChange,
  onApply,
  onClear,
  layout = "horizontal",
  showActions = true,
  title,
  collapsible = false,
  className,
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleChange = (fieldId: string, value: string | string[]) => {
    onChange?.(fieldId, value);
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "select":
        return (
          <div key={field.id} style={{ minWidth: "180px", flex: layout === "horizontal" ? "1" : undefined }}>
            <label
              htmlFor={field.id}
              style={{ display: "block", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: nhsColors.nhsDarkGrey }}
            >
              {field.label}
            </label>
            <select
              id={field.id}
              className="nhsuk-select"
              value={(field.value as string) ?? ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              style={{ width: "100%", padding: "8px 12px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px" }}
            >
              <option value="">{field.placeholder ?? "Select..."}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );

      case "multi-select":
        return (
          <div key={field.id} style={{ minWidth: "180px", flex: layout === "horizontal" ? "1" : undefined }}>
            <label
              htmlFor={field.id}
              style={{ display: "block", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: nhsColors.nhsDarkGrey }}
            >
              {field.label}
            </label>
            <select
              id={field.id}
              multiple
              className="nhsuk-select"
              value={(field.value as string[]) ?? []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, (o) => o.value);
                handleChange(field.id, selected);
              }}
              style={{ width: "100%", padding: "8px 12px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px", minHeight: "80px" }}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <fieldset key={field.id} style={{ border: "none", padding: 0, margin: 0, minWidth: "180px", flex: layout === "horizontal" ? "1" : undefined }}>
            <legend style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px", color: nhsColors.nhsDarkGrey }}>
              {field.label}
            </legend>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {field.options?.map((opt) => (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", cursor: "pointer", color: nhsColors.nhsDarkGrey }}>
                  <input
                    type="radio"
                    name={field.id}
                    value={opt.value}
                    checked={(field.value as string) === opt.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    style={{ accentColor: nhsColors.nhsBlue, width: "16px", height: "16px", appearance: "auto" }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        );

      case "search":
        return (
          <div key={field.id} style={{ minWidth: "200px", flex: layout === "horizontal" ? "1.5" : undefined }}>
            <label
              htmlFor={field.id}
              style={{ display: "block", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: nhsColors.nhsDarkGrey }}
            >
              {field.label}
            </label>
            <div style={{ position: "relative" }}>
              <input
                id={field.id}
                type="search"
                className="nhsuk-input"
                placeholder={field.placeholder ?? "Search..."}
                value={(field.value as string) ?? ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ width: "100%", padding: "8px 12px 8px 32px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px" }}
              />
              <svg
                width="16" height="16" viewBox="0 0 16 16"
                style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }}
              >
                <circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke={nhsColors.nhsMidGrey} strokeWidth="1.5" />
                <line x1="10.5" y1="10.5" x2="15" y2="15" stroke={nhsColors.nhsMidGrey} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        );

      case "date":
        return (
          <div key={field.id} style={{ minWidth: "160px", flex: layout === "horizontal" ? "0.8" : undefined }}>
            <label
              htmlFor={field.id}
              style={{ display: "block", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: nhsColors.nhsDarkGrey }}
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="date"
              className="nhsuk-input"
              value={(field.value as string) ?? ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              style={{ width: "100%", padding: "8px 12px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px" }}
            />
          </div>
        );

      case "date-range":
        return (
          <div key={field.id} style={{ minWidth: "300px", flex: layout === "horizontal" ? "1.2" : undefined }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: nhsColors.nhsDarkGrey }}>
              {field.label}
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="date"
                aria-label={`${field.label} from`}
                className="nhsuk-input"
                value={Array.isArray(field.value) ? field.value[0] ?? "" : ""}
                onChange={(e) => {
                  const current = Array.isArray(field.value) ? field.value : ["", ""];
                  handleChange(field.id, [e.target.value, current[1] ?? ""]);
                }}
                style={{ flex: 1, padding: "8px 12px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px" }}
              />
              <span style={{ fontSize: "13px", color: nhsColors.nhsMidGrey }}>to</span>
              <input
                type="date"
                aria-label={`${field.label} to`}
                className="nhsuk-input"
                value={Array.isArray(field.value) ? field.value[1] ?? "" : ""}
                onChange={(e) => {
                  const current = Array.isArray(field.value) ? field.value : ["", ""];
                  handleChange(field.id, [current[0] ?? "", e.target.value]);
                }}
                style={{ flex: 1, padding: "8px 12px", fontSize: "14px", border: `1px solid ${nhsColors.nhsMidGrey}`, borderRadius: "4px" }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: nhsColors.nhsWhite,
        border: `1px solid ${nhsColors.nhsPaleGrey}`,
        borderRadius: "4px",
        padding: collapsed ? "12px 20px" : "20px",
        marginBottom: "24px",
        fontFamily: nhsTypography.fontFamily,
      }}
    >
      {/* Title row */}
      {(title || collapsible) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: collapsed ? 0 : "16px",
          }}
        >
          {title && (
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: nhsColors.nhsDarkGrey }}>
              {title}
            </h3>
          )}
          {collapsible && (
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-expanded={!collapsed}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: nhsColors.nhsBlue,
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {collapsed ? "Show filters ▼" : "Hide filters ▲"}
            </button>
          )}
        </div>
      )}

      {/* Filter fields */}
      {!collapsed && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: layout === "horizontal" ? "row" : "column",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: layout === "horizontal" ? "flex-end" : "stretch",
            }}
          >
            {fields.map(renderField)}
          </div>

          {/* Action buttons */}
          {showActions && (onApply || onClear) && (
            <div style={{ display: "flex", gap: "12px", marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${nhsColors.nhsPaleGrey}` }}>
              {onApply && (
                <button
                  type="button"
                  onClick={onApply}
                  className="nhsuk-button"
                  style={{
                    backgroundColor: nhsColors.nhsBlue,
                    color: nhsColors.nhsWhite,
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Apply filters
                </button>
              )}
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="nhsuk-button nhsuk-button--secondary"
                  style={{
                    backgroundColor: "transparent",
                    color: nhsColors.nhsDarkGrey,
                    border: `1px solid ${nhsColors.nhsMidGrey}`,
                    borderRadius: "4px",
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
