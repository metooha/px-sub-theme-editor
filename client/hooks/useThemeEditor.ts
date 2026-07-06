import { useState, useEffect, useCallback } from "react";
import { parsePrimitiveVar } from "@/components/theme-editor/primitiveColorTokens";

const STORAGE_KEY = "wcp-theme-editor-overrides";

export interface ThemeEditorHook {
  /** Map of token name → primitive var string */
  overrides: Record<string, string>;
  overrideCount: number;
  setOverride(token: string, value: string): void;
  resetOverride(token: string): void;
  resetAll(): void;
  /** Returns getComputedStyle resolved value of the token on :root */
  getCurrentValue(token: string): string;
  exportJSON(): string;
  /** Returns an error string on failure, null on success */
  importJSON(json: string): string | null;
  importError: string | null;
  importSuccess: boolean;
}

function applyOverridesToDOM(overrides: Record<string, string>): void {
  for (const [token, value] of Object.entries(overrides)) {
    document.documentElement.style.setProperty(token, value);
  }
}

function saveToStorage(overrides: Record<string, string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore storage errors
  }
}

function loadFromStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

export function useThemeEditor(): ThemeEditorHook {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // On mount: load from localStorage and apply to :root
  useEffect(() => {
    const saved = loadFromStorage();
    if (Object.keys(saved).length > 0) {
      setOverrides(saved);
      applyOverridesToDOM(saved);
    }
  }, []);

  const setOverride = useCallback((token: string, value: string) => {
    document.documentElement.style.setProperty(token, value);
    setOverrides((prev) => {
      const next = { ...prev, [token]: value };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetOverride = useCallback((token: string) => {
    document.documentElement.style.removeProperty(token);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[token];
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides((prev) => {
      for (const token of Object.keys(prev)) {
        document.documentElement.style.removeProperty(token);
      }
      return {};
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const getCurrentValue = useCallback((token: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  }, []);

  const exportJSON = useCallback((): string => {
    return JSON.stringify(
      {
        theme: "custom",
        exportedAt: new Date().toISOString(),
        overrides,
      },
      null,
      2
    );
  }, [overrides]);

  const importJSON = useCallback((json: string): string | null => {
    setImportError(null);
    setImportSuccess(false);
    try {
      const parsed = JSON.parse(json);
      if (!parsed || typeof parsed !== "object" || !parsed.overrides) {
        const err = "Invalid JSON: missing 'overrides' key.";
        setImportError(err);
        return err;
      }

      const incoming = parsed.overrides as Record<string, string>;

      // Validate all keys and values
      for (const [key, value] of Object.entries(incoming)) {
        if (
          !key.startsWith("--ld-semantic-") &&
          !key.startsWith("--wcp-semantic-")
        ) {
          const err = `Invalid token key: "${key}". Only --ld-semantic-* and --wcp-semantic-* tokens are allowed.`;
          setImportError(err);
          return err;
        }
        if (typeof value !== "string" || !parsePrimitiveVar(value)) {
          const err = `Invalid value for "${key}": "${value}". Values must be var(--ld-primitive-color-*) strings.`;
          setImportError(err);
          return err;
        }
      }

      // Clear existing overrides from DOM
      setOverrides((prev) => {
        for (const token of Object.keys(prev)) {
          document.documentElement.style.removeProperty(token);
        }
        return {};
      });

      // Apply new overrides
      const newOverrides = incoming as Record<string, string>;
      applyOverridesToDOM(newOverrides);
      saveToStorage(newOverrides);
      setOverrides(newOverrides);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
      return null;
    } catch {
      const err = "Failed to parse JSON. Make sure the file is valid JSON.";
      setImportError(err);
      return err;
    }
  }, []);

  return {
    overrides,
    overrideCount: Object.keys(overrides).length,
    setOverride,
    resetOverride,
    resetAll,
    getCurrentValue,
    exportJSON,
    importJSON,
    importError,
    importSuccess,
  };
}
