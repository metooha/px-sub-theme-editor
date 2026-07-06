import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';

/* ── Data ──────────────────────────────────────────────────────── */

interface RecMeta {
  label: string;
  value: string;
  accent?: boolean;
  dropdown?: boolean;
}

interface RecCard {
  id: string;
  type: 'alert' | 'rec';
  title: string;
  subcopy: React.ReactNode;
  meta: RecMeta[];
  metaGap?: string;
  metaAlign?: string;
}

const CARDS: RecCard[] = [
  {
    id: 'daily-budget',
    type: 'alert',
    title: 'Update daily budget',
    subcopy: (
      <>
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Walmart|Sponsored Product|Cross Device|Auto|All Positions FY2020|3747
        </span>{' '}
        has run out of <strong>daily budget</strong>. Applying our recommendation could help keep your
        ads running all day.{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
      </>
    ),
    meta: [
      { label: 'Daily budget', value: '$200' },
      { label: 'Cap-out time', value: '2:00 pm' },
    ],
    metaGap: 'var(--ld-primitive-scale-space-150, 12px)',
    metaAlign: 'center',
  },
  {
    id: 'add-items',
    type: 'rec',
    title: 'Add items to existing campaign',
    subcopy: (
      <>
        Adding items that you're not advertising to{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747
        </span>{' '}
        has the potential to drive sales.{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
      </>
    ),
    meta: [
      { label: 'Number of items', value: '93' },
      { label: 'Average listing quality', value: '51.5%' },
      { label: 'Combined potential increase in sales/week', value: '$12-14k', accent: true },
    ],
    metaGap: 'var(--ld-primitive-scale-space-50, 4px)',
    metaAlign: 'flex-end',
  },
  {
    id: 'roas-target',
    type: 'rec',
    title: 'Update ROAS target',
    subcopy: (
      <>
        Applying our <strong>ROAS target</strong> and <strong>budget</strong> recommendation to{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747
        </span>{' '}
        could help increase your sales.{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
      </>
    ),
    meta: [
      { label: 'ROAS target', value: '2.50' },
      { label: 'Daily budget', value: '$200' },
      { label: 'Potential increase in sales/week', value: '$5.6k', accent: true },
    ],
    metaGap: 'var(--ld-primitive-scale-space-50, 4px)',
    metaAlign: 'center',
  },
  {
    id: 'high-quality-items',
    type: 'rec',
    title: 'Advertise high-quality items',
    subcopy: (
      <>
        We found <strong>items</strong> that you're not advertising that have the potential to drive
        sales in a Sponsored Products automatic campaign.{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
      </>
    ),
    meta: [
      { label: 'Number of items', value: '1,000' },
      { label: 'Average listing quality', value: '88.5%', accent: true },
      { label: 'Items', value: 'Free Rein 12 oz. Med...', dropdown: true },
    ],
  },
  {
    id: 'new-keywords',
    type: 'rec',
    title: 'Add new keywords',
    subcopy: (
      <>
        Add new <strong>keywords</strong> to{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
          Walmart|Sponsored Product|Cross Device|Auto|All Positions FY2020|3747
        </span>{' '}
        which have the potential to enhance item visibility and boost sales.{' '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
      </>
    ),
    meta: [{ label: 'Number of keywords', value: '65' }],
  },
];

/* ── Icons ─────────────────────────────────────────────────────── */

function AlertIcon() {
  return (
    <div style={{
      display: 'flex',
      padding: '3px 2px',
      alignItems: 'center',
      borderRadius: '24px',
      background: '#F8D2D3',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#9B1419"/>
        <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#9B1419"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#9B1419"/>
      </svg>
    </div>
  );
}

function RecIcon() {
  return (
    <div style={{
      display: 'flex',
      padding: '4px',
      alignItems: 'center',
      borderRadius: '24px',
      background: '#F5D5E9',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
      </svg>
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────────── */

function RecCardView({ card }: { card: RecCard }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--ld-primitive-scale-borderradius-150, 12px)',
      background: 'var(--ld-semantic-color-surface, #fff)',
      boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)',
      flexShrink: 0,
      width: '100%',
      height: '337px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        height: '56px',
        padding: 'var(--ld-primitive-scale-space-200, 16px)',
        alignItems: 'center',
        gap: 'var(--ld-primitive-scale-space-100, 8px)',
        flexShrink: 0,
      }}>
        {card.type === 'alert' ? <AlertIcon /> : <RecIcon />}
        <span style={{
          fontWeight: 700,
          fontSize: 'var(--ld-semantic-font-body-large-size, 18px)',
          lineHeight: 'var(--ld-semantic-font-body-large-lineheight, 1.33)',
          color: 'var(--ld-semantic-color-text)',
        }}>
          {card.title}
        </span>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 var(--ld-primitive-scale-space-200, 16px) var(--ld-primitive-scale-space-200, 16px)',
        gap: 'var(--ld-primitive-scale-space-200, 16px)',
        flex: '1 0 0',
        overflow: 'hidden',
      }}>
        {/* Subcopy */}
        <p style={{
          fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
          lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.43)',
          color: 'var(--ld-semantic-color-text)',
          margin: 0,
        }}>
          {card.subcopy}
        </p>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: card.metaGap ?? 'var(--ld-primitive-scale-space-150, 12px)', flexWrap: 'wrap', alignItems: card.metaAlign ?? 'center', alignContent: card.metaAlign ?? 'center' }}>
          {card.meta.map((m) => (
            <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-primitive-scale-space-50, 4px)', minWidth: '70px' }}>
              <span style={{
                fontSize: 'var(--ld-semantic-font-caption-size, 12px)',
                lineHeight: 'var(--ld-semantic-font-caption-lineheight, 1.33)',
                color: m.accent ? 'var(--ld-semantic-color-text-accent-green)' : 'var(--ld-semantic-color-text)',
              }}>
                {m.label}
              </span>
              {m.dropdown ? (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ld-primitive-scale-space-50, 4px)',
                  fontWeight: 700,
                  fontSize: 'var(--ld-semantic-font-body-large-size, 18px)',
                  lineHeight: 'var(--ld-semantic-font-body-large-lineheight, 1.33)',
                  color: 'var(--ld-semantic-color-text)',
                  cursor: 'pointer',
                }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px' }}>{m.value}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M7.62372 10.329C7.71866 10.4375 7.85583 10.4998 8.00001 10.4998C8.14419 10.4998 8.28135 10.4375 8.3763 10.329L11.8763 6.32901C12.0055 6.18136 12.0364 5.9718 11.9553 5.79315C11.8743 5.61449 11.6962 5.49976 11.5 5.49976H4.50001C4.30382 5.49976 4.12576 5.61449 4.04469 5.79315C3.96362 5.9718 3.99453 6.18136 4.12372 6.32901L7.62372 10.329Z" fill="var(--ld-semantic-color-text, #2E2F32)"/>
                  </svg>
                </span>
              ) : (
                <span style={{
                  fontWeight: 700,
                  fontSize: 'var(--ld-semantic-font-body-large-size, 18px)',
                  lineHeight: 'var(--ld-semantic-font-body-large-lineheight, 1.33)',
                  color: m.accent ? 'var(--ld-semantic-color-text-accent-green)' : 'var(--ld-semantic-color-text)',
                }}>
                  {m.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ padding: '0 var(--ld-primitive-scale-space-200, 16px)' }}>
        <div style={{ height: '1px', background: 'var(--ld-semantic-color-separator, #e3e4e5)' }} />
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        padding: 'var(--ld-primitive-scale-space-200, 16px)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 'var(--ld-primitive-scale-space-200, 16px)',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        <LinkButton size="small">Request report</LinkButton>
        <LinkButton size="small">See details</LinkButton>
        <Button variant="primary" size="small">Apply</Button>
      </div>
    </div>
  );
}

/* ── Carousel ───────────────────────────────────────────────────── */

const PEEK = 36; // px of adjacent card visible on each side
const CARD_GAP = 12; // px gap between cards

export function MartyRecommendationsCarousel() {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const total = CARDS.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardWidth = viewportWidth > 0 ? viewportWidth - PEEK * 2 : 260;
  const translateX = PEEK - index * (cardWidth + CARD_GAP);

  const canPrev = index > 0;
  const canNext = index < total - 1;

  const navBtnStyle = (enabled: boolean): React.CSSProperties => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid transparent',
    background: 'var(--ld-semantic-color-background, #fff)',
    boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.10), 0 5px 10px 3px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 1 : 0,
    pointerEvents: enabled ? 'auto' : 'none',
    padding: 0,
    transition: 'opacity 150ms ease',
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%', padding: '4px 0' }}>

      {/* Carousel viewport with overlaid arrows */}
      <div style={{ position: 'relative' }}>
        {/* Sliding viewport — clips track horizontally, allows shadow vertically */}
        <div ref={viewportRef} style={{ width: '100%', overflow: 'hidden', paddingTop: '4px', paddingBottom: '6px' }}>
          <div
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                onClick={() => i !== index && setIndex(i)}
                style={{
                  flexShrink: 0,
                  width: `${cardWidth}px`,
                  opacity: i === index ? 1 : 0.55,
                  transform: i === index ? 'scale(1)' : 'scale(0.97)',
                  transition: 'opacity 300ms ease, transform 300ms ease',
                  cursor: i !== index ? 'pointer' : 'default',
                }}
              >
                <RecCardView card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Left arrow — overlaid at bottom-left */}
        <button
          aria-label="Previous"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          style={{ ...navBtnStyle(canPrev), left: '0px' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.166 8.377L10.308 14 11 13.246 5.27 8l5.73-5.247L10.308 2 4.166 7.623A.95.95 0 0 0 4 8c0 .143.06.28.166.377Z" fill="var(--ld-semantic-color-text, #2E2F32)"/>
          </svg>
        </button>

        {/* Right arrow — overlaid at bottom-right */}
        <button
          aria-label="Next"
          onClick={() => setIndex(i => Math.min(total - 1, i + 1))}
          style={{ ...navBtnStyle(canNext), right: '0px' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.834 8.377L5.692 14 5 13.246 10.731 8 5 2.753 5.692 2l6.142 5.623A.95.95 0 0 1 12 8c0 .143-.06.28-.166.377Z" fill="var(--ld-semantic-color-text, #2E2F32)"/>
          </svg>
        </button>
      </div>

      {/* Pagination dots — centered below */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--ld-primitive-scale-space-100, 8px)', padding: '12px 0', minHeight: '32px' }}>
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to card ${i + 1}`}
            style={{
              width: i === index ? '16px' : '8px',
              height: '8px',
              borderRadius: '1000px',
              border: '1px solid var(--ld-semantic-color-text, #2e2f32)',
              background: i === index
                ? 'var(--ld-semantic-color-text, #2e2f32)'
                : 'var(--ld-semantic-color-fill-subtle, #f8f8f8)',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 200ms ease, background 200ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
