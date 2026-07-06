import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
} from '@/components/ui/ContextMenu';

export default function ContextMenuExample() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [position, setPosition] = React.useState('bottom');

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
          Context Menu
        </h3>
        <p style={{ color: 'var(--ld-semantic-color-text-secondary)', marginBottom: '16px' }}>
          Right-click on the box below to see the context menu
        </p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              maxWidth: '600px',
              border: '2px dashed var(--ld-semantic-color-border-moderate)',
              borderRadius: '8px',
              backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)',
              cursor: 'context-menu'
            }}>
              <p style={{ color: 'var(--ld-semantic-color-text-secondary)' }}>
                Right click here
              </p>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem disabled>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={showBookmarks}
              onCheckedChange={setShowBookmarks}
            >
              Show Bookmarks
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuLabel>Position</ContextMenuLabel>
            <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
              <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
              <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
              <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </section>
    </div>
  );
}
