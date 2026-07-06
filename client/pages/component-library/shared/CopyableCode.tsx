import React, { useState, useCallback } from 'react';

interface CopyableCodeProps {
  children: string;
}

/**
 * Monospace code block with floating copy button.
 * Consolidates CopyableCode (GettingStarted.tsx) and CodeBlock (GettingStartedAgent.tsx).
 */
export function CopyableCode({ children }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [children]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        fontFamily: 'var(--ld-semantic-font-family-mono)',
        fontSize: '13px',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        padding: '16px 20px',
        paddingRight: '60px',
        borderRadius: '6px',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        color: 'var(--ld-semantic-color-text)',
        overflowX: 'auto',
      }}>
        {children}
      </div>
      <button
        onClick={handleCopy}
        title="Copy code"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '3px 10px',
          borderRadius: '4px',
          border: '1px solid var(--ld-semantic-color-separator)',
          background: copied
            ? 'var(--ld-semantic-color-fill-positive-subtle)'
            : 'var(--ld-semantic-color-surface)',
          color: copied
            ? 'var(--ld-semantic-color-text-positive)'
            : 'var(--ld-semantic-color-text-subtle)',
          fontSize: '11px',
          cursor: 'pointer',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          transition: 'all 120ms ease',
        }}
      >
        {copied ? '✓ Copied' : '⎘ Copy'}
      </button>
    </div>
  );
}
