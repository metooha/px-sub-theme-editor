import React from 'react';
import { InfoCircle, Star, ChevronDown, ChevronRight, Search, ArrowRight, Check, Magic } from '@/components/icons';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Radio } from '@/components/ui/Radio';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';

/**
 * Wrapper that constrains preview content to a fixed area inside each card.
 * pointer-events:none prevents accidental interaction.
 */
function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 16px',
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Individual previews ─── */

function AlertsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', transform: 'scale(0.85)', transformOrigin: 'center' }}>
        <Alert variant="info">This is an informational alert.</Alert>
      </div>
    </PreviewFrame>
  );
}

function BadgesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="green" value={5} aria-label="5 items" />
        <Badge variant="blue" value={12} aria-label="12 items" />
        <Badge variant="red" value={3} aria-label="3 items" />
      </div>
    </PreviewFrame>
  );
}

function BreadcrumbsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
        <span style={{ color: 'var(--ld-semantic-color-link-text-subtle, #515357)', textDecoration: 'underline' }}>Home</span>
        <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>/</span>
        <span style={{ color: 'var(--ld-semantic-color-link-text-subtle, #515357)', textDecoration: 'underline' }}>Products</span>
        <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>/</span>
        <span style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Current</span>
      </div>
    </PreviewFrame>
  );
}

function ButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', transform: 'scale(0.85)', transformOrigin: 'center' }}>
        <Button variant="primary" size="small">Primary</Button>
        <Button variant="secondary" size="small">Secondary</Button>
      </div>
    </PreviewFrame>
  );
}

function CardsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px',
        padding: '12px 16px',
        width: '160px',
        background: 'white',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Card Title</div>
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Card content area</div>
      </div>
    </PreviewFrame>
  );
}

function CheckboxesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox checked={true} onChange={() => {}} label="Checked" />
        <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
      </div>
    </PreviewFrame>
  );
}

function ChipsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Chip selected size="small">Active</Chip>
        <Chip size="small">Draft</Chip>
        <Chip size="small">Archived</Chip>
      </div>
    </PreviewFrame>
  );
}

function FilterChipsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <FilterChip selected>Status</FilterChip>
        <FilterChip>Type</FilterChip>
      </div>
    </PreviewFrame>
  );
}

function TagsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Tag variant="secondary" color="positive">Active</Tag>
        <Tag variant="primary" color="brand">Brand</Tag>
        <Tag variant="secondary" color="warning">Warning</Tag>
      </div>
    </PreviewFrame>
  );
}

function DividersPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Section A</div>
        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--ld-semantic-color-separator)', margin: 0 }} />
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Section B</div>
      </div>
    </PreviewFrame>
  );
}

function SwitchesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[{ on: true, label: 'Enabled' }, { on: false, label: 'Disabled' }].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '10px', position: 'relative',
              background: s.on ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-border-strong, #BABBBE)',
            }}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '2px', left: s.on ? '18px' : '2px',
              }} />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function LinksPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline' }}>
          Default link
        </span>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', textDecoration: 'underline' }}>
          Subtle link
        </span>
      </div>
    </PreviewFrame>
  );
}

function LinkButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline', fontWeight: 600 }}>
          Action
        </span>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline' }}>
          Small
        </span>
      </div>
    </PreviewFrame>
  );
}

function IconButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle].map((Icon, i) => (
          <div key={i} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          }}>
            <Icon style={{ width: 18, height: 18, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function IconsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle, ArrowRight, Check].map((Icon, i) => (
          <Icon key={i} style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        ))}
      </div>
    </PreviewFrame>
  );
}

function RadioButtonsPreview() {
  return (
    <PreviewFrame>
      <RadioGroup value="a" onValueChange={() => {}}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </PreviewFrame>
  );
}

function SelectPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '4px', padding: '8px 12px', width: '180px', background: 'white',
      }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Select option</span>
        <ChevronDown style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
      </div>
    </PreviewFrame>
  );
}

function TextFieldsPreview() {
  return (
    <PreviewFrame>
      <div style={{ transform: 'scale(0.9)', transformOrigin: 'center', width: '170px' }}>
        <TextField
          size="small"
          label="Label"
          placeholder="Placeholder text"
        />
      </div>
    </PreviewFrame>
  );
}

