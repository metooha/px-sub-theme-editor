import React from 'react';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';

export default function LabelExample() {
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
          Label with TextField
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <TextField label="Your Name" placeholder="Enter your name" />
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
          Label with Checkbox (Native Label)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            style={{
              cursor: 'pointer',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text)',
            }}
          >
            Accept terms and conditions
          </label>
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
          Required Field
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <TextField
            label={<>Email <span style={{ color: 'var(--ld-semantic-color-action-fill-destructive)' }}>*</span></>}
            type="email"
            placeholder="you@example.com"
            inputProps={{ required: true }}
          />
        </div>
      </section>
    </div>
  );
}
