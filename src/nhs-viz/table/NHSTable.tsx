import React, { useState, useMemo } from "react";
import { nhsColors, nhsTypography } from "../theme";

type SortDirection = "asc" | "desc" | null;

export interface ConditionalFormatRule {
  column: string;
  condition: (value: unknown) => boolean;
  style: React.CSSProperties;
}

export interface ColumnDef {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  format?: (value: unknown) => string;
}

export interface NHSTableProps {
  /** Additional CSS class name for the root element */
  className?: string;
  data: Record<string, unknown>[];
  columns: ColumnDef[];
  title?: string;
  subtitle?: string;
  source?: string;
  sortable?: boolean;
  filterable?: boolean;
  maxHeight?: number;
  striped?: boolean;
  conditionalFormats?: ConditionalFormatRule[];
  highlightRow?: (row: Record<string, unknown>, index: number) => boolean;
  highlightStyle?: React.CSSProperties;
  rowStyle?: (row: Record<string, unknown>, index: number) => React.CSSProperties | undefined;
}

const defaultHighlightStyle: React.CSSProperties = {
  backgroundColor: nhsColors.nhsPaleGrey,
  fontWeight: 700,
};

export const NHSTable: React.FC<NHSTableProps> = ({
  data,
  columns,
  title,
  subtitle,
  source,
  sortable = true,
  filterable = false,
  maxHeight = 500,
  striped = true,
  conditionalFormats = [],
  highlightRow,
  highlightStyle = defaultHighlightStyle,
  rowStyle,
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    if (!filterable || !filterText) return data;
    const lower = filterText.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(lower);
      })
    );
  }, [data, filterText, filterable, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc");
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const getSortIndicator = (key: string) => {
    if (sortKey !== key) return " \u21C5";
    if (sortDir === "asc") return " \u2191";
    if (sortDir === "desc") return " \u2193";
    return " \u21C5";
  };

  const getCellStyle = (colKey: string, value: unknown): React.CSSProperties => {
    const rule = conditionalFormats.find((r) => r.column === colKey && r.condition(value));
    return rule ? rule.style : {};
  };

  const headerStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: "14px",
    color: nhsColors.nhsWhite,
    backgroundColor: nhsColors.nhsBlue,
    borderBottom: `2px solid ${nhsColors.nhsDarkBlue}`,
    cursor: sortable ? "pointer" : "default",
    userSelect: "none",
    whiteSpace: "nowrap",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const cellStyle: React.CSSProperties = {
    padding: "10px 16px",
    fontSize: "14px",
    color: nhsColors.nhsDarkGrey,
    borderBottom: `1px solid ${nhsColors.nhsPaleGrey}`,
  };

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
      {title && <h3 className="nhsuk-heading-m" style={{ margin: "0 0 4px 0" }}>{title}</h3>}
      {subtitle && (
        <p className="nhsuk-body-s" style={{ margin: "0 0 16px 0", color: nhsColors.nhsMidGrey }}>{subtitle}</p>
      )}
      {filterable && (
        <div className="nhsuk-form-group" style={{ marginBottom: "16px" }}>
          <input
            className="nhsuk-input nhsuk-input--width-20"
            type="text"
            placeholder="Filter table..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      )}
      <div style={{ maxHeight, overflowY: "auto", overflowX: "auto", border: `1px solid ${nhsColors.nhsPaleGrey}`, borderRadius: "4px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: nhsTypography.fontFamily }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ ...headerStyle, textAlign: col.align ?? "left", width: col.width }}
                >
                  {col.header}{sortable && getSortIndicator(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIdx) => {
              const highlighted = highlightRow ? highlightRow(row, rowIdx) : false;
              const custom = rowStyle ? rowStyle(row, rowIdx) : undefined;
              const baseBg = striped && rowIdx % 2 === 1 ? nhsColors.nhsPaleGrey : nhsColors.nhsWhite;
              return (
                <tr
                  key={rowIdx}
                  style={{
                    backgroundColor: baseBg,
                    ...(highlighted ? highlightStyle : {}),
                    ...custom,
                  }}
                >
                  {columns.map((col) => {
                    const val = row[col.key];
                    return (
                      <td
                        key={col.key}
                        style={{
                          ...cellStyle,
                          textAlign: col.align ?? "left",
                          ...(highlighted ? { borderBottomColor: "rgba(0,0,0,0.08)" } : {}),
                          ...getCellStyle(col.key, val),
                        }}
                      >
                        {col.format ? col.format(val) : String(val ?? "")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="nhsuk-body-s" style={{ margin: "8px 0 0 0", color: nhsColors.nhsMidGrey }}>
        {sortedData.length} rows
      </p>
      {source && (
        <p className="nhsuk-body-s" style={{ margin: "4px 0 0 0", color: nhsColors.nhsMidGrey, fontStyle: "italic" }}>
          Source: {source}
        </p>
      )}
    </div>
  );
};