function TextAreaPreview() {
  return (
    <PreviewFrame>
      <div style={{ transform: 'scale(0.85)', transformOrigin: 'center', width: '180px' }}>
        <TextArea
          size="small"
          label="Label"
          placeholder="Multi-line text..."
          rows={2}
        />
      </div>
    </PreviewFrame>
  );
}

function FormGroupsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '4px', padding: '10px 12px', width: '160px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '6px' }}>Group Label</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Item 1', 'Item 2'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '2px',
                border: '2px solid var(--ld-semantic-color-border-strong, #BABBBE)',
              }} />
              <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function CalloutsPreview() {
  return (
    <PreviewFrame>
      <div style={{ position: 'relative', maxWidth: '180px' }}>
        <div style={{
          background: 'var(--ld-semantic-color-text, #2E2F32)',
          borderRadius: '6px', padding: '8px 12px',
          fontSize: '12px', color: '#FFFFFF',
        }}>
          Helpful tip for the user
        </div>
        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: '-5px', left: '24px',
          width: '10px', height: '5px', overflow: 'hidden',
        }}>
          <div style={{
            width: '8px', height: '8px',
            background: 'var(--ld-semantic-color-text, #2E2F32)',
            transform: 'rotate(45deg)', position: 'absolute', top: '-4px', left: '1px',
          }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

function ContentMessagesPreview() {
  return (
    <PreviewFrame>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 6px',
          background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <InfoCircle style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>No results found</div>
        <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Try adjusting your filters</div>
      </div>
    </PreviewFrame>
  );
}

function DateFieldsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Date</div>
        <div style={{
          border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          borderRadius: '4px', padding: '8px 12px', background: 'white',
          fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)',
        }}>
          02/18/2026
        </div>
      </div>
    </PreviewFrame>
  );
}

function DatePickersPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '6px', padding: '8px', background: 'white', width: '160px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', textAlign: 'center', marginBottom: '6px' }}>February 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={`h-${i}`} style={{ fontSize: '9px', textAlign: 'center', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{d}</div>
          ))}
          {Array.from({ length: 7 }, (_, i) => i + 15).map(d => (
            <div key={d} style={{
              fontSize: '10px', textAlign: 'center', padding: '2px',
              borderRadius: '50%',
              background: d === 18 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent',
              color: d === 18 ? 'white' : 'var(--ld-semantic-color-text, #2E2F32)',
            }}>
              {d}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function ListsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column' }}>
        {['List item 1', 'List item 2', 'List item 3'].map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0',
            borderBottom: i < 2 ? '1px solid var(--ld-semantic-color-separator)' : 'none',
          }}>
            <ChevronRight style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{t}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function MagicBoxPreview() {
  return (
    <PreviewFrame>
      <div style={{
        position: 'relative', width: '140px', height: '50px',
      }}>
        {/* Glow border */}
        <div style={{
          position: 'absolute', inset: '-2px', borderRadius: '18px',
          background: 'linear-gradient(135deg, var(--ld-semantic-color-border-magic-start, #0053E2), var(--ld-semantic-color-border-magic-middle, #3D90EC), var(--ld-semantic-color-border-magic-stop, #79CDF6))',
          filter: 'blur(1px)', opacity: 0.8,
        }} />
        {/* Inner content */}
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: '16px',
          background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          fontSize: '13px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)',
        }}>
          <Magic style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-border-magic-start, #0053E2)' }} />
          AI Content
        </div>
      </div>
    </PreviewFrame>
  );
}

function MenuPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '6px', padding: '4px', background: 'white', width: '140px',
        boxShadow: 'var(--ld-semantic-elevation-200)',
      }}>
        {['Edit', 'Duplicate', 'Delete'].map((t, i) => (
          <div key={i} style={{
            padding: '6px 10px', fontSize: '12px', borderRadius: '4px',
            color: i === 2 ? 'var(--ld-semantic-color-text-negative, #C5221F)' : 'var(--ld-semantic-color-text, #2E2F32)',
            background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent',
          }}>
            {t}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function MetricsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>1.2M</div>
          <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Impressions</div>
        </div>
        <div style={{ width: '1px', height: '32px', background: 'var(--ld-semantic-color-separator)' }} />
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text-positive, #2A8703)' }}>+12%</div>
          <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>CTR</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function ModalsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px', padding: '10px 14px', background: 'white', width: '160px',
        boxShadow: 'var(--ld-semantic-elevation-300)',
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Confirm</div>
        <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>Are you sure?</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)' }}>Cancel</div>
          <div style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white' }}>OK</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function NudgesPreview() {
  return (
    <PreviewFrame>
      <div style={{
        background: 'var(--ld-semantic-color-fill-info-subtle, #E5F0FF)',
        borderRadius: '6px', padding: '8px 12px', maxWidth: '200px',
        fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <InfoCircle style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-brand-bold, #0071DC)', flexShrink: 0 }} />
        <span>Did you know you can...</span>
      </div>
    </PreviewFrame>
  );
}

function PanelsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', width: '180px', height: '64px', borderRadius: '6px', overflow: 'hidden', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ flex: 1, background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', padding: '6px', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Main</div>
        <div style={{ width: '70px', borderLeft: '1px solid var(--ld-semantic-color-separator)', background: 'white', padding: '6px', fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Panel</div>
      </div>
    </PreviewFrame>
  );
}

function ProgressIndicatorPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          border: '3px solid var(--ld-semantic-color-fill-subtle, #E2E2E3)',
          borderTopColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)',
        }} />
        <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)', overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', borderRadius: '3px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

function ProgressTrackerPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[true, true, false].map((done, i) => (
          <React.Fragment key={i}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: done ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-fill-subtle, #E2E2E3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: done ? 'white' : 'var(--ld-semantic-color-text-subtle, #74767C)',
            }}>
              {done ? <Check style={{ width: 12, height: 12 }} /> : i + 1}
            </div>
            {i < 2 && (
              <div style={{
                width: '20px', height: '2px',
                background: done && i < 1 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-fill-subtle, #E2E2E3)',
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </PreviewFrame>
  );
}

function SnackbarsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        background: 'var(--ld-semantic-color-text, #2E2F32)',
        borderRadius: '6px', padding: '8px 14px',
        fontSize: '12px', color: 'white',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <Check style={{ width: 14, height: 14 }} />
        Changes saved
      </div>
    </PreviewFrame>
  );
}

function SpinnersPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Spinner size="large" />
        <Spinner size="small" />
      </div>
    </PreviewFrame>
  );
}

function SpotIconsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle].map((Icon, i) => (
          <div key={i} style={{
            width: '40px', height: '40px', borderRadius: '9999px',
            background: 'var(--ld-semantic-color-fill-brand-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #0053E2)' }} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function TabsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', borderBottom: '2px solid var(--ld-semantic-color-separator)' }}>
        {['Tab 1', 'Tab 2', 'Tab 3'].map((t, i) => (
          <div key={i} style={{
            padding: '6px 12px', fontSize: '12px', fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? 'var(--ld-semantic-color-text, #2e2f32)' : 'var(--ld-semantic-color-text-subtle, #74767C)',
            borderBottom: i === 0 ? '2px solid var(--ld-semantic-color-action-fill-primary, #0071DC)' : '2px solid transparent',
            marginBottom: '-2px',
          }}>
            {t}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function TablePreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', fontSize: '11px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--ld-semantic-color-separator)', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', background: 'var(--ld-semantic-color-fill-subtle, #f8f8f8)' }}>
          <div style={{ flex: 1, padding: '4px 6px' }}>Name</div>
          <div style={{ width: '50px', padding: '4px 6px', textAlign: 'right' }}>Value</div>
        </div>
        {[['Item A', '$12'], ['Item B', '$34']].map(([n, v], i) => (
          <div key={i} style={{ display: 'flex', borderBottom: '1px solid var(--ld-semantic-color-separator)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
            <div style={{ flex: 1, padding: '4px 6px' }}>{n}</div>
            <div style={{ width: '50px', padding: '4px 6px', textAlign: 'right' }}>{v}</div>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function BottomSheetPreview() {
  return (
    <PreviewFrame>
      <div style={{
        width: '140px', height: '70px', position: 'relative',
        background: 'rgba(0,0,0,0.15)', borderRadius: '6px', overflow: 'hidden',
      }}>
        {/* Sheet sliding up */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45px',
          background: 'var(--ld-semantic-color-surface-overlay, #fff)',
          borderTopLeftRadius: '12px', borderTopRightRadius: '12px',
          boxShadow: 'var(--ld-semantic-elevation-300)',
          padding: '6px 10px',
        }}>
          <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'var(--ld-semantic-color-border-strong, #BABBBE)', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', textAlign: 'center' }}>Sheet Title</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function SkeletonPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          width: '100%', height: '12px', borderRadius: '4px',
          background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)',
        }} />
        <div style={{
          width: '75%', height: '12px', borderRadius: '4px',
          background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)',
          opacity: 0.7,
        }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '9999px',
            background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)',
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)' }} />
            <div style={{ width: '60%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)', opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* ─── Shared Component Previews ─── */

function AccordionPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {['Section 1', 'Section 2', 'Section 3'].map((t, i) => (
          <div key={i} style={{
            border: '1px solid var(--ld-semantic-color-separator)',
            borderRadius: i === 0 ? '6px 6px 0 0' : i === 2 ? '0 0 6px 6px' : '0',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 10px', fontSize: '11px', fontWeight: 600,
              color: 'var(--ld-semantic-color-text, #2E2F32)',
              background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'white',
            }}>
              {t}
              <ChevronDown style={{ width: 10, height: 10, color: 'var(--ld-semantic-color-text-subtle, #74767C)', transform: i === 0 ? 'rotate(180deg)' : 'none' }} />
            </div>
            {i === 0 && (
              <div style={{ padding: '6px 10px', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', borderTop: '1px solid var(--ld-semantic-color-separator)' }}>
                Expanded content here
              </div>
            )}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function AlertDialogPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px', padding: '10px 14px', background: 'white', width: '170px',
        boxShadow: 'var(--ld-semantic-elevation-300)',
      }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Are you sure?</div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>This action cannot be undone.</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)' }}>Cancel</div>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-negative, #ea1100)', color: 'white' }}>Delete</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function AvatarPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[
          { initials: 'AH', bg: 'var(--ld-semantic-color-fill-accent-blue, #0053e2)' },
          { initials: 'JD', bg: 'var(--ld-semantic-color-fill-accent-green, #2a8703)' },
          { initials: 'MK', bg: 'var(--ld-semantic-color-fill-accent-purple, #63327e)' },
        ].map((a, i) => (
          <div key={i} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: a.bg, color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700,
          }}>{a.initials}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function CalendarPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '6px', padding: '8px', background: 'white', width: '160px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', textAlign: 'center', marginBottom: '6px' }}>February 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={`h-${i}`} style={{ fontSize: '9px', textAlign: 'center', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{d}</div>
          ))}
          {Array.from({ length: 7 }, (_, i) => i + 15).map(d => (
            <div key={d} style={{
              fontSize: '10px', textAlign: 'center', padding: '2px',
              borderRadius: '50%',
              background: d === 18 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent',
              color: d === 18 ? 'white' : 'var(--ld-semantic-color-text, #2E2F32)',
            }}>
              {d}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function CarouselPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%',
          border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronDown style={{ width: 10, height: 10, transform: 'rotate(90deg)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              width: '44px', height: '44px', borderRadius: '6px',
              background: n === 2 ? 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)' : 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle, #74767C)',
            }}>{n}</div>
          ))}
        </div>
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%',
          border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronDown style={{ width: 10, height: 10, transform: 'rotate(-90deg)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

function ChartPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div key={i} style={{
            width: '16px', height: `${h}%`, borderRadius: '3px 3px 0 0',
            background: i === 3 ? 'var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)',
          }} />
        ))}
      </div>
    </PreviewFrame>
  );
}

