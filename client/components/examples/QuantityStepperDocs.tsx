import React from 'react';

const sectionStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const h2Style: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  marginBottom: '16px',
};

const h3Style: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  marginBottom: '8px',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '14px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-subtle, #46474A)',
  lineHeight: 1.6,
  marginBottom: '16px',
};

const tableWrapStyle: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: '24px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
};

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F7F8F9)',
  borderBottom: '1px solid var(--ld-semantic-color-border, #E6E6E8)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  color: 'var(--ld-semantic-color-text-subtle, #46474A)',
  borderBottom: '1px solid var(--ld-semantic-color-border, #E6E6E8)',
  verticalAlign: 'top',
};

const codeInline: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-mono, monospace)',
  fontSize: '13px',
  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F7F8F9)',
  padding: '2px 6px',
  borderRadius: '4px',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
};

const codeBlockStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-mono, monospace)',
  fontSize: '13px',
  backgroundColor: 'var(--ld-semantic-color-fill-subtle, #F7F8F9)',
  padding: '16px 20px',
  borderRadius: '6px',
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
  color: 'var(--ld-semantic-color-text, #2E2F32)',
  overflowX: 'auto',
  marginBottom: '16px',
};

const listStyle: React.CSSProperties = {
  ...bodyStyle,
  paddingLeft: '20px',
  marginBottom: '16px',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '6px',
};

const dividerStyle: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid var(--ld-semantic-color-border, #E6E6E8)',
  margin: '40px 0',
};

function DoItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={listItemStyle}>
      <span style={{ color: 'var(--ld-semantic-color-text-positive, #1a7d36)', fontWeight: 600 }}>Do: </span>
      {children}
    </li>
  );
}

function DontItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={listItemStyle}>
      <span style={{ color: 'var(--ld-semantic-color-text-negative, #cc0000)', fontWeight: 600 }}>Don't: </span>
      {children}
    </li>
  );
}

