import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Check } from '@/components/icons/Check';
import { Clipboard } from '@/components/icons/Clipboard';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { ChevronDown } from '@/components/icons/ChevronDown';

export interface Prompt {
  label: string;
  full: string;
}

interface PromptChipProps {
  prompt: Prompt;
}

/**
 * Copyable prompt chip with expand-to-preview toggle.
 * Shared across GettingStartedDesigner and GettingStartedPM.
 */
export function PromptChip({ prompt }: PromptChipProps) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select text for manual copy
    }
  }, [prompt.full]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Button
          variant={copied ? 'secondary' : 'tertiary'}
          size="small"
          onClick={handleCopy}
          leading={
            copied
              ? <Check width={14} height={14} />
              : <Clipboard width={14} height={14} />
          }
        >
          {copied ? 'Copied!' : prompt.label}
        </Button>
        <IconButton
          variant="ghost"
          size="small"
          aria-label={showFull ? 'Hide full prompt' : 'Show full prompt'}
          onClick={() => setShowFull(!showFull)}
        >
          {showFull
            ? <ChevronUp width={14} height={14} />
            : <ChevronDown width={14} height={14} />
          }
        </IconButton>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px',
          marginLeft: '8px',
          padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 'var(--ld-semantic-border-radius-medium)',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          fontStyle: 'italic',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}
