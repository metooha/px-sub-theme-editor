import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';

export default function NavigationMenuExample() {
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
          Horizontal Navigation
        </h3>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul style={{ display: 'grid', gap: '12px', padding: '16px', width: '400px' }}>
                  <li>
                    <NavigationMenuLink href="/docs/intro">
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Introduction</div>
                      <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                        Get started with our documentation
                      </div>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/installation">
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Installation</div>
                      <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                        How to install dependencies and structure your app
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul style={{ display: 'grid', gap: '12px', padding: '16px', width: '400px' }}>
                  <li>
                    <NavigationMenuLink href="/docs/buttons">
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Buttons</div>
                      <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                        Button components with multiple variants
                      </div>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/forms">
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Forms</div>
                      <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary)' }}>
                        Form components and validation
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </div>
  );
}
