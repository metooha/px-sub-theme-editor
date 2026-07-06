import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function ScrollAreaExample() {
  const tags = Array.from({ length: 50 }).map(
    (_, i) => `Tag ${i + 1}`
  );

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
          Vertical Scroll
        </h3>
        <ScrollArea className="h-72 w-48 rounded-md border p-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  border: '1px solid var(--ld-semantic-color-border-moderate)',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
