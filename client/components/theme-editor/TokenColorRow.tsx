import React, { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw, ChevronDown } from "@/components/icons";
import styles from "./TokenColorRow.module.css";
import { PrimitivePicker } from "./PrimitivePicker";
import {
  parsePrimitiveVar,
  resolveHexFromPrimitiveVar,
  findPrimitiveToken,
} from "./primitiveColorTokens";

interface TokenColorRowProps {
  token: string;
  label: string;
  isOverridden: boolean;
  overrideValue?: string;
  onSet: (token: string, value: string) => void;
  onReset: (token: string) => void;
  getCurrentValue: (token: string) => string;
}

export function TokenColorRow({
  token,
  label,
  isOverridden,
  overrideValue,
  onSet,
  onReset,
  getCurrentValue,
}: TokenColorRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [swatchColor, setSwatchColor] = useState<string>("");
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const swatchRef = useRef<HTMLButtonElement>(null);

  // Refresh the swatch color from the live DOM
  const refreshSwatch = useCallback(() => {
    if (overrideValue) {
      // Try to resolve from static data first
      const hex = resolveHexFromPrimitiveVar(overrideValue);
      if (hex) {
        setSwatchColor(hex);
        return;
      }
    }
    // Fall back to computed style (reflects cascade including overrides applied to :root)
    const computed = getCurrentValue(token);
    setSwatchColor(computed || "transparent");
  }, [token, overrideValue, getCurrentValue]);

  useEffect(() => {
    refreshSwatch();
  }, [refreshSwatch]);

  const openPicker = () => {
    if (!swatchRef.current) return;
    const rect = swatchRef.current.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 6;
    let left = rect.left + window.scrollX;
    if (left + 350 > window.innerWidth) left = window.innerWidth - 358;
    setPickerPos({ top, left });
    setPickerOpen(true);
  };

  // Short display name for the current override
  const currentPrimitiveName = overrideValue
    ? (() => {
        const name = parsePrimitiveVar(overrideValue);
        if (!name) return overrideValue;
        const tok = findPrimitiveToken(name);
        return tok ? tok.shortName : name.replace("--ld-primitive-color-", "");
      })()
    : null;

  // Short token display (strip prefix)
  const shortToken = token
    .replace("--ld-semantic-color-", "")
    .replace("--wcp-semantic-color-", "");

  return (
    <div className={`${styles.row} ${isOverridden ? styles.rowOverridden : ""}`}>
      {/* Live color swatch */}
      <button
        ref={swatchRef}
        type="button"
        className={styles.swatch}
        style={{ background: swatchColor || "transparent" }}
        onClick={openPicker}
        title={`Edit ${token}`}
        aria-label={`Edit color for ${label}`}
      />

      {/* Label + token name */}
      <div className={styles.labels}>
        <div className={styles.labelText}>{label}</div>
        <div className={styles.tokenName}>
          {isOverridden && currentPrimitiveName
            ? currentPrimitiveName
            : shortToken}
        </div>
      </div>

      {/* Picker trigger */}
      <button
        type="button"
        className={styles.pickerTrigger}
        onClick={openPicker}
        aria-label={`Choose color for ${label}`}
      >
        {isOverridden && currentPrimitiveName ? currentPrimitiveName : "Pick color"}
        <ChevronDown style={{ width: 11, height: 11 }} />
      </button>

      {/* Reset button */}
      <button
        type="button"
        className={`${styles.resetBtn} ${isOverridden ? styles.resetBtnVisible : ""}`}
        onClick={() => onReset(token)}
        title="Reset to default"
        aria-label={`Reset ${label} to default`}
      >
        <RotateCcw style={{ width: 14, height: 14 }} />
      </button>

      {/* Primitive picker popover */}
      {pickerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9998,
            width: 0,
            height: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: pickerPos.top,
              left: pickerPos.left,
            }}
          >
            <PrimitivePicker
              value={overrideValue ?? null}
              onChange={(val) => {
                onSet(token, val);
                setPickerOpen(false);
              }}
              onClose={() => setPickerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
