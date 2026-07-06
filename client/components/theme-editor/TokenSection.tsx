import React, { useState } from "react";
import { ChevronDown } from "@/components/icons";
import styles from "./TokenSection.module.css";
import { TokenColorRow } from "./TokenColorRow";

export interface TokenDef {
  token: string;
  label: string;
}

interface TokenSectionProps {
  id: string;
  title: string;
  tokens: TokenDef[];
  overrides: Record<string, string>;
  onSet: (token: string, value: string) => void;
  onReset: (token: string) => void;
  getCurrentValue: (token: string) => string;
  defaultOpen?: boolean;
  isActive?: boolean;
  onActivate?: (id: string) => void;
}

export function TokenSection({
  id,
  title,
  tokens,
  overrides,
  onSet,
  onReset,
  getCurrentValue,
  defaultOpen = false,
  isActive = false,
  onActivate,
}: TokenSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const overrideCount = tokens.filter((t) => overrides[t.token] !== undefined).length;

  const handleClick = () => {
    setOpen((v) => !v);
    onActivate?.(id);
  };

  return (
    <div className={`${styles.section} ${isActive ? styles.sectionActive : ""}`}>
      <button
        type="button"
        className={`${styles.header} ${open ? styles.headerOpen : ""} ${isActive ? styles.headerActive : ""}`}
        onClick={handleClick}
        aria-expanded={open}
      >
        <div className={styles.headerLeft}>
          <span className={styles.title}>{title}</span>
          {overrideCount > 0 && (
            <span className={styles.badge}>{overrideCount} overridden</span>
          )}
        </div>
        <ChevronDown
          style={{ width: 16, height: 16 }}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div className={styles.body}>
          {tokens.map((t) => (
            <TokenColorRow
              key={t.token}
              token={t.token}
              label={t.label}
              isOverridden={overrides[t.token] !== undefined}
              overrideValue={overrides[t.token]}
              onSet={onSet}
              onReset={onReset}
              getCurrentValue={getCurrentValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
