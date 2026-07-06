import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { MastHead } from '@/components/ui/MastHead';
import { ChevronDown, ChevronLeft, ChevronRight } from '@/components/icons';

// Navigation item definition (nameKey references componentLibrary.* translation keys)
interface NavItem {
  id: string;
  nameKey: string;
  path: string;
}

interface NavSection {
  titleKey: string;
  defaultCollapsed?: boolean;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    titleKey: 'componentLibrary.gettingStarted',
    defaultCollapsed: false,
    items: [
      { id: 'overview',         nameKey: 'componentLibrary.overview',          path: '/component-library' },
      { id: 'getting-started',  nameKey: 'componentLibrary.gettingStartedNav',  path: '/component-library/getting-started' },
      { id: 'guidelines',       nameKey: 'componentLibrary.guidelines',         path: '/component-library/guidelines' },
      { id: 'themes',           nameKey: 'componentLibrary.themesTokens',       path: '/component-library/themes' },
      { id: 'theme-editor',     nameKey: 'componentLibrary.themeEditor',        path: '/component-library/theme-editor' },
      { id: 'color-browser',    nameKey: 'componentLibrary.colorBrowser',       path: '/component-library/color-browser' },
      { id: 'component-tester', nameKey: 'componentLibrary.componentSandbox',   path: '/component-library/component-tester' },
    ]
  },
  {
    titleKey: 'componentLibrary.components',
    defaultCollapsed: true,
    items: [
      { id: 'icons',                nameKey: 'componentLibrary.navIcons',               path: '/component-library/icons' },
      { id: 'accordion',            nameKey: 'componentLibrary.navAccordion',            path: '/component-library/accordion' },
      { id: 'alerts',               nameKey: 'componentLibrary.navAlerts',               path: '/component-library/alerts' },
      { id: 'badges',               nameKey: 'componentLibrary.navBadges',               path: '/component-library/badges' },
      { id: 'bottom-sheet',         nameKey: 'componentLibrary.navBottomSheet',          path: '/component-library/bottom-sheet' },
      { id: 'breadcrumbs',          nameKey: 'componentLibrary.navBreadcrumbs',          path: '/component-library/breadcrumbs' },
      { id: 'buttons',              nameKey: 'componentLibrary.navButtons',              path: '/component-library/buttons' },
      { id: 'callouts',             nameKey: 'componentLibrary.navCallouts',             path: '/component-library/callouts' },
      { id: 'cards',                nameKey: 'componentLibrary.navCards',                path: '/component-library/cards' },
      { id: 'checkboxes',           nameKey: 'componentLibrary.navCheckboxes',           path: '/component-library/checkboxes' },
      { id: 'chips',                nameKey: 'componentLibrary.navChips',                path: '/component-library/chips' },
      { id: 'content-messages',     nameKey: 'componentLibrary.navContentMessages',      path: '/component-library/content-messages' },
      { id: 'data-table',           nameKey: 'componentLibrary.navDataTable',            path: '/component-library/table' },
      { id: 'date-fields',          nameKey: 'componentLibrary.navDateFields',           path: '/component-library/date-fields' },
      { id: 'date-picker-calendar', nameKey: 'componentLibrary.navDatePickerCalendar',   path: '/component-library/calendar' },
      { id: 'date-pickers',         nameKey: 'componentLibrary.navDatePickers',          path: '/component-library/date-pickers' },
      { id: 'date-range-picker',    nameKey: 'componentLibrary.navDateRangePicker',      path: '/component-library/date-range-picker' },
      { id: 'dialog',               nameKey: 'componentLibrary.navDialog',               path: '/component-library/dialog' },
      { id: 'dividers',             nameKey: 'componentLibrary.navDividers',             path: '/component-library/dividers' },
      { id: 'filter-chips',         nameKey: 'componentLibrary.navFilterChips',          path: '/component-library/filter-chips' },
      { id: 'form-groups',          nameKey: 'componentLibrary.navFormGroups',           path: '/component-library/form-groups' },
      { id: 'icon-buttons',         nameKey: 'componentLibrary.navIconButtons',          path: '/component-library/icon-buttons' },
      { id: 'link-buttons',         nameKey: 'componentLibrary.navLinkButtons',          path: '/component-library/link-buttons' },
      { id: 'links',                nameKey: 'componentLibrary.navLinks',                path: '/component-library/links' },
      { id: 'lists',                nameKey: 'componentLibrary.navLists',                path: '/component-library/lists' },
      { id: 'magic-box',            nameKey: 'componentLibrary.navMagicBox',             path: '/component-library/magic-box' },
      { id: 'menu',                 nameKey: 'componentLibrary.navMenu',                 path: '/component-library/menu' },
      { id: 'metrics',              nameKey: 'componentLibrary.navMetrics',              path: '/component-library/metrics' },
      { id: 'modals',               nameKey: 'componentLibrary.navModals',               path: '/component-library/modals' },
      { id: 'nudges',               nameKey: 'componentLibrary.navNudges',               path: '/component-library/nudges' },
      { id: 'panels',               nameKey: 'componentLibrary.navPanels',               path: '/component-library/panels' },
      { id: 'popover',              nameKey: 'componentLibrary.navPopover',              path: '/component-library/popover' },
      { id: 'progress-indicator',   nameKey: 'componentLibrary.navProgressIndicator',    path: '/component-library/progress-indicator' },
      { id: 'progress-tracker',     nameKey: 'componentLibrary.navProgressTracker',      path: '/component-library/progress-tracker' },
      { id: 'radio-buttons',        nameKey: 'componentLibrary.navRadioButtons',         path: '/component-library/radio-buttons' },
      { id: 'select',               nameKey: 'componentLibrary.navSelect',               path: '/component-library/select' },
      { id: 'skeleton',             nameKey: 'componentLibrary.navSkeleton',             path: '/component-library/skeleton' },
      { id: 'snackbars',            nameKey: 'componentLibrary.navSnackbars',            path: '/component-library/snackbars' },
      { id: 'spinners',             nameKey: 'componentLibrary.navSpinners',             path: '/component-library/spinners' },
      { id: 'spot-icons',           nameKey: 'componentLibrary.navSpotIcons',            path: '/component-library/spot-icons' },
      { id: 'segmented-control',    nameKey: 'componentLibrary.navSegmentedControl',     path: '/component-library/segmented-control' },
      { id: 'quantity-stepper',     nameKey: 'componentLibrary.navQuantityStepper',      path: '/component-library/quantity-stepper' },
      { id: 'switches',             nameKey: 'componentLibrary.navSwitches',             path: '/component-library/switches' },
      { id: 'tab-navigation',       nameKey: 'componentLibrary.navTabNavigation',        path: '/component-library/tabs' },
      { id: 'tags',                 nameKey: 'componentLibrary.navTags',                 path: '/component-library/tags' },
      { id: 'textarea',             nameKey: 'componentLibrary.navTextArea',             path: '/component-library/textarea' },
      { id: 'text-fields',          nameKey: 'componentLibrary.navTextFields',           path: '/component-library/text-fields' },
    ]
  },
  {
    titleKey: 'componentLibrary.sharedSection',
    defaultCollapsed: true,
    items: [
      { id: 'alert-dialog',      nameKey: 'componentLibrary.navAlertDialog',      path: '/component-library/alert-dialog' },
      { id: 'avatar',            nameKey: 'componentLibrary.navAvatar',            path: '/component-library/avatar' },
      { id: 'carousel',          nameKey: 'componentLibrary.navCarousel',          path: '/component-library/carousel' },
      { id: 'chart',             nameKey: 'componentLibrary.navChart',             path: '/component-library/chart' },
      { id: 'collapsible',       nameKey: 'componentLibrary.navCollapsible',       path: '/component-library/collapsible' },
      { id: 'command',           nameKey: 'componentLibrary.navCommand',           path: '/component-library/command' },
      { id: 'context-menu',      nameKey: 'componentLibrary.navContextMenu',       path: '/component-library/context-menu' },
      { id: 'dropdown-menu',     nameKey: 'componentLibrary.navDropdownMenu',      path: '/component-library/dropdown-menu' },
      { id: 'form',              nameKey: 'componentLibrary.navForm',              path: '/component-library/form' },
      { id: 'menubar',           nameKey: 'componentLibrary.navMenubar',           path: '/component-library/menubar' },
      { id: 'navigation-menu',   nameKey: 'componentLibrary.navNavigationMenu',    path: '/component-library/navigation-menu' },
      { id: 'pagination',        nameKey: 'componentLibrary.navPagination',        path: '/component-library/pagination' },
      { id: 'scroll-area',       nameKey: 'componentLibrary.navScrollArea',        path: '/component-library/scroll-area' },
      { id: 'slider',            nameKey: 'componentLibrary.navSlider',            path: '/component-library/slider' },
      { id: 'sections',           nameKey: 'componentLibrary.navSections',           path: '/component-library/sections' },
      { id: 'toggle',            nameKey: 'componentLibrary.navToggle',            path: '/component-library/toggle' },
    ]
  },
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Initialize collapsed state from section defaults
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(
      navigationSections.map(s => [s.titleKey, s.defaultCollapsed ?? false])
    )
  );

  const toggleSection = (titleKey: string) => {
    setCollapsedSections(prev => ({ ...prev, [titleKey]: !prev[titleKey] }));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <MastHead />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: sidebarCollapsed ? '0' : '280px',
            minWidth: sidebarCollapsed ? '0' : '280px',
            borderRight: sidebarCollapsed ? 'none' : '1px solid var(--ld-semantic-color-separator)',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'width 240ms ease, min-width 240ms ease, border-color 240ms ease',
          }}
        >
          <div style={{
            padding: 'var(--ld-semantic-spacing-300) var(--ld-semantic-spacing-200)',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: '280px', // fixed so content doesn't reflow during animation
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: 'var(--ld-semantic-spacing-100)',
              color: 'var(--ld-semantic-color-text)',
            }}>
              {t('componentLibrary.title')}
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtle)',
              marginBottom: 'var(--ld-semantic-spacing-300)',
            }}>
              {t('componentLibrary.subtitle')}
            </p>

            {navigationSections.map((section, sectionIndex) => {
              const isCollapsed = collapsedSections[section.titleKey] ?? false;

              return (
                <div
                  key={section.titleKey}
                  style={{ marginBottom: sectionIndex < navigationSections.length - 1 ? 'var(--ld-semantic-spacing-250)' : '0' }}
                >
                  {/* Collapsible section header */}
                  <button
                    onClick={() => toggleSection(section.titleKey)}
                    aria-expanded={!isCollapsed}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      padding: '0',
                      paddingBottom: 'var(--ld-semantic-spacing-50)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginBottom: 'var(--ld-semantic-spacing-50)',
                    }}
                  >
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: 'var(--ld-semantic-color-text-subtle)',
                    }}>
                      {t(section.titleKey)}
                    </span>
                    <ChevronDown
                      style={{
                        width: 14,
                        height: 14,
                        color: 'var(--ld-semantic-color-text-subtle)',
                        transition: 'transform 200ms ease',
                        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {/* Collapsible content */}
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isCollapsed ? '0' : '2000px',
                      transition: 'max-height 250ms ease',
                    }}
                  >
                    <SideNavigation aria-label={`${t(section.titleKey)} Navigation`}>
                      {section.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                          <SideNavigationItem
                            key={item.id}
                            href={item.path}
                            isCurrent={isActive}
                            onClick={(e) => handleNavClick(e, item.path)}
                          >
                            {t(item.nameKey)}
                          </SideNavigationItem>
                        );
                      })}
                    </SideNavigation>
                  </div>
                </div>
              );
            })}

            {/* Back to Home */}
            <div style={{
              marginTop: 'auto',
              paddingTop: 'var(--ld-semantic-spacing-300)',
              borderTop: '1px solid var(--ld-semantic-color-separator)',
            }}>
              <SideNavigation aria-label="Main Navigation">
                <SideNavigationItem
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                >
                  ← {t('componentLibrary.backToHome')}
                </SideNavigationItem>
              </SideNavigation>
            </div>
          </div>
        </aside>

        {/* Sidebar toggle button — floats at the edge */}
        <button
          onClick={() => setSidebarCollapsed(v => !v)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            position: 'absolute',
            bottom: '16px',
            left: sidebarCollapsed ? '0' : '268px',
            zIndex: 10,
            width: '22px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            border: '1px solid var(--ld-semantic-color-separator)',
            borderRadius: sidebarCollapsed ? '0 6px 6px 0' : '0 6px 6px 0',
            cursor: 'pointer',
            transition: 'left 240ms ease',
            boxShadow: '1px 1px 4px rgba(0,0,0,0.08)',
            padding: 0,
            outline: 'none',
            color: 'var(--ld-semantic-color-text-subtle)',
          }}
        >
          {sidebarCollapsed
            ? <ChevronRight style={{ width: 12, height: 12 }} />
            : <ChevronLeft style={{ width: 12, height: 12 }} />}
        </button>

        {/* Main content area */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'var(--ld-semantic-color-surface)',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
