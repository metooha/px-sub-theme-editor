import React, { useState, useRef, useEffect } from "react";
import { PrimitivePicker } from "./PrimitivePicker";
import { extractPrimitiveName } from "@/contexts/PrimitiveColorRegistry";

interface TokenRowProps {
  /** Full CSS variable name e.g. "--ld-semantic-color-top-nav-fill" */
  tokenName: string;
  /** Human-readable label e.g. "Background" */
  label: string;
  /** Current value from the theme file — null if not set (inherits from base) */
  fileValue: string | null;
  /** Pending (unsaved) override — null if not changed */
  pendingValue: string | null;
  onChange: (tokenName: string, value: string) => void;
}

export function TokenRow({ tokenName, label, fileValue, pendingValue, onChange }: TokenRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const swatchRef = useRef<HTMLButtonElement>(null);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });

  // Resolved display value: pending > file > computed (from live DOM)
  const displayValue = pendingValue ?? fileValue;

  // Read the actual resolved color from the DOM (including inherited base values)
  const resolvedColor = useResolvedToken(tokenName);

  // The swatch color: pending/file value parsed, or fall back to computed
  const swatchColor = displayValue
    ? extractHexFromValue(displayValue) ?? resolvedColor
    : resolvedColor;

  const isInherited = !fileValue && !pendingValue;
  const isDirty = pendingValue !== null && pendingValue !== fileValue;

  const openPicker = () => {
    if (!swatchRef.current) return;
    const rect = swatchRef.current.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 6;
    let left = rect.left + window.scrollX;
    // Keep picker within viewport
    if (left + 340 > window.innerWidth) left = window.innerWidth - 348;
    setPickerPos({ top, left });
    setPickerOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 0",
        borderBottom: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
      }}
    >
      {/* Color swatch button */}
      <button
        ref={swatchRef}
        type="button"
        onClick={openPicker}
        title={`Edit ${tokenName}`}
        style={{
          width: 28,
          height: 28,
          borderRadius: 5,
          background: swatchColor ?? "transparent",
          border: "1.5px solid rgba(0,0,0,0.12)",
          cursor: "pointer",
          flexShrink: 0,
          position: "relative",
          padding: 0,
          outline: "none",
          boxSizing: "border-box",
        }}
      >
        {!swatchColor && (
          <span style={{ fontSize: 10, color: "#999" }}>?</span>
        )}
        {isDirty && (
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--ld-semantic-color-action-fill-primary, #0053e2)",
              border: "1.5px solid white",
            }}
          />
        )}
      </button>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--ld-semantic-color-text-primary, #2e2f32)",
          fontFamily: "var(--ld-semantic-font-family-sans)",
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 11,
          color: "var(--ld-semantic-color-text-subtle, #74767c)",
          fontFamily: "monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {pendingValue
            ? extractPrimitiveName(pendingValue) ?? pendingValue
            : fileValue
            ? extractPrimitiveName(fileValue) ?? fileValue
            : "inherited from base"}
        </div>
      </div>

      {/* Status badge */}
      {isDirty && (
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 6px",
          borderRadius: 10,
          background: "var(--ld-semantic-color-action-fill-primary, #0053e2)",
          color: "#fff",
          fontFamily: "var(--ld-semantic-font-family-sans)",
          flexShrink: 0,
        }}>
          changed
        </span>
      )}
      {isInherited && !isDirty && (
        <span style={{
          fontSize: 10,
          color: "var(--ld-semantic-color-text-subtle, #74767c)",
          fontFamily: "var(--ld-semantic-font-family-sans)",
          flexShrink: 0,
        }}>
          inherited
        </span>
      )}

      {/* Inline picker (absolutely positioned) */}
      {pickerOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, width: 0, height: 0 }}>
          <div style={{ position: "absolute", top: pickerPos.top, left: pickerPos.left }}>
            <PrimitivePicker
              value={pendingValue ?? fileValue}
              onChange={(val) => onChange(tokenName, val)}
              onClose={() => setPickerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Read the computed value of a CSS custom property from the document root.
 * Returns the resolved hex/rgb string or null.
 */
function useResolvedToken(tokenName: string): string | null {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(tokenName)
      .trim();
    setValue(resolved || null);
  }, [tokenName]);
  return value;
}

/**
 * Extract a hex or rgb value from a CSS value string.
 * Handles: "#hex", "var(--token, #hex)", "rgb(...)"
 */
function extractHexFromValue(value: string): string | null {
  // Direct hex
  if (/^#[0-9a-fA-F]{3,8}$/.test(value.trim())) return value.trim();
  // var(--token, #hex)
  const fallbackMatch = value.match(/,\s*(#[0-9a-fA-F]{3,8})\s*\)/);
  if (fallbackMatch) return fallbackMatch[1];
  // rgb(...)
  if (value.trim().startsWith("rgb")) return value.trim();
  return null;
}
