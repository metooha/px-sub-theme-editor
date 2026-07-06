import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Accordion-wrapped collapsible card with bold header.
 * Shared across GettingStartedDesigner and GettingStartedPM.
 */
export function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
      overflow: 'hidden',
    }}>
      <Accordion type="single" collapsible defaultValue={defaultOpen ? 'section' : ''}>
        <AccordionItem value="section" style={{ borderBottom: 'none' }}>
          <AccordionTrigger style={{ padding: '24px 32px', fontSize: '20px', fontWeight: 700 }}>
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ padding: '0 32px 32px' }}>
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
