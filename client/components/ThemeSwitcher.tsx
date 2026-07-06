/**
 * ThemeSwitcher Component
 * Dropdown selector for switching between available themes
 * Uses the LD 3.5 Select component instead of a custom dropdown
 */

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Select, SelectItem } from '@/components/ui/Select';

export function ThemeSwitcher() {
  const { currentTheme, availableThemes, switchTheme, isLoading } = useTheme();

  // Filter out hidden themes (platforms: WCP, AX, PX and their variants)
  const visibleThemes = availableThemes.filter(t => !t.hidden);

  return (
    <div style={{ minWidth: '280px' }}>
      <Select
        label="Theme"
        value={currentTheme}
        onValueChange={(value) => switchTheme(value as Parameters<typeof switchTheme>[0])}
        disabled={isLoading}
        placeholder={isLoading ? 'Loading...' : 'Select Theme'}
      >
        {visibleThemes.map((theme) => (
          <SelectItem key={theme.id} value={theme.id}>
            {theme.name}
          </SelectItem>
        ))}
      </Select>

      {/* Loading indicator */}
      {isLoading && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontStyle: 'italic',
          }}
        >
          Switching theme...
        </div>
      )}
    </div>
  );
}
