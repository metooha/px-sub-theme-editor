import React, { useState } from "react";
import { TokenRow } from "./TokenRow";

interface TokenDef {
  name: string;
  label: string;
}

interface TokenGroupSectionProps {
  id: string;
  label: string;
  tokens: TokenDef[];
  fileValues: Record<string, string | null>;
  pendingValues: Record<string, string | null>;
  onChange: (tokenName: string, value: string) => void;
  defaultOpen?: boolean;
}

export function TokenGroupSection({
  id,
  label,
  tokens,
  fileValues,
  pendingValues,
  onChange,
  defaultOpen = true,
}: TokenGroupSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const dirtyCount = tokens.filter(
    (t) => pendingValues[t.name] !== null && pendingValues[t.name] !== undefined
  ).length;

  return (
    <div
      style={{
        border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: open
            ? "var(--ld-semantic-color-fill-subtle, #f8f8f8)"
            : "var(--ld-semantic-color-fill-surface-primary, #fff)",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--ld-semantic-font-family-sans)",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--ld-semantic-color-text-primary, #2e2f32)",
          }}>
            {label}
          </span>
          {dirtyCount > 0 && (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "1px 7px",
              borderRadius: 10,
              background: "var(--ld-semantic-color-action-fill-primary, #0053e2)",
              color: "#fff",
            }}>
              {dirtyCount} changed
            </span>
          )}
        </div>
        <ChevronIcon open={open} />
      </button>

      {/* Token rows */}
      {open && (
        <div style={{ padding: "0 16px 4px" }}>
          {tokens.map((token) => (
            <TokenRow
              key={token.name}
              tokenName={token.name}
              label={token.label}
              fileValue={fileValues[token.name] ?? null}
              pendingValue={pendingValues[token.name] ?? null}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transition: "transform 150ms ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
        color: "var(--ld-semantic-color-text-subtle, #74767c)",
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
