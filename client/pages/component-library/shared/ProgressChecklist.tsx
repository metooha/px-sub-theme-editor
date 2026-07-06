import React, { useState } from 'react';

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface ProgressChecklistProps {
  title: string;
  subtitle?: string;
  completedBadge?: string;
  items: ChecklistItem[];
}

/**
 * Interactive step checklist with numbered circles, progress bar, and completion badge.
 * Shared across GettingStarted, GettingStartedDesigner, GettingStartedAgent pages.
 */
export function ProgressChecklist({
  title,
  subtitle,
  completedBadge = 'Done!',
  items,
}: ProgressChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => setChecked(new Set());
  const doneCount = checked.size;
  const total = items.length;
  const allDone = doneCount === total;

  return (
    <div>
      {/* Progress header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {doneCount} / {total} checked
        </span>
        {allDone && (
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text-positive)',
            backgroundColor: 'var(--ld-semantic-color-fill-positive-subtle)',
            padding: '2px 10px',
            borderRadius: '9999px',
            border: '1px solid var(--ld-semantic-color-border-positive)',
          }}>
            {completedBadge}
          </span>
        )}
        <div style={{
          flex: 1,
          height: '5px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(doneCount / total) * 100}%`,
            backgroundColor: allDone
              ? 'var(--ld-semantic-color-text-positive)'
              : 'var(--ld-semantic-color-action-fill-primary)',
            borderRadius: '9999px',
            transition: 'width 250ms ease',
          }} />
        </div>
        {doneCount > 0 && (
          <button
            onClick={reset}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              color: 'var(--ld-semantic-color-text-subtle)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              padding: '2px 6px',
            }}
          >
            Reset
          </button>
        )}
      </div>

      {subtitle && (
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {subtitle}
        </p>
      )}

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => {
          const done = checked.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              role="checkbox"
              aria-checked={done}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(item.id); } }}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: done
                  ? 'var(--ld-semantic-color-fill-positive-subtle)'
                  : 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '8px',
                border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                outline: 'none',
              }}
            >
              {/* Number / check circle */}
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: done
                  ? 'var(--ld-semantic-color-text-positive)'
                  : 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: done ? '16px' : '14px',
                color: done
                  ? 'var(--ld-semantic-color-surface)'
                  : 'var(--ld-semantic-color-text-brand-bold)',
                flexShrink: 0,
                transition: 'all 150ms ease',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
              }}>
                {done ? '✓' : i + 1}
              </div>

              {/* Text */}
              <div>
                <div style={{
                  fontWeight: 700,
                  fontSize: '14px',
                  marginBottom: item.description ? '4px' : 0,
                  color: 'var(--ld-semantic-color-text)',
                  textDecoration: done ? 'line-through' : 'none',
                  opacity: done ? 0.6 : 1,
                  transition: 'all 150ms ease',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {item.label}
                </div>
                {item.description && (
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                  }}>
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
