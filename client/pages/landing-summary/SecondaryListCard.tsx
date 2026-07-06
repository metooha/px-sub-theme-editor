import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { IconButton } from '@/components/ui/IconButton';
import { List, ListItem } from '@/components/ui/List';
import { MoreHorizontal } from '@/components/icons';
import { TrailingBadge } from './TrailingBadge';
import cardStyles from './cards.module.css';

export function SecondaryListCard() {
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
        <List className={cardStyles.listSpaced}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ListItem
              key={i}
              title={t('shared.listItemText')}
              showTitle={false}
              text={t('shared.listItemText')}
              trailing="custom"
              trailingContent={<TrailingBadge label={t('shared.trailing')} />}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
