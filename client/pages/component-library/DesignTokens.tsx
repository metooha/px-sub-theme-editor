import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

const colorTokens = [
  {
    category: 'Text Colors',
    tokens: [
      { name: '--ld-semantic-color-text-primary', description: 'Primary text color' },
      { name: '--ld-semantic-color-text-secondary', description: 'Secondary text color' },
      { name: '--ld-semantic-color-text-tertiary', description: 'Tertiary text color' },
      { name: '--ld-semantic-color-text-disabled', description: 'Disabled text color' },
      { name: '--ld-semantic-color-text-brand', description: 'Brand color text' },
      { name: '--ld-semantic-color-text-on-fill-primary', description: 'Text on primary fills' },
    ]
  },
  {
    category: 'Background Colors',
    tokens: [
      { name: '--ld-semantic-color-fill-surface-primary', description: 'Primary surface background' },
      { name: '--ld-semantic-color-fill-surface-secondary', description: 'Secondary surface background' },
      { name: '--ld-semantic-color-fill-surface-tertiary', description: 'Tertiary surface background' },
    ]
  },
  {
    category: 'Border Colors',
    tokens: [
      { name: '--ld-semantic-color-border-subtle', description: 'Subtle borders' },
      { name: '--ld-semantic-color-border-moderate', description: 'Moderate borders' },
      { name: '--ld-semantic-color-border-strong', description: 'Strong borders' },
    ]
  },
  {
    category: 'Action Colors',
    tokens: [
      { name: '--ld-semantic-color-action-fill-primary', description: 'Primary action background' },
      { name: '--ld-semantic-color-action-fill-primary-hovered', description: 'Primary action hover' },
      { name: '--ld-semantic-color-action-fill-primary-pressed', description: 'Primary action pressed' },
      { name: '--ld-semantic-color-action-fill-secondary', description: 'Secondary action background' },
      { name: '--ld-semantic-color-action-border-secondary', description: 'Secondary action border' },
      { name: '--ld-semantic-color-action-fill-destructive', description: 'Destructive action background' },
      { name: '--ld-semantic-color-action-focus-outline', description: 'Focus outline color' },
    ]
  },
  {
    category: 'Semantic Colors',
    tokens: [
      { name: '--ld-semantic-color-fill-info-subtle', description: 'Info background (subtle)' },
      { name: '--ld-semantic-color-border-info', description: 'Info border' },
      { name: '--ld-semantic-color-fill-success-subtle', description: 'Success background (subtle)' },
      { name: '--ld-semantic-color-fill-warning-subtle', description: 'Warning background (subtle)' },
      { name: '--ld-semantic-color-fill-error-subtle', description: 'Error background (subtle)' },
    ]
  }
];

const spacingTokens = [
  { name: '--ld-semantic-spacing-1', value: '4px', description: 'Extra small spacing' },
  { name: '--ld-semantic-spacing-2', value: '8px', description: 'Small spacing' },
  { name: '--ld-semantic-spacing-3', value: '12px', description: 'Medium spacing' },
  { name: '--ld-semantic-spacing-4', value: '16px', description: 'Large spacing' },
  { name: '--ld-semantic-spacing-5', value: '24px', description: 'Extra large spacing' },
  { name: '--ld-semantic-spacing-6', value: '32px', description: 'XXL spacing' },
];

const typographyTokens = [
  { name: '--ld-semantic-font-family-sans', value: 'Everyday Sans UI, system-ui, sans-serif', description: 'Primary font family' },
  { name: 'Font Size Small', value: '14px', description: 'Small text (buttons, labels)' },
  { name: 'Font Size Medium', value: '16px', description: 'Medium text (body, inputs)' },
  { name: 'Font Size Large', value: '18px', description: 'Large text (headings)' },
  { name: 'Font Weight Normal', value: '400', description: 'Regular weight' },
  { name: 'Font Weight Bold', value: '700', description: 'Bold weight (buttons, headings)' },
];

const borderRadiusTokens = [
  { name: '--ld-semantic-border-radius-small', value: '4px', description: 'Small radius (chips)' },
  { name: '--ld-semantic-border-radius-medium', value: '8px', description: 'Medium radius (cards, inputs)' },
  { name: '--ld-semantic-border-radius-large', value: '12px', description: 'Large radius' },
  { name: 'Button Border Radius', value: '9999px', description: 'Pill shape (buttons)' },
];

const ColorSwatch: React.FC<{ tokenName: string; description: string }> = ({ tokenName, description }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`var(${tokenName})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        border: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onClick={copyToClipboard}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-surface-secondary, #F7F7F8)';
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-moderate, #E6E6E8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtle, #F0F0F1)';
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '6px',
          backgroundColor: `var(${tokenName})`,
          boxShadow: 'var(--ld-semantic-elevation-100)',
          flexShrink: 0
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          fontFamily: 'monospace',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {tokenName}
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)'
        }}>
          {description}
        </div>
      </div>
      {copied && (
        <div style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
          fontWeight: '600'
        }}>
          {t('componentLibrary.copied')}!
        </div>
      )}
    </div>
  );
};

export default function DesignTokensPage() {
  const { t } = useTranslation();
  return (
    <div style={{
      padding: '48px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '12px'
        }}>
          {t('componentLibrary.designTokensTitle')}
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          {t('componentLibrary.designTokensDesc')}
        </p>
      </div>

      {/* Color Tokens */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          {t('componentLibrary.colorTokens')}
        </h2>
        
        {colorTokens.map((group) => (
          <div
            key={group.category}
            style={{
              marginBottom: '32px'
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              marginBottom: '16px'
            }}>
              {group.category}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '12px'
            }}>
              {group.tokens.map((token) => (
                <ColorSwatch
                  key={token.name}
                  tokenName={token.name}
                  description={token.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spacing Tokens */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          {t('componentLibrary.spacingTokens')}
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          {spacingTokens.map((token) => (
            <div
              key={token.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '16px 0',
                borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
              }}
            >
              <div
                style={{
                  width: token.value,
                  height: '24px',
                  backgroundColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
                  borderRadius: '2px'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'monospace',
                  color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                  marginBottom: '4px'
                }}>
                  {token.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text-secondary, #74767C)'
                }}>
                  {token.description}
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'monospace',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Tokens */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          {t('componentLibrary.typographyTokens')}
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          {typographyTokens.map((token) => (
            <div
              key={token.name}
              style={{
                padding: '16px 0',
                borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'monospace',
                color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                marginBottom: '8px'
              }}>
                {token.name}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                marginBottom: '12px'
              }}>
                {token.description}
              </div>
              <div style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                color: 'var(--ld-semantic-color-text-tertiary, #A0A1A6)',
                backgroundColor: 'var(--ld-semantic-color-fill-surface-tertiary, #F0F0F1)',
                padding: '8px 12px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius Tokens */}
      <div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '24px'
        }}>
          {t('componentLibrary.borderRadiusTokens')}
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          {borderRadiusTokens.map((token) => (
            <div
              key={token.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '16px 0',
                borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #F0F0F1)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
                  borderRadius: token.value
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'monospace',
                  color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
                  marginBottom: '4px'
                }}>
                  {token.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text-secondary, #74767C)'
                }}>
                  {token.description}
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'monospace',
                color: 'var(--ld-semantic-color-text-secondary, #74767C)'
              }}>
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
