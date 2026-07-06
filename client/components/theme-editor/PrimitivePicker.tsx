import React, { useState, useEffect, useRef } from "react";
import {
  PRIMITIVE_COLOR_FAMILIES,
  parsePrimitiveVar,
  toPrimitiveVar,
  type PrimitiveColorToken,
} from "./primitiveColorTokens";

interface PrimitivePickerProps {
  /** Currently selected value e.g. "var(--ld-primitive-color-blue-100)" */
  value: string | null;
  /** Called when user picks a new primitive */
  onChange: (value: string) => void;
  onClose: () => void;
  /**
   * Family names to pin at the top under a "Recommended" section.
   * e.g. ['blue', 'magic', 'cyan'] for the primary color picker.
   */
  preferredFamilies?: string[];
}

export function PrimitivePicker({ value, onChange, onClose, preferredFamilies }: PrimitivePickerProps) {
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedTokenName = value ? parsePrimitiveVar(value) : null;

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const query = search.toLowerCase();

  const allFiltered = PRIMITIVE_COLOR_FAMILIES.map((f) => ({
    ...f,
    tokens: query
      ? f.tokens.filter(
          (t) =>
            t.shortName.includes(query) ||
            t.hex.toLowerCase().includes(query) ||
            t.family.includes(query)
        )
      : f.tokens,
  })).filter((f) => f.tokens.length > 0);

  // When preferredFamilies is set and no search, split into recommended + rest
  const preferred = preferredFamilies && !query
    ? allFiltered.filter((f) => preferredFamilies.includes(f.family))
    : [];
  const filteredFamilies = preferredFamilies && !query
    ? allFiltered.filter((f) => !preferredFamilies.includes(f.family))
    : allFiltered;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        zIndex: 9999,
        background: "var(--ld-semantic-color-fill-surface-primary, #fff)",
        border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
        width: 350,
        maxHeight: 440,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Search */}
      <div
        style={{
          padding: "10px 12px",
          borderBottom: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
        }}
      >
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search colors…"
          style={{
            width: "100%",
            border: "1px solid var(--ld-semantic-color-field-border, #74767c)",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "13px",
            fontFamily: "var(--ld-semantic-font-family-sans)",
            background: "var(--ld-semantic-color-fill-surface-primary, #fff)",
            color: "var(--ld-semantic-color-text-primary, #2e2f32)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Color families */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}>
        {filteredFamilies.length === 0 && preferred.length === 0 && (
          <p style={{ fontSize: "13px", color: "var(--ld-semantic-color-text-subtle, #74767c)", padding: "8px 0" }}>
            No colors found
          </p>
        )}

        {/* Recommended families (pinned at top) */}
        {preferred.length > 0 && (
          <>
            <div style={{
              fontSize: "10px", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.6px", color: "var(--ld-semantic-color-text-brand, #0053e2)",
              fontFamily: "var(--ld-semantic-font-family-sans)", marginBottom: 8,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              Recommended for this token
            </div>
            {preferred.map((family) => (
              <FamilyRow key={family.family} family={family} selectedTokenName={selectedTokenName} onChange={onChange} onClose={onClose} />
            ))}
            <div style={{ height: 1, background: "var(--ld-semantic-color-separator, #e3e4e5)", margin: "10px 0" }} />
          </>
        )}

        {/* All other families */}
        {filteredFamilies.map((family) => (
          <FamilyRow key={family.family} family={family} selectedTokenName={selectedTokenName} onChange={onChange} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

function FamilyRow({ family, selectedTokenName, onChange, onClose }: {
  family: { family: string; label: string; tokens: PrimitiveColorToken[] };
  selectedTokenName: string | null;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ld-semantic-color-text-subtle, #74767c)", margin: "0 0 6px", fontFamily: "var(--ld-semantic-font-family-sans)" }}>
        {family.label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {family.tokens.map((token) => (
          <ColorChip
            key={token.name}
            token={token}
            isSelected={token.name === selectedTokenName}
            onClick={() => { onChange(toPrimitiveVar(token.name)); onClose(); }}
          />
        ))}
      </div>
    </div>
  );
}

interface ColorChipProps {
  token: PrimitiveColorToken;
  isSelected: boolean;
  onClick: () => void;
}

function ColorChip({ token, isSelected, onClick }: ColorChipProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      title={`${token.shortName} — ${token.hex}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 22,
        height: 22,
        borderRadius: 4,
        background: token.hex,
        border: isSelected
          ? "2.5px solid var(--ld-semantic-color-action-fill-primary, #0053e2)"
          : hovered
          ? "2.5px solid var(--ld-semantic-color-border-strong, #74767c)"
          : "1.5px solid rgba(0,0,0,0.1)",
        cursor: "pointer",
        padding: 0,
        boxSizing: "border-box",
        outline: "none",
        flexShrink: 0,
        transition: "transform 80ms ease",
        transform: hovered ? "scale(1.2)" : "scale(1)",
      }}
      aria-label={`${token.shortName} ${token.hex}`}
      aria-pressed={isSelected}
    />
  );
}
