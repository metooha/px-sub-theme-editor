import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { Button } from '@/components/ui/Button';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

const ChevronDown = Icons.ChevronDown;
const ChevronUp = Icons.ChevronUp;
const ArrowUp = Icons.ArrowUp;

// Extract all CSS custom properties from the document
function extractTokens(prefix: string): Array<{ name: string; value: string; computed: string }> {
  const tokens: Array<{ name: string; value: string; computed: string }> = [];
  const styles = getComputedStyle(document.documentElement);
  
  // Get all CSS custom properties
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const sheet = document.styleSheets[i];
      if (!sheet.cssRules) continue;
      
      for (let j = 0; j < sheet.cssRules.length; j++) {
        const rule = sheet.cssRules[j];
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          const styleDeclaration = rule.style;
          for (let k = 0; k < styleDeclaration.length; k++) {
            const propName = styleDeclaration[k];
            if (propName.startsWith(prefix)) {
              const value = styleDeclaration.getPropertyValue(propName).trim();
              const computed = styles.getPropertyValue(propName).trim();
              tokens.push({ name: propName, value, computed });
            }
          }
        }
      }
    } catch (e) {
      // Skip inaccessible stylesheets (CORS)
      continue;
    }
  }
  
  // Remove duplicates and sort
  const unique = Array.from(new Map(tokens.map(t => [t.name, t])).values());
  return unique.sort((a, b) => a.name.localeCompare(b.name));
}