function CommandPreview() {
  return (
    <PreviewFrame>
      <div style={{
        width: '170px', borderRadius: '8px', background: 'white',
        boxShadow: 'var(--ld-semantic-elevation-200)', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 10px', borderBottom: '1px solid var(--ld-semantic-color-separator)',
        }}>
          <Search style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Type a command...</span>
        </div>
        <div style={{ padding: '4px' }}>
          {['Search', 'Settings'].map((t, i) => (
            <div key={i} style={{
              padding: '4px 8px', fontSize: '11px', borderRadius: '4px',
              color: 'var(--ld-semantic-color-text, #2E2F32)',
              background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent',
            }}>{t}</div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function ContextMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '6px', padding: '4px', background: 'white', width: '120px',
        boxShadow: 'var(--ld-semantic-elevation-200)',
      }}>
        {['Cut', 'Copy', 'Paste'].map((t, i) => (
          <div key={i} style={{
            padding: '5px 10px', fontSize: '11px', borderRadius: '4px',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>{t}</span>
            <span style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{['⌘X','⌘C','⌘V'][i]}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function DialogPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px', padding: '10px 14px', background: 'white', width: '160px',
        boxShadow: 'var(--ld-semantic-elevation-300)',
      }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Dialog Title</div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>Dialog content goes here.</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)' }}>Close</div>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white' }}>Save</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function DropdownMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '6px', padding: '4px', background: 'white', width: '130px',
        boxShadow: 'var(--ld-semantic-elevation-200)',
      }}>
        {['Profile', 'Settings', 'Log out'].map((t, i) => (
          <div key={i} style={{
            padding: '5px 10px', fontSize: '11px', borderRadius: '4px',
            color: i === 2 ? 'var(--ld-semantic-color-text-negative, #ea1100)' : 'var(--ld-semantic-color-text, #2E2F32)',
            borderTop: i === 2 ? '1px solid var(--ld-semantic-color-separator)' : 'none',
            marginTop: i === 2 ? '2px' : 0,
            paddingTop: i === 2 ? '6px' : '5px',
          }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function FormPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '2px' }}>Email</div>
          <div style={{
            border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
            borderRadius: '4px', padding: '4px 8px', background: 'white',
            fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
          }}>user@email.com</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '2px' }}>Password</div>
          <div style={{
            border: '1px solid var(--ld-semantic-color-border-negative, #ea1100)',
            borderRadius: '4px', padding: '4px 8px', background: 'white',
            fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}>••••••</div>
          <div style={{ fontSize: '9px', color: 'var(--ld-semantic-color-text-negative, #ea1100)', marginTop: '2px' }}>Required field</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function MenubarPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', gap: '2px', padding: '4px',
        background: 'white', borderRadius: '6px',
        border: '1px solid var(--ld-semantic-color-separator)',
      }}>
        {['File', 'Edit', 'View', 'Help'].map((t, i) => (
          <div key={i} style={{
            padding: '4px 10px', fontSize: '11px', borderRadius: '4px',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent',
            fontWeight: i === 0 ? 600 : 400,
          }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function NavigationMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {['Home', 'Products', 'About'].map((t, i) => (
          <div key={i} style={{
            fontSize: '12px', fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? 'var(--ld-semantic-color-text-brand-bold, #0053e2)' : 'var(--ld-semantic-color-text, #2E2F32)',
            borderBottom: i === 0 ? '2px solid var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'none',
            paddingBottom: '4px',
          }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function PaginationPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '4px',
          border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}>&laquo;</div>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            width: '24px', height: '24px', borderRadius: '4px',
            background: n === 1 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent',
            border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: n === 1 ? 700 : 400,
            color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}>{n}</div>
        ))}
        <div style={{
          width: '24px', height: '24px', borderRadius: '4px',
          border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}>&raquo;</div>
      </div>
    </PreviewFrame>
  );
}

function PopoverPreview() {
  return (
    <PreviewFrame>
      <div style={{ position: 'relative' }}>
        <div style={{
          borderRadius: '8px', padding: '8px 12px', background: 'white',
          boxShadow: 'var(--ld-semantic-elevation-200)',
          fontSize: '11px', color: 'var(--ld-semantic-color-text, #2E2F32)',
          width: '130px',
        }}>
          Popover content with details
        </div>
        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)',
          width: '10px', height: '5px', overflow: 'hidden',
        }}>
          <div style={{
            width: '8px', height: '8px', background: 'white',
            transform: 'rotate(45deg)', position: 'absolute', top: '-4px', left: '1px',
            boxShadow: 'var(--ld-semantic-elevation-200)',
          }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

function ProgressPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', borderRadius: '4px', background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
          <span style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Uploading...</span>
          <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>65%</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function RadioGroupPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {['Option A', 'Option B', 'Option C'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              border: i === 0 ? '5px solid var(--ld-semantic-color-action-fill-primary, #0053e2)' : '2px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
              boxSizing: 'border-box',
            }} />
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function ScrollAreaPreview() {
  return (
    <PreviewFrame>
      <div style={{
        width: '140px', height: '64px', position: 'relative',
        border: '1px solid var(--ld-semantic-color-separator)',
        borderRadius: '6px', overflow: 'hidden',
      }}>
        <div style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((t, i) => (
            <div key={i} style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)', whiteSpace: 'nowrap' }}>{t}</div>
          ))}
        </div>
        {/* Scrollbar */}
        <div style={{
          position: 'absolute', right: '2px', top: '4px', width: '4px', height: '24px',
          borderRadius: '2px', background: 'var(--ld-semantic-color-border-subtle, #BABBBE)',
          opacity: 0.6,
        }} />
      </div>
    </PreviewFrame>
  );
}

function SeparatorPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '160px' }}>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Left</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--ld-semantic-color-separator)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Right</span>
      </div>
    </PreviewFrame>
  );
}

function SheetPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', width: '180px', height: '64px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1 }} />
        <div style={{
          width: '80px', background: 'white', padding: '8px',
          boxShadow: 'var(--ld-semantic-elevation-300)',
          borderLeft: '1px solid var(--ld-semantic-color-separator)',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Sheet</div>
          <div style={{ fontSize: '9px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Side content</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function SliderPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <div style={{ width: '100%', position: 'relative', height: '16px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)' }}>
            <div style={{ width: '60%', height: '100%', borderRadius: '2px', background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)' }} />
          </div>
          <div style={{
            position: 'absolute', left: '57%', top: '50%', transform: 'translate(-50%, -50%)',
            width: '14px', height: '14px', borderRadius: '50%',
            background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)',
            border: '2px solid white',
            boxShadow: 'var(--ld-semantic-elevation-100)',
          }} />
        </div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Value: 60</div>
      </div>
    </PreviewFrame>
  );
}

function SwitchPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[{ on: true, label: 'Active' }, { on: false, label: 'Inactive' }].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '10px', position: 'relative',
              background: s.on ? 'var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'var(--ld-semantic-color-border-subtle, #BABBBE)',
            }}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '2px', left: s.on ? '18px' : '2px',
              }} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function ToastPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'white', borderRadius: '8px', padding: '8px 12px',
        boxShadow: 'var(--ld-semantic-elevation-200)',
        border: '1px solid var(--ld-semantic-color-separator)',
        width: '170px',
      }}>
        <div style={{
          width: '16px', height: '16px', borderRadius: '50%',
          background: 'var(--ld-semantic-color-fill-positive, #2a8703)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Check style={{ width: 10, height: 10, color: 'white' }} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Success</div>
          <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Changes saved</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function TogglePreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[
          { label: 'B', active: true },
          { label: 'I', active: false },
          { label: 'U', active: false },
        ].map((t, i) => (
          <div key={i} style={{
            width: '32px', height: '32px', borderRadius: '6px',
            border: '1px solid var(--ld-semantic-color-separator)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: t.active ? 700 : 400,
            background: t.active ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'white',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            fontStyle: t.label === 'I' ? 'italic' : 'normal',
            textDecoration: t.label === 'U' ? 'underline' : 'none',
          }}>{t.label}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function DateRangePickerPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)',
        borderRadius: '4px', padding: '6px 12px', background: 'white',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Feb 1</span>
        <ArrowRight style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Feb 18</span>
      </div>
    </PreviewFrame>
  );
}

function CollapsiblePreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '6px 10px', borderRadius: '6px',
          background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
          fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)',
        }}>
          Click to toggle
          <ChevronDown style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)', transform: 'rotate(180deg)' }} />
        </div>
        <div style={{
          padding: '6px 10px', fontSize: '10px',
          color: 'var(--ld-semantic-color-text-subtle, #74767C)',
          borderLeft: '2px solid var(--ld-semantic-color-separator)', marginLeft: '10px', marginTop: '4px',
        }}>
          Revealed content
        </div>
      </div>
    </PreviewFrame>
  );
}

