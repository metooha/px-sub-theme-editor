import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  BarGraph,
  Box,
  Calendar,
  Chat,
  Check,
  ChevronDown,
  Circle,
  Edit,
  ExclamationCircle,
  Filter,
  InfoCircle,
  Link as LinkIcon,
  List,
  Magic,
  Menu as MenuIcon,
  Minus,
  Note,
  PanelLeft,
  Refresh,
  Search,
  Settings,
  Star,
  Tag,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { getComponentPreview } from './ComponentCardPreviews';
import { PageHeader } from '@/components/ui/PageHeader';
import styles from './Overview.module.css';

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  ArrowRight,
  BarGraph,
  Box,
  Calendar,
  Chat,
  Check,
  ChevronDown,
  Circle,
  Edit,
  ExclamationCircle,
  Filter,
  InfoCircle,
  Link: LinkIcon,
  List,
  Magic,
  Menu: MenuIcon,
  Minus,
  Note,
  PanelLeft,
  Refresh,
  Search,
  Settings,
  Star,
  Tag,
};

interface ComponentEntry {
  titleKey: string;
  descKey: string;
  path: string;
  icon: string;
  section: 'ld' | 'shadcn';
}

const componentSections: ComponentEntry[] = [
  // ── Living Design 3.5 Components ──
  { titleKey: 'componentLibrary.navAccordion', descKey: 'componentLibrary.descAccordion', path: '/component-library/accordion', icon: 'ChevronDown', section: 'ld' },
  { titleKey: 'componentLibrary.navAlerts', descKey: 'componentLibrary.descAlerts', path: '/component-library/alerts', icon: 'ExclamationCircle', section: 'ld' },
  { titleKey: 'componentLibrary.navBadges', descKey: 'componentLibrary.descBadges', path: '/component-library/badges', icon: 'Tag', section: 'ld' },
  { titleKey: 'componentLibrary.navBottomSheet', descKey: 'componentLibrary.descBottomSheet', path: '/component-library/bottom-sheet', icon: 'PanelLeft', section: 'ld' },
  { titleKey: 'componentLibrary.navBreadcrumbs', descKey: 'componentLibrary.descBreadcrumbs', path: '/component-library/breadcrumbs', icon: 'ArrowRight', section: 'ld' },
  { titleKey: 'componentLibrary.navButtons', descKey: 'componentLibrary.descButtons', path: '/component-library/buttons', icon: 'Circle', section: 'ld' },
  { titleKey: 'componentLibrary.navCallouts', descKey: 'componentLibrary.descCallouts', path: '/component-library/callouts', icon: 'InfoCircle', section: 'ld' },
  { titleKey: 'componentLibrary.navCards', descKey: 'componentLibrary.descCards', path: '/component-library/cards', icon: 'Box', section: 'ld' },
  { titleKey: 'componentLibrary.navCheckboxes', descKey: 'componentLibrary.descCheckboxes', path: '/component-library/checkboxes', icon: 'Check', section: 'ld' },
  { titleKey: 'componentLibrary.navChips', descKey: 'componentLibrary.descChips', path: '/component-library/chips', icon: 'Tag', section: 'ld' },
  { titleKey: 'componentLibrary.navContentMessages', descKey: 'componentLibrary.descContentMessages', path: '/component-library/content-messages', icon: 'Chat', section: 'ld' },
  { titleKey: 'componentLibrary.navDataTable', descKey: 'componentLibrary.descTable', path: '/component-library/table', icon: 'List', section: 'ld' },
  { titleKey: 'componentLibrary.navDateFields', descKey: 'componentLibrary.descDateFields', path: '/component-library/date-fields', icon: 'Calendar', section: 'ld' },
  { titleKey: 'componentLibrary.navDatePickers', descKey: 'componentLibrary.descDatePickers', path: '/component-library/date-pickers', icon: 'Calendar', section: 'ld' },
  { titleKey: 'componentLibrary.navDialog', descKey: 'componentLibrary.descDialog', path: '/component-library/dialog', icon: 'Box', section: 'ld' },
  { titleKey: 'componentLibrary.navDividers', descKey: 'componentLibrary.descDividers', path: '/component-library/dividers', icon: 'Minus', section: 'ld' },
  { titleKey: 'componentLibrary.navFilterChips', descKey: 'componentLibrary.descFilterChips', path: '/component-library/filter-chips', icon: 'Filter', section: 'ld' },
  { titleKey: 'componentLibrary.navFormGroups', descKey: 'componentLibrary.descFormGroups', path: '/component-library/form-groups', icon: 'List', section: 'ld' },
  { titleKey: 'componentLibrary.navIconButtons', descKey: 'componentLibrary.descIconButtons', path: '/component-library/icon-buttons', icon: 'Star', section: 'ld' },
  { titleKey: 'componentLibrary.navIcons', descKey: 'componentLibrary.descIcons', path: '/component-library/icons', icon: 'Star', section: 'ld' },
  { titleKey: 'componentLibrary.navLinkButtons', descKey: 'componentLibrary.descLinkButtons', path: '/component-library/link-buttons', icon: 'Link', section: 'ld' },
  { titleKey: 'componentLibrary.navLinks', descKey: 'componentLibrary.descLinks', path: '/component-library/links', icon: 'Link', section: 'ld' },
  { titleKey: 'componentLibrary.navLists', descKey: 'componentLibrary.descLists', path: '/component-library/lists', icon: 'List', section: 'ld' },
  { titleKey: 'componentLibrary.navMagicBox', descKey: 'componentLibrary.descMagicBox', path: '/component-library/magic-box', icon: 'Magic', section: 'ld' },
  { titleKey: 'componentLibrary.navMenu', descKey: 'componentLibrary.descMenu', path: '/component-library/menu', icon: 'Menu', section: 'ld' },
  { titleKey: 'componentLibrary.navMetrics', descKey: 'componentLibrary.descMetrics', path: '/component-library/metrics', icon: 'BarGraph', section: 'ld' },
  { titleKey: 'componentLibrary.navModals', descKey: 'componentLibrary.descModals', path: '/component-library/modals', icon: 'Box', section: 'ld' },
  { titleKey: 'componentLibrary.navNudges', descKey: 'componentLibrary.descNudges', path: '/component-library/nudges', icon: 'InfoCircle', section: 'ld' },
  { titleKey: 'componentLibrary.navPanels', descKey: 'componentLibrary.descPanels', path: '/component-library/panels', icon: 'PanelLeft', section: 'ld' },
  { titleKey: 'componentLibrary.navProgressIndicator', descKey: 'componentLibrary.descProgressIndicator', path: '/component-library/progress-indicator', icon: 'Refresh', section: 'ld' },
  { titleKey: 'componentLibrary.navProgressTracker', descKey: 'componentLibrary.descProgressTracker', path: '/component-library/progress-tracker', icon: 'ArrowRight', section: 'ld' },
  { titleKey: 'componentLibrary.navRadioButtons', descKey: 'componentLibrary.descRadioButtons', path: '/component-library/radio-buttons', icon: 'Circle', section: 'ld' },
  { titleKey: 'componentLibrary.navSelect', descKey: 'componentLibrary.descSelect', path: '/component-library/select', icon: 'ChevronDown', section: 'ld' },
  { titleKey: 'componentLibrary.navSkeleton', descKey: 'componentLibrary.descSkeleton', path: '/component-library/skeleton', icon: 'Box', section: 'ld' },
  { titleKey: 'componentLibrary.navSnackbars', descKey: 'componentLibrary.descSnackbars', path: '/component-library/snackbars', icon: 'Chat', section: 'ld' },
  { titleKey: 'componentLibrary.navSpinners', descKey: 'componentLibrary.descSpinners', path: '/component-library/spinners', icon: 'Refresh', section: 'ld' },
  { titleKey: 'componentLibrary.navSpotIcons', descKey: 'componentLibrary.descSpotIcons', path: '/component-library/spot-icons', icon: 'Star', section: 'ld' },
  { titleKey: 'componentLibrary.navSwitches', descKey: 'componentLibrary.descSwitches', path: '/component-library/switches', icon: 'Circle', section: 'ld' },
  { titleKey: 'componentLibrary.navTabNavigation', descKey: 'componentLibrary.descTabNavigation', path: '/component-library/tabs', icon: 'List', section: 'ld' },
  { titleKey: 'componentLibrary.navTags', descKey: 'componentLibrary.descTags', path: '/component-library/tags', icon: 'Tag', section: 'ld' },
  { titleKey: 'componentLibrary.navTextArea', descKey: 'componentLibrary.descTextArea', path: '/component-library/textarea', icon: 'Note', section: 'ld' },
  { titleKey: 'componentLibrary.navTextFields', descKey: 'componentLibrary.descTextFields', path: '/component-library/text-fields', icon: 'Edit', section: 'ld' },
  // ── Shared Components ──
  { titleKey: 'componentLibrary.navAlertDialog', descKey: 'componentLibrary.descAlertDialog', path: '/component-library/alert-dialog', icon: 'ExclamationCircle', section: 'shadcn' },
  { titleKey: 'componentLibrary.navAvatar', descKey: 'componentLibrary.descAvatar', path: '/component-library/avatar', icon: 'Circle', section: 'shadcn' },
  { titleKey: 'componentLibrary.navCalendar', descKey: 'componentLibrary.descCalendar', path: '/component-library/calendar', icon: 'Calendar', section: 'shadcn' },
  { titleKey: 'componentLibrary.navCarousel', descKey: 'componentLibrary.descCarousel', path: '/component-library/carousel', icon: 'ArrowRight', section: 'shadcn' },
  { titleKey: 'componentLibrary.navChart', descKey: 'componentLibrary.descChart', path: '/component-library/chart', icon: 'BarGraph', section: 'shadcn' },
  { titleKey: 'componentLibrary.navCommand', descKey: 'componentLibrary.descCommand', path: '/component-library/command', icon: 'Search', section: 'shadcn' },
  { titleKey: 'componentLibrary.navContextMenu', descKey: 'componentLibrary.descContextMenu', path: '/component-library/context-menu', icon: 'Menu', section: 'shadcn' },
  { titleKey: 'componentLibrary.navDropdownMenu', descKey: 'componentLibrary.descDropdownMenu', path: '/component-library/dropdown-menu', icon: 'ChevronDown', section: 'shadcn' },
  { titleKey: 'componentLibrary.navForm', descKey: 'componentLibrary.descForm', path: '/component-library/form', icon: 'Edit', section: 'shadcn' },
  { titleKey: 'componentLibrary.navMenubar', descKey: 'componentLibrary.descMenubar', path: '/component-library/menubar', icon: 'Menu', section: 'shadcn' },
  { titleKey: 'componentLibrary.navNavigationMenu', descKey: 'componentLibrary.descNavigationMenu', path: '/component-library/navigation-menu', icon: 'List', section: 'shadcn' },
  { titleKey: 'componentLibrary.navPagination', descKey: 'componentLibrary.descPagination', path: '/component-library/pagination', icon: 'ArrowRight', section: 'shadcn' },
  { titleKey: 'componentLibrary.navPopover', descKey: 'componentLibrary.descPopover', path: '/component-library/popover', icon: 'Box', section: 'shadcn' },
  { titleKey: 'componentLibrary.navProgressIndicator', descKey: 'componentLibrary.descProgress', path: '/component-library/progress', icon: 'Refresh', section: 'shadcn' },
  { titleKey: 'componentLibrary.navRadioButtons', descKey: 'componentLibrary.descRadioGroup', path: '/component-library/radio-group', icon: 'Circle', section: 'shadcn' },
  { titleKey: 'componentLibrary.navScrollArea', descKey: 'componentLibrary.descScrollArea', path: '/component-library/scroll-area', icon: 'List', section: 'shadcn' },
  { titleKey: 'componentLibrary.navDividers', descKey: 'componentLibrary.descSeparator', path: '/component-library/separator', icon: 'Minus', section: 'shadcn' },
  { titleKey: 'componentLibrary.navPanels', descKey: 'componentLibrary.descSheet', path: '/component-library/sheet', icon: 'PanelLeft', section: 'shadcn' },
  { titleKey: 'componentLibrary.navSlider', descKey: 'componentLibrary.descSlider', path: '/component-library/slider', icon: 'Minus', section: 'shadcn' },
  { titleKey: 'componentLibrary.navSwitches', descKey: 'componentLibrary.descSwitch', path: '/component-library/switch', icon: 'Circle', section: 'shadcn' },
  { titleKey: 'componentLibrary.navSnackbars', descKey: 'componentLibrary.descToast', path: '/component-library/toast', icon: 'Chat', section: 'shadcn' },
  { titleKey: 'componentLibrary.navSections', descKey: 'componentLibrary.descSections', path: '/component-library/sections', icon: 'List', section: 'shadcn' },
  { titleKey: 'componentLibrary.navToggle', descKey: 'componentLibrary.descToggle', path: '/component-library/toggle', icon: 'Check', section: 'shadcn' },
];

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const { t } = useTranslation();
  const title = t(entry.titleKey);
  return (
    <Link to={entry.path} className={styles.componentCard}>
      <div className={styles.cardPreview}>
        {getComponentPreview(title, entry.icon)}
      </div>
      <div className={styles.cardBody}>
        {entry.section === 'shadcn' && (
          <span className={styles.sharedBadge}>{t('componentLibrary.sharedBadge')}</span>
        )}
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{t(entry.descKey)}</p>
      </div>
    </Link>
  );
}

