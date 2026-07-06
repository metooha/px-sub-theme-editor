import React from 'react';
import { Slider } from '@/components/ui/Slider';

export default function SliderExample() {
  const [value, setValue] = React.useState([50]);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Single Slider
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
            Value: {value[0]}
          </p>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Range Slider
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <Slider
            defaultValue={[25, 75]}
            max={100}
            step={1}
          />
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Disabled Slider
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            disabled
          />
        </div>
      </section>
    </div>
  );
}