/* ─── Fallback ─── */
function GenericPreview({ icon }: { icon: string }) {
  const Icon = ({
    ArrowRight, BarGraph: ArrowRight, Box: InfoCircle, Calendar: InfoCircle,
    Chat: InfoCircle, Check, ChevronDown, Circle: InfoCircle, Edit: InfoCircle,
    ExclamationCircle: InfoCircle, Filter: InfoCircle, InfoCircle,
    Link: InfoCircle, List: InfoCircle, Magic: Star, Menu: InfoCircle,
    Minus: InfoCircle, Note: InfoCircle, PanelLeft: InfoCircle, Refresh: InfoCircle,
    Search, Settings: InfoCircle, Star, Tag: InfoCircle,
  } as Record<string, React.ComponentType<{ style?: React.CSSProperties }>>)[icon] || InfoCircle;

  return (
    <PreviewFrame>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: 24, height: 24, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
      </div>
    </PreviewFrame>
  );
}

/* ─── Preview registry ─── */
const PREVIEW_MAP: Record<string, React.FC> = {
  'Alerts': AlertsPreview,
  'Badges': BadgesPreview,
  'Breadcrumbs': BreadcrumbsPreview,
  'Buttons': ButtonsPreview,
  'Cards': CardsPreview,
  'Checkboxes': CheckboxesPreview,
  'Chips': ChipsPreview,
  'Content Messages': ContentMessagesPreview,
  'Date Fields': DateFieldsPreview,
  'Date Pickers': DatePickersPreview,
  'Dividers': DividersPreview,
  'Filter Chips': FilterChipsPreview,
  'Form Groups': FormGroupsPreview,
  'Icon Buttons': IconButtonsPreview,
  'Icons': IconsPreview,
  'Link Buttons': LinkButtonsPreview,
  'Links': LinksPreview,
  'Lists': ListsPreview,
  'Magic Box': MagicBoxPreview,
  'Menu': MenuPreview,
  'Metrics': MetricsPreview,
  'Modals': ModalsPreview,
  'Nudges': NudgesPreview,
  'Panels': PanelsPreview,
  'Progress Indicator': ProgressIndicatorPreview,
  'Progress Tracker': ProgressTrackerPreview,
  'Radio Buttons': RadioButtonsPreview,
  'Select': SelectPreview,
  'Snackbars': SnackbarsPreview,
  'Spinners': SpinnersPreview,
  'Spot Icons': SpotIconsPreview,
  'Switches': SwitchesPreview,
  'Tab Navigation': TabsPreview,
  'Tags': TagsPreview,
  'Text Area': TextAreaPreview,
  'Text Fields': TextFieldsPreview,
  'Table': TablePreview,
  'Callouts': CalloutsPreview,
  'Bottom Sheet': BottomSheetPreview,
  'Skeleton': SkeletonPreview,
  // Shared Components
  'Accordion': AccordionPreview,
  'Alert Dialog': AlertDialogPreview,
  'Avatar': AvatarPreview,
  'Calendar': CalendarPreview,
  'Carousel': CarouselPreview,
  'Chart': ChartPreview,
  'Command': CommandPreview,
  'Context Menu': ContextMenuPreview,
  'Dialog': DialogPreview,
  'Dropdown Menu': DropdownMenuPreview,
  'Form': FormPreview,
  'Menubar': MenubarPreview,
  'Navigation Menu': NavigationMenuPreview,
  'Pagination': PaginationPreview,
  'Popover': PopoverPreview,
  'Progress': ProgressPreview,
  'Radio Group': RadioGroupPreview,
  'Scroll Area': ScrollAreaPreview,
  'Separator': SeparatorPreview,
  'Sheet': SheetPreview,
  'Slider': SliderPreview,
  'Switch': SwitchPreview,
  'Toast': ToastPreview,
  'Toggle': TogglePreview,
  'Date Range Picker': DateRangePickerPreview,
  'Collapsible': CollapsiblePreview,
};

export function getComponentPreview(title: string, icon: string): React.ReactNode {
  const Preview = PREVIEW_MAP[title];
  if (Preview) return <Preview />;
  return <GenericPreview icon={icon} />;
}
