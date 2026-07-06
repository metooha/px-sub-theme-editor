import React from 'react';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Shared card shell used across Getting Started pages.
 * White surface, elevation-100 shadow, bold h3 title.
 */
export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      {title && (
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '20px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