export default function ComponentLibraryOverview() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSections = searchQuery.trim()
    ? componentSections.filter(s =>
        t(s.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(s.descKey).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : componentSections;

  const ldComponents = filteredSections.filter(s => s.section === 'ld');
  const shadcnComponents = filteredSections.filter(s => s.section === 'shadcn');

  return (
    <div style={{ padding: '48px' }}>
      {/* Header */}
      <PageHeader
        section={t('componentLibrary.gettingStarted')}
        title={t('componentLibrary.overviewTitle')}
        description={t('componentLibrary.overviewDescription')}
      />

      <div style={{ marginBottom: '48px' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '600px' }}>
          <TextField
            label={t('componentLibrary.searchPlaceholder')}
            type="search"
            size="small"
            placeholder={t('componentLibrary.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leadingIcon={<Search style={{ width: 20, height: 20 }} />}
          />
        </div>

        {searchQuery.trim() && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)' }}>
            {t('componentLibrary.found', { count: filteredSections.length })}
          </div>
        )}
      </div>

      {/* LD 3.5 Components */}
      {ldComponents.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--ld-semantic-color-text-subtle)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
          }}>
            {t('componentLibrary.ldSection')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {ldComponents.map((entry) => (
              <ComponentCard key={entry.path} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {/* Shared Components */}
      {shadcnComponents.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--ld-semantic-color-text-subtle)',
            marginBottom: 'var(--ld-semantic-spacing-200)',
          }}>
            {t('componentLibrary.sharedSection')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {shadcnComponents.map((entry) => (
              <ComponentCard key={entry.path} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredSections.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          <Search style={{ width: '24px', height: '24px', margin: '0 auto 16px', opacity: 0.5 }} />
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>{t('componentLibrary.noComponentsFound')}</p>
          <p style={{ fontSize: '14px' }}>{t('componentLibrary.tryDifferentSearch')}</p>
        </div>
      )}

    </div>
  );
}