export function QuantityStepperAccessibilityDocs() {
  return (
    <div>
      <hr style={dividerStyle} />

      {/* ── Accessibility ── */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Accessibility</h2>
        <p style={bodyStyle}>
          The Quantity Stepper follows WCAG 2.1 guidelines for interactive controls.
          All states, roles, and labels are exposed to assistive technologies so screen reader
          users can operate the stepper without visual context.
        </p>

        <h3 style={h3Style}>Roles and ARIA attributes</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>State</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>aria-label</th>
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Collapsed (count = 0)</td>
                <td style={tdStyle}><code style={codeInline}>button</code></td>
                <td style={tdStyle}>"Add item" or custom <code style={codeInline}>cartLabel</code></td>
                <td style={tdStyle}>Single focusable element. Activating it sets count to 1 and expands.</td>
              </tr>
              <tr>
                <td style={tdStyle}>Collapsed (count &gt; 0, icon-only)</td>
                <td style={tdStyle}><code style={codeInline}>button</code></td>
                <td style={tdStyle}>"{'{count}'} items, click to edit"</td>
                <td style={tdStyle}>Circle shows count. Clicking or pressing Enter/Space expands.</td>
              </tr>
              <tr>
                <td style={tdStyle}>Expanded</td>
                <td style={tdStyle}><code style={codeInline}>group</code></td>
                <td style={tdStyle}>"Quantity stepper"</td>
                <td style={tdStyle}>Contains three focusable elements: decrement, count display, increment.</td>
              </tr>
              <tr>
                <td style={tdStyle}>Disabled</td>
                <td style={tdStyle}>Inherits role</td>
                <td style={tdStyle}>Inherits label</td>
                <td style={tdStyle}><code style={codeInline}>aria-disabled="true"</code> on pill. All buttons get <code style={codeInline}>disabled</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Focus management</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            When the user activates "Add" (click or Enter/Space), focus moves to the <strong>increment (+) button</strong> inside the expanded stepper so the user can immediately add more.
          </li>
          <li style={listItemStyle}>
            When count reaches 0, the stepper collapses and focus returns to the <strong>collapsed pill trigger</strong>.
          </li>
          <li style={listItemStyle}>
            In the expanded state, Tab moves through the three interactive zones: decrement → count → increment.
          </li>
          <li style={listItemStyle}>
            In icon-only mode, when the stepper loses focus (blur), it auto-collapses after 300ms. Re-focusing cancels the collapse.
          </li>
        </ul>

        <h3 style={h3Style}>Button labels</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Button</th>
                <th style={thStyle}>aria-label</th>
                <th style={thStyle}>Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Decrement (−)</td>
                <td style={tdStyle}>"Decrease quantity"</td>
                <td style={tdStyle}>Default when count &gt; 1</td>
              </tr>
              <tr>
                <td style={tdStyle}>Decrement (trash)</td>
                <td style={tdStyle}>"Remove item"</td>
                <td style={tdStyle}>When <code style={codeInline}>showTrashOnRemove</code> is true and count = 1</td>
              </tr>
              <tr>
                <td style={tdStyle}>Increment (+)</td>
                <td style={tdStyle}>"Increase quantity"</td>
                <td style={tdStyle}>Always, unless disabled or at max</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Keyboard interaction</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Key</th>
                <th style={thStyle}>Collapsed</th>
                <th style={thStyle}>Expanded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}><code style={codeInline}>Enter</code> / <code style={codeInline}>Space</code></td>
                <td style={tdStyle}>Activates the add action or expands the stepper</td>
                <td style={tdStyle}>Activates the focused button (−  or +)</td>
              </tr>
              <tr>
                <td style={tdStyle}><code style={codeInline}>Tab</code></td>
                <td style={tdStyle}>Moves focus to the next element</td>
                <td style={tdStyle}>Cycles through − → count → + → next element</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Reduced motion</h3>
        <p style={bodyStyle}>
          When the user has <code style={codeInline}>prefers-reduced-motion: reduce</code> enabled,
          all CSS transitions and animations are disabled. The stepper still changes state (collapsed/expanded)
          but the morphing animation is removed entirely. This respects users who experience motion sickness
          or vestibular disorders.
        </p>
        <pre style={codeBlockStyle}>{`@media (prefers-reduced-motion: reduce) {
  .pill, .slotSide, .slotCenter, .labelText, .iconBtn {
    transition: none !important;
  }
}`}</pre>
      </div>

      {/* ── Animation Guidelines ── */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Animation</h2>
        <p style={bodyStyle}>
          The stepper morphs between a circle (collapsed) and a pill (expanded) using CSS transitions
          on max-width, opacity, and padding. The easing curves are intentionally asymmetric to feel natural.
        </p>

        <h3 style={h3Style}>Timing and sequencing</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Phase</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Easing</th>
                <th style={thStyle}>What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Expand</td>
                <td style={tdStyle}>350ms</td>
                <td style={tdStyle}><code style={codeInline}>cubic-bezier(0.22, 1, 0.36, 1)</code></td>
                <td style={tdStyle}>Sides slide out, then label fades in after 180ms delay</td>
              </tr>
              <tr>
                <td style={tdStyle}>Collapse</td>
                <td style={tdStyle}>280ms</td>
                <td style={tdStyle}><code style={codeInline}>cubic-bezier(0.4, 0, 0.6, 1)</code></td>
                <td style={tdStyle}>Label fades out first (100ms), then sides collapse with 120ms delay</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Collapse sequence</h3>
        <p style={bodyStyle}>
          The collapse animation is carefully sequenced so the count number never shifts position:
        </p>
        <ol style={{ ...listStyle, listStyleType: 'decimal' }}>
          <li style={listItemStyle}>Label text fades out immediately (0–100ms)</li>
          <li style={listItemStyle}>Label width collapses along with its internal padding (40ms–240ms)</li>
          <li style={listItemStyle}>Side button slots collapse (120ms–400ms)</li>
          <li style={listItemStyle}>Center padding shrinks to final state (120ms–400ms)</li>
        </ol>
        <p style={bodyStyle}>
          The spacing between the count and label is handled via <code style={codeInline}>padding-left</code> on the
          label element itself (not a flex gap), so when the label collapses to zero width, the spacing
          collapses with it — keeping the count number perfectly centered throughout.
        </p>

        <h3 style={h3Style}>Auto-collapse (all modes)</h3>
        <p style={bodyStyle}>
          After 5 seconds of inactivity, the expanded stepper automatically collapses to a circle showing
          only the count. Clicking the circle re-expands it. Each increment or decrement resets the 5-second timer.
          When count reaches 0, the stepper collapses back to the initial "Add" button state immediately.
        </p>
        <p style={bodyStyle}>
          In icon-only mode (<code style={codeInline}>showAddLabel=false</code>), the stepper also collapses
          on mouse leave (500ms delay) and on blur (300ms delay) for quicker interaction in dense layouts.
          Hovering or focusing cancels those timers.
        </p>
      </div>

      {/* ── Usage Guidelines ── */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Usage Guidelines</h2>

        <h3 style={h3Style}>When to use each variant</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Context</th>
                <th style={thStyle}>Variant</th>
                <th style={thStyle}>Size</th>
                <th style={thStyle}>Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Product tile grid</td>
                <td style={tdStyle}>secondary</td>
                <td style={tdStyle}>medium</td>
                <td style={tdStyle}>Default configuration</td>
              </tr>
              <tr>
                <td style={tdStyle}>Compact product grid</td>
                <td style={tdStyle}>secondary</td>
                <td style={tdStyle}>small</td>
                <td style={tdStyle}><code style={codeInline}>showAddLabel=false</code></td>
              </tr>
              <tr>
                <td style={tdStyle}>Product detail page</td>
                <td style={tdStyle}>primary</td>
                <td style={tdStyle}>large</td>
                <td style={tdStyle}><code style={codeInline}>cartLabel="Add to cart"</code></td>
              </tr>
              <tr>
                <td style={tdStyle}>Cart / bag line item</td>
                <td style={tdStyle}>tertiary</td>
                <td style={tdStyle}>medium</td>
                <td style={tdStyle}><code style={codeInline}>showTrashOnRemove</code></td>
              </tr>
              <tr>
                <td style={tdStyle}>Compact overlay / popover</td>
                <td style={tdStyle}>secondary</td>
                <td style={tdStyle}>small</td>
                <td style={tdStyle}><code style={codeInline}>showAddLabel=false</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={h3Style}>Do's and Don'ts</h3>
        <ul style={{ ...listStyle, listStyleType: 'none', paddingLeft: 0 }}>
          <DoItem>
            Use <code style={codeInline}>showTrashOnRemove</code> in cart and bag contexts — it clearly signals
            a destructive action at quantity 1.
          </DoItem>
          <DoItem>
            Always pair <code style={codeInline}>maxQuantity</code> with any business rule that limits per-item purchase quantity.
          </DoItem>
          <DoItem>
            Use <code style={codeInline}>size="small"</code> in dense list views to preserve vertical rhythm.
          </DoItem>
          <DoItem>
            Match the variant to the surface: primary on color backgrounds, secondary on white, tertiary on grey.
          </DoItem>
          <DoItem>
            Wire up <code style={codeInline}>onChange</code> in controlled contexts to keep your cart/state store in sync.
          </DoItem>
          <DontItem>
            Use the stepper for non-quantity inputs (ratings, pagination). Use dedicated components for those.
          </DontItem>
          <DontItem>
            Use <code style={codeInline}>showAddLabel=false</code> (icon-only) where users may not recognize the + circle as an add action.
          </DontItem>
          <DontItem>
            Set <code style={codeInline}>maxQuantity</code> lower than <code style={codeInline}>defaultCount</code> — this renders the component in a permanently disabled-increment state from load.
          </DontItem>
          <DontItem>
            Place multiple steppers so close together that the auto-expand hover areas overlap.
          </DontItem>
        </ul>
      </div>

      {/* ── Props Reference ── */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Props Reference</h2>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Prop</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Default</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>variant</td>
                <td style={tdStyle}>'primary' | 'secondary' | 'tertiary'</td>
                <td style={tdStyle}>'secondary'</td>
                <td style={tdStyle}>Visual style. Match the surrounding surface.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>size</td>
                <td style={tdStyle}>'small' | 'medium' | 'large'</td>
                <td style={tdStyle}>'medium'</td>
                <td style={tdStyle}>Component size. Small = 32px, Medium = 40px, Large = 52px.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>defaultCount</td>
                <td style={tdStyle}>number</td>
                <td style={tdStyle}>0</td>
                <td style={tdStyle}>Starting quantity. 0 renders the Add button state.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>maxQuantity</td>
                <td style={tdStyle}>number</td>
                <td style={tdStyle}>undefined</td>
                <td style={tdStyle}>Cap on count. When reached, + is disabled and "Max N" label shown.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>addLabel</td>
                <td style={tdStyle}>string</td>
                <td style={tdStyle}>'Add'</td>
                <td style={tdStyle}>Text in the "+ Add" collapsed state.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>showAddLabel</td>
                <td style={tdStyle}>boolean</td>
                <td style={tdStyle}>true</td>
                <td style={tdStyle}>When false, hides text and shows only + icon (icon-only mode).</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>cartLabel</td>
                <td style={tdStyle}>string</td>
                <td style={tdStyle}>undefined</td>
                <td style={tdStyle}>Replaces "+ Add" with a text-only CTA (e.g. "Add to cart").</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>countLabel</td>
                <td style={tdStyle}>string</td>
                <td style={tdStyle}>'added'</td>
                <td style={tdStyle}>Text after count in expanded state (e.g. "3 added").</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>showTrashOnRemove</td>
                <td style={tdStyle}>boolean</td>
                <td style={tdStyle}>false</td>
                <td style={tdStyle}>Replaces − with trash icon at count = 1. Use in cart contexts.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>disabled</td>
                <td style={tdStyle}>boolean</td>
                <td style={tdStyle}>false</td>
                <td style={tdStyle}>Disables entire component.</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontFamily: 'var(--ld-semantic-font-family-mono, monospace)' }}>onChange</td>
                <td style={tdStyle}>(count: number) =&gt; void</td>
                <td style={tdStyle}>undefined</td>
                <td style={tdStyle}>Fires whenever the quantity changes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Code Examples ── */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Code Examples</h2>

        <h3 style={h3Style}>Standard product tile</h3>
        <pre style={codeBlockStyle}>{`<QuantityStepper
  variant="secondary"
  size="medium"
  onChange={(count) => updateCart(itemId, count)}
/>`}</pre>

        <h3 style={h3Style}>Cart line item with trash on remove</h3>
        <pre style={codeBlockStyle}>{`<QuantityStepper
  variant="tertiary"
  size="medium"
  defaultCount={lineItem.quantity}
  showTrashOnRemove
  onChange={(count) =>
    count === 0 ? removeItem(itemId) : updateCart(itemId, count)
  }
/>`}</pre>

        <h3 style={h3Style}>Product detail with cart label and max</h3>
        <pre style={codeBlockStyle}>{`<QuantityStepper
  variant="primary"
  size="large"
  cartLabel="Add to cart"
  maxQuantity={12}
  onChange={(count) => setSelectedQty(count)}
/>`}</pre>

        <h3 style={h3Style}>Dense grid — icon-only collapsed</h3>
        <pre style={codeBlockStyle}>{`<QuantityStepper
  variant="secondary"
  size="small"
  showAddLabel={false}
  onChange={(count) => updateCart(itemId, count)}
/>`}</pre>
      </div>
    </div>
  );
}
