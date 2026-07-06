import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import * as Icons from '@/components/icons';

/**
 * Menu examples — backed by the DropdownMenu component (LD 3.5 canonical).
 * The legacy Menu/MenuItem components have been consolidated into DropdownMenu.
 */
export const MenuExample: React.FC = () => {
  const [position, setPosition] = React.useState('bottom');
  const [showPanel, setShowPanel] = React.useState(true);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* Basic menu with icons */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Basic Menu with Icons
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          Standard menu with leading icon items. Uses <code>DropdownMenu</code> + <code>DropdownMenuTrigger</code> + <code>DropdownMenuContent</code> + <code>DropdownMenuItem</code>.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Icons.Edit style={{ width: 16, height: 16 }} /> Edit</DropdownMenuItem>
            <DropdownMenuItem><Icons.Plus style={{ width: 16, height: 16 }} /> Duplicate</DropdownMenuItem>
            <DropdownMenuItem><Icons.Trash style={{ width: 16, height: 16 }} /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Icon button trigger (3-dot pattern) */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Icon Button Trigger (Row Actions)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          Common pattern for data table row actions — a ghost IconButton triggers a right-aligned menu.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton variant="ghost" aria-label="Row actions">
              <Icons.MoreHorizontal />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Icons.Eye style={{ width: 16, height: 16 }} /> View</DropdownMenuItem>
            <DropdownMenuItem><Icons.Edit style={{ width: 16, height: 16 }} /> Edit</DropdownMenuItem>
            <DropdownMenuItem><Icons.Plus style={{ width: 16, height: 16 }} /> Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Icons.Trash style={{ width: 16, height: 16 }} /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Checkbox items */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Menu with Checkbox Items
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          Toggle multiple independent options. Uses <code>DropdownMenuCheckboxItem</code>.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">View Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Show side panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Radio group */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Menu with Radio Group
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          Select one option from a group. Uses <code>DropdownMenuRadioGroup</code> + <code>DropdownMenuRadioItem</code>.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Panel Position: {position}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* 2–7 action variants */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Action Count Variants (2–7)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
          LD 3.5 specifies menus should contain 2–7 items. Examples below.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="secondary">2 Actions</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="secondary">3 Actions</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="secondary">5 Actions</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Props reference */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text)' }}>
          Component API
        </h2>
        <div style={{ backgroundColor: 'var(--ld-semantic-color-surface)', borderRadius: 'var(--ld-primitive-scale-border-radius-100)', padding: '24px', border: '1px solid var(--ld-semantic-color-separator)' }}>
          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            {[
              ['DropdownMenu', 'Root context. Accepts open / defaultOpen / onOpenChange for controlled usage.'],
              ['DropdownMenuTrigger', 'Toggles the menu. Pass asChild to wrap any element (Button, IconButton, etc.).'],
              ['DropdownMenuContent', 'Portalled menu panel. Supports side, align, sideOffset props.'],
              ['DropdownMenuItem', 'A single action row. Accepts onClick.'],
              ['DropdownMenuCheckboxItem', 'Toggleable item with checked / onCheckedChange.'],
              ['DropdownMenuRadioGroup + RadioItem', 'Mutually-exclusive selection within the menu.'],
              ['DropdownMenuLabel', 'Non-interactive section heading.'],
              ['DropdownMenuSeparator', 'Horizontal divider between item groups.'],
            ].map(([comp, desc]) => (
              <div key={comp} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-separator)' }}>
                <code style={{ fontWeight: 600 }}>{comp}</code>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