export default function ThemesPage() {
  const { t } = useTranslation();
  const { currentTheme, currentThemeData } = useTheme();
  const [colorTokens, setColorTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [spaceTokens, setSpaceTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [textTokens, setTextTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [otherTokens, setOtherTokens] = React.useState<Array<{ name: string; value: string; computed: string }>>([]);
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [currentFontFamily, setCurrentFontFamily] = React.useState<string>('');
  const [primaryFontName, setPrimaryFontName] = React.useState<string>('');

  const [colorExpanded, setColorExpanded] = React.useState(true);
  const [spaceExpanded, setSpaceExpanded] = React.useState(false);
  const [textExpanded, setTextExpanded] = React.useState(false);
  const [otherExpanded, setOtherExpanded] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Function to extract and update all tokens (optimized with caching)
  const updateAllTokens = React.useCallback(() => {
    // Use requestAnimationFrame to avoid blocking the UI
    requestAnimationFrame(() => {
      // Extract color tokens
      const colors = extractTokens('--ld-semantic-color');
      const wcpColors = extractTokens('--wcp-semantic-color');
      const allColors = [...colors, ...wcpColors];

      // Extract space tokens
      const spaces = extractTokens('--ld-semantic-spacing');
      const primitiveSpaces = extractTokens('--ld-primitive-scale-space');
      const allSpaces = [...spaces, ...primitiveSpaces];

      // Extract text/typography tokens
      const textFonts = extractTokens('--ld-semantic-font');
      const textPrimitive = extractTokens('--ld-primitive-font');
      const allText = [...textFonts, ...textPrimitive];

      // Extract other tokens (borders, elevation, duration, etc)
      const borders = extractTokens('--ld-semantic-border');
      const elevation = extractTokens('--ld-semantic-elevation');
      const duration = extractTokens('--ld-semantic-duration');
      const opacity = extractTokens('--ld-semantic-opacity');
      const zIndex = extractTokens('--ld-semantic-z-index');
      const allOther = [...borders, ...elevation, ...duration, ...opacity, ...zIndex];

      // Batch state updates
      React.startTransition(() => {
        setColorTokens(allColors);
        setSpaceTokens(allSpaces);
        setTextTokens(allText);
        setOtherTokens(allOther);
      });

      // Get ACTUAL computed font family (lightweight operation)
      const styles = getComputedStyle(document.documentElement);
      const cssVarValue = styles.getPropertyValue('--ld-semantic-font-family-sans').trim();

      // Use the CSS variable value directly (faster)
      setCurrentFontFamily(cssVarValue);

      // Extract primary font name (first in the stack)
      const primaryFont = cssVarValue.split(',')[0].trim().replace(/['"]/g, '');
      setPrimaryFontName(primaryFont);
    });
  }, []);

  // Re-extract tokens whenever theme changes (debounced)
  React.useEffect(() => {
    console.log('🎨 Current theme:', currentTheme, currentThemeData?.name);
    // Debounce with longer delay to ensure CSS is fully loaded
    const timer = setTimeout(() => {
      updateAllTokens();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentTheme, updateAllTokens]);

  React.useEffect(() => {
    // Extract tokens on mount
    updateAllTokens();

    // Only watch for link changes (theme CSS loading) - more efficient
    const linkObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Check if any added/removed nodes are theme-related link tags
          const hasThemeChange = Array.from(mutation.addedNodes).some(
            node => node.nodeName === 'LINK' && (node as HTMLLinkElement).getAttribute('data-theme-override')
          ) || Array.from(mutation.removedNodes).some(
            node => node.nodeName === 'LINK' && (node as HTMLLinkElement).getAttribute('data-theme-override')
          );

          if (hasThemeChange) {
            console.log('🎨 Theme CSS link changed');
            // Debounce update
            setTimeout(() => updateAllTokens(), 500);
            break;
          }
        }
      }
    });

    linkObserver.observe(document.head, {
      childList: true,
      subtree: false
    });

    return () => {
      linkObserver.disconnect();
    };
  }, [updateAllTokens]);

  // Handle scroll for back-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToken = (tokenName: string) => {
    navigator.clipboard.writeText(`var(${tokenName})`);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" style={{
      padding: '48px',
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Header */}
      <PageHeader section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.themesTitle')} description={t('componentLibrary.themesDesc')} />

      {/* Quick Navigation */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '20px 24px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {t('componentLibrary.quickNavigate')}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px'
        }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('theme-selector')}
          >
            {t('componentLibrary.themeSelector')}
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('color-tokens')}
          >
            {t('componentLibrary.colorTokens')} ({colorTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('space-tokens')}
          >
            {t('componentLibrary.spaceTokens')} ({spaceTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('text-tokens')}
          >
            {t('componentLibrary.textTokens')} ({textTokens.length})
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => scrollToSection('other-tokens')}
          >
            {t('componentLibrary.otherTokens')} ({otherTokens.length})
          </Button>
        </div>
      </div>

      {/* Theme Selector - Full Width Card */}
      <div id="theme-selector" style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '48px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Theme Switcher */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              {t('componentLibrary.selectTheme')}
            </h2>
            <ThemeSwitcher />
          </div>

          {/* Theme Info */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '16px'
            }}>
              {t('componentLibrary.currentThemeDetails')}
            </h2>
            
            {/* Current Theme Display */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              borderRadius: '6px',
              border: '2px solid var(--ld-semantic-color-border-brand)',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-subtlest)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t('componentLibrary.currentTheme')}
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-brand)',
                marginBottom: '4px'
              }}>
                {currentThemeData?.name || 'Loading...'}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'var(--ld-semantic-color-text-subtle)',
              }}>
                {currentThemeData?.description}
              </div>
            </div>

            {/* Font Family Display */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '6px',
              boxShadow: 'var(--ld-semantic-elevation-100)',
              marginBottom: '16px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-subtlest)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t('componentLibrary.activeFontFamily')}
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '8px'
              }}>
                {primaryFontName || 'Loading...'}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '8px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)'
              }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--ld-semantic-font-family-mono)',
                color: 'var(--ld-semantic-color-text-subtle)',
                padding: '8px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '4px',
                wordBreak: 'break-all'
              }}>
                {currentFontFamily}
              </div>
            </div>

            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-subtle)',
              marginBottom: '16px'
            }}>
              {t('componentLibrary.themesExplanation')}
            </p>
            
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-info)'
            }}>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.5',
                color: 'var(--ld-semantic-color-text)',
                margin: 0,
                fontFamily: 'var(--ld-semantic-font-family-mono)',
              }}>
                ✅ Always use semantic tokens: <code>var(--ld-semantic-color-action-fill-primary)</code><br/>
                ❌ Never use hard-coded values: <code style={{ color: 'var(--ld-semantic-color-text-negative)' }}>#0071DC</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Tokens Section */}
      <div id="color-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setColorExpanded(!colorExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: colorExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              {t('componentLibrary.colorTokens')}
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {colorTokens.length} tokens
            </span>
          </div>
          {colorExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {colorExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader width="120px">Color</DataTableHeader>
                  <DataTableHeader>Token Name</DataTableHeader>
                  <DataTableHeader width="280px">Computed Value</DataTableHeader>
                  <DataTableHeader alignment="right" width="120px">Action</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {colorTokens.map((token) => (
                  <DataTableRow key={token.name}>
                    <DataTableCell>
                      <div style={{
                        width: '80px',
                        height: '40px',
                        backgroundColor: token.computed || `var(${token.name})`,
                        borderRadius: '4px',
                        border: '1px solid var(--ld-semantic-color-border-subtle)',
                      }} />
                    </DataTableCell>
                    <DataTableCell UNSAFE_className="font-mono text-xs">
                      {token.name}
                    </DataTableCell>
                    <DataTableCell UNSAFE_className="font-mono text-xs text-muted-foreground">
                      {token.computed || token.value}
                    </DataTableCell>
                    <DataTableCell variant="numeric">
                      <Button
                        variant={copiedToken === token.name ? "primary" : "secondary"}
                        size="small"
                        onClick={() => copyToken(token.name)}
                      >
                        {copiedToken === token.name ? `✓ ${t('componentLibrary.copied')}` : t('componentLibrary.copy')}
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </DataTableBody>
            </DataTable>
          </div>
        )}
      </div>

      {/* Space Tokens Section */}
      <div id="space-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setSpaceExpanded(!spaceExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: spaceExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              {t('componentLibrary.spaceTokens')}
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {spaceTokens.length} tokens
            </span>
          </div>
          {spaceExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {spaceExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader width="150px">Size</DataTableHeader>
                  <DataTableHeader>Token Name</DataTableHeader>
                  <DataTableHeader width="180px">Value</DataTableHeader>
                  <DataTableHeader width="120px">Pixels</DataTableHeader>
                  <DataTableHeader alignment="right" width="120px">Action</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {spaceTokens.map((token) => {
                  const remValue = token.computed || token.value;
                  const pixels = remValue.includes('rem')
                    ? `${parseFloat(remValue) * 16}px`
                    : remValue;

                  return (
                    <DataTableRow key={token.name}>
                      <DataTableCell>
                        <div style={{
                          width: token.computed || token.value,
                          height: '24px',
                          backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
                          borderRadius: '2px',
                          minWidth: '4px'
                        }} />
                      </DataTableCell>
                      <DataTableCell UNSAFE_className="font-mono text-xs">
                        {token.name}
                      </DataTableCell>
                      <DataTableCell UNSAFE_className="font-mono text-xs text-muted-foreground">
                        {remValue}
                      </DataTableCell>
                      <DataTableCell UNSAFE_className="font-mono text-xs text-muted-foreground font-semibold">
                        {pixels}
                      </DataTableCell>
                      <DataTableCell variant="numeric">
                        <Button
                          variant={copiedToken === token.name ? "primary" : "secondary"}
                          size="small"
                          onClick={() => copyToken(token.name)}
                        >
                          {copiedToken === token.name ? '✓' : t('componentLibrary.copy')}
                        </Button>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </DataTableBody>
            </DataTable>
          </div>
        )}
      </div>

      {/* Text/Typography Tokens Section */}
      <div id="text-tokens" style={{ marginBottom: '48px' }}>
        <button
          onClick={() => setTextExpanded(!textExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: textExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              {t('componentLibrary.textTokens')}
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {textTokens.length} tokens (font families, sizes, weights, line heights)
            </span>
          </div>
          {textExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {textExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader width="180px">Preview</DataTableHeader>
                  <DataTableHeader>Token Name</DataTableHeader>
                  <DataTableHeader width="300px">Value</DataTableHeader>
                  <DataTableHeader alignment="right" width="120px">Action</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {textTokens.map((token) => {
                  const isFontFamily = token.name.includes('family');
                  const isFontSize = token.name.includes('size');
                  const isFontWeight = token.name.includes('weight');
                  const isLineHeight = token.name.includes('line-height') || token.name.includes('lineheight');

                  return (
                    <DataTableRow key={token.name}>
                      <DataTableCell>
                        {isFontFamily && (
                          <div style={{
                            fontSize: '14px',
                            fontFamily: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Abc 123
                          </div>
                        )}
                        {isFontSize && (
                          <div style={{
                            fontSize: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Aa
                          </div>
                        )}
                        {isFontWeight && (
                          <div style={{
                            fontSize: '14px',
                            fontWeight: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                          }}>
                            Weight
                          </div>
                        )}
                        {isLineHeight && (
                          <div style={{
                            fontSize: '12px',
                            lineHeight: `var(${token.name})`,
                            color: 'var(--ld-semantic-color-text)',
                            border: '1px dashed var(--ld-semantic-color-border-subtle)',
                            padding: '4px',
                            display: 'inline-block'
                          }}>
                            Line<br/>Height
                          </div>
                        )}
                      </DataTableCell>
                      <DataTableCell UNSAFE_className="font-mono text-xs">
                        {token.name}
                      </DataTableCell>
                      <DataTableCell UNSAFE_className="font-mono text-xs text-muted-foreground">
                        <div style={{ wordBreak: 'break-all' }}>
                          {token.computed || token.value}
                        </div>
                      </DataTableCell>
                      <DataTableCell variant="numeric">
                        <Button
                          variant={copiedToken === token.name ? "primary" : "secondary"}
                          size="small"
                          onClick={() => copyToken(token.name)}
                        >
                          {copiedToken === token.name ? '✓' : t('componentLibrary.copy')}
                        </Button>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </DataTableBody>
            </DataTable>
          </div>
        )}
      </div>

      {/* Other Tokens Section */}
      <div id="other-tokens">
        <button
          onClick={() => setOtherExpanded(!otherExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            cursor: 'pointer',
            marginBottom: otherExpanded ? '16px' : '0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-200)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--ld-semantic-elevation-100)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              margin: 0
            }}>
              {t('componentLibrary.otherTokens')}
            </h2>
            <span style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtlest)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {otherTokens.length} tokens (borders, elevation, duration, opacity, z-index)
            </span>
          </div>
          {otherExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {otherExpanded && (
          <div style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            overflow: 'hidden',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <DataTable>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader>Token Name</DataTableHeader>
                  <DataTableHeader width="350px">Value</DataTableHeader>
                  <DataTableHeader alignment="right" width="120px">Action</DataTableHeader>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {otherTokens.map((token) => (
                  <DataTableRow key={token.name}>
                    <DataTableCell UNSAFE_className="font-mono text-xs">
                      {token.name}
                    </DataTableCell>
                    <DataTableCell UNSAFE_className="font-mono text-xs text-muted-foreground">
                      <div style={{ wordBreak: 'break-all' }}>
                        {token.computed || token.value}
                      </div>
                    </DataTableCell>
                    <DataTableCell variant="numeric">
                      <Button
                        variant={copiedToken === token.name ? "primary" : "secondary"}
                        size="small"
                        onClick={() => copyToken(token.name)}
                      >
                        {copiedToken === token.name ? '✓' : t('componentLibrary.copy')}
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </DataTableBody>
            </DataTable>
          </div>
        )}
      </div>

      {/* Usage Note */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--ld-semantic-color-border-brand)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '12px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          {t('componentLibrary.howToUseTokens')}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>In CSS:</strong><br />
            <code style={{
              display: 'block',
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '4px',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '12px',
            }}>
              color: var(--ld-semantic-color-text);
            </code>
          </div>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>In inline styles:</strong><br />
            <code style={{
              display: 'block',
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: 'var(--ld-semantic-color-surface)',
              borderRadius: '4px',
              fontFamily: 'var(--ld-semantic-font-family-mono)',
              fontSize: '12px',
            }}>
              style=&#123;&#123; color: 'var(--ld-semantic-color-text)' &#125;&#125;
            </code>
          </div>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Why tokens matter:</strong><br />
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Enables theme switching</li>
              <li>Ensures brand consistency</li>
              <li>Centralizes design updates</li>
              <li>Maintains accessibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--ld-semantic-color-action-fill-primary)',
            color: 'var(--ld-semantic-color-action-text-on-fill-primary)',
            border: 'none',
            boxShadow: 'var(--ld-semantic-elevation-300)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary-hovered)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={t('componentLibrary.backToTop')}
        >
          <ArrowUp style={{ width: 24, height: 24 }} />
        </button>
      )}
    </div>
  );
}
