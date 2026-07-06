import * as React from 'react';
import { SegmentedControl } from '@/components/ui/SegmentedControl';

/**
 * Example showcasing all SegmentedControl variants (2–5 segments)
 * matching the [WCP] Segmented Control Figma spec.
 */
export const SegmentedControlExample: React.FC = () => {
  const [value2, setValue2] = React.useState('a');
  const [value3, setValue3] = React.useState('a');
  const [value4, setValue4] = React.useState('a');
  const [value5, setValue5] = React.useState('a');
  const [valueFullWidth, setValueFullWidth] = React.useState('a');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '640px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Segmented Control
        </h2>
        <p style={{ marginBottom: '24px', fontSize: '14px', color: '#515357' }}>
          A linear set of mutually exclusive segments. Supports 2–5 segments.
        </p>

        {/* 2 segments */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#74767c' }}>2 Segments</p>
          <SegmentedControl
            aria-label="2-segment example"
            value={value2}
            onChange={setValue2}
            items={[
              { value: 'a', label: 'Label' },
              { value: 'b', label: 'Label' },
            ]}
          />
        </div>

        {/* 3 segments */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#74767c' }}>3 Segments</p>
          <SegmentedControl
            aria-label="3-segment example"
            value={value3}
            onChange={setValue3}
            items={[
              { value: 'a', label: 'Label' },
              { value: 'b', label: 'Label' },
              { value: 'c', label: 'Label' },
            ]}
          />
        </div>

        {/* 4 segments */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#74767c' }}>4 Segments</p>
          <SegmentedControl
            aria-label="4-segment example"
            value={value4}
            onChange={setValue4}
            items={[
              { value: 'a', label: 'Label' },
              { value: 'b', label: 'Label' },
              { value: 'c', label: 'Label' },
              { value: 'd', label: 'Label' },
            ]}
          />
        </div>

        {/* 5 segments */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#74767c' }}>5 Segments</p>
          <SegmentedControl
            aria-label="5-segment example"
            value={value5}
            onChange={setValue5}
            items={[
              { value: 'a', label: 'Label' },
              { value: 'b', label: 'Label' },
              { value: 'c', label: 'Label' },
              { value: 'd', label: 'Label' },
              { value: 'e', label: 'Label' },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Full Width
        </h2>
        <SegmentedControl
          aria-label="Full width example"
          value={valueFullWidth}
          onChange={setValueFullWidth}
          isFullWidth
          items={[
            { value: 'a', label: 'Daily' },
            { value: 'b', label: 'Weekly' },
            { value: 'c', label: 'Monthly' },
          ]}
        />
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Disabled
        </h2>
        <SegmentedControl
          aria-label="Disabled example"
          value="a"
          onChange={() => {}}
          disabled
          items={[
            { value: 'a', label: 'Label' },
            { value: 'b', label: 'Label' },
            { value: 'c', label: 'Label' },
          ]}
        />
      </section>
    </div>
  );
};
