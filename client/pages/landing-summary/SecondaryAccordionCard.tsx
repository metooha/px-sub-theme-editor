import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { IconButton } from '@/components/ui/IconButton';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { MoreHorizontal } from '@/components/icons';

const ACCORDION_IDS = Array.from({ length: 8 }, (_, i) => String(i));

export function SecondaryAccordionCard() {
  const { t } = useTranslation();

  return (
    <Card size="small">
      <CardHeader
        title={t('shared.secondarySection')}
        trailing={
          <IconButton
            aria-label={t('shared.moreOptions')}
            variant="ghost"
            size="small"
          >
            <MoreHorizontal style={{ width: 16, height: 16 }} />
          </IconButton>
        }
      />
      <CardContent>
        <Accordion type="multiple">
          {ACCORDION_IDS.map((id) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger
                style={{
                  fontWeight: 400,
                  fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
                  lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.4286)',
                  padding: 'var(--ld-primitive-scale-space-75, 6px) 0',
                  minHeight: 'var(--ld-primitive-scale-space-400, 32px)',
                }}
              >
                {t('shared.accordionTitle')}
              </AccordionTrigger>
              <AccordionContent>
                Content for accordion item {Number(id) + 1}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
