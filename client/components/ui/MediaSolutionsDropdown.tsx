import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from '@/components/icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { useState } from 'react';

export type MediaSolution =
  | 'Page Template'
  | 'Dashboard Template'
  | 'Catalog Template'
  | 'Detail Item'
  | 'Landing Connection'
  | 'Landing Summary'
  | 'Brand Shop Builder';

interface MediaSolutionsDropdownProps {
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

const solutions: { id: MediaSolution; labelKey: string; route: string }[] = [
  { id: 'Page Template',       labelKey: 'templates.pageTemplate',       route: '/page-template' },
  { id: 'Dashboard Template',  labelKey: 'templates.dashboardTemplate',  route: '/' },
  { id: 'Catalog Template',    labelKey: 'templates.catalogTemplate',    route: '/catalog' },
  { id: 'Detail Item',         labelKey: 'templates.detailItem',         route: '/detail-item' },
  { id: 'Landing Connection',  labelKey: 'templates.landingConnection',  route: '/landing-connection' },
  { id: 'Landing Summary',     labelKey: 'templates.landingSummary',     route: '/landing-summary' },
  { id: 'Brand Shop Builder',  labelKey: 'templates.brandShopBuilder',   route: '/brand-shop' },
];

export function MediaSolutionsDropdown({
  currentSolution = 'Dashboard Template',
  onSolutionChange,
}: MediaSolutionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSolutionClick = (solution: MediaSolution, route: string) => {
    navigate(route);
    onSolutionChange?.(solution);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ld-semantic-spacing-50)',
            fontSize: '12px',
            padding: 'var(--ld-semantic-spacing-50) var(--ld-semantic-spacing-100)',
            borderRadius: 'var(--ld-semantic-border-radius-medium)',
            color: 'var(--ld-semantic-color-top-nav-text-on-fill)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-top-nav-fill-hovered)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span>{t('templates.navigate')}</span>
          {open ? (
            <ChevronUp style={{ width: 16, height: 16 }} />
          ) : (
            <ChevronDown style={{ width: 16, height: 16 }} />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        showArrow={false}
        className="w-80 p-0"
      >
        <div style={{ padding: 'var(--ld-semantic-spacing-4, 16px)' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 800,
              marginBottom: 'var(--ld-semantic-spacing-2, 8px)',
              color: 'var(--ld-semantic-color-text)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}
          >
            {t('templates.pageTemplates')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {solutions.map((s) => {
              const isActive = currentSolution === s.id;
              return (
                <SolutionCard
                  key={s.id}
                  label={t(s.labelKey)}
                  isActive={isActive}
                  onClick={() => handleSolutionClick(s.id, s.route)}
                />
              );
            })}
          </div>

          <h3
            style={{
              fontSize: '14px',
              fontWeight: 800,
              margin: 'var(--ld-semantic-spacing-4, 16px) 0 var(--ld-semantic-spacing-2, 8px)',
              color: 'var(--ld-semantic-color-text)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}
          >
            {t('templates.toolsAndHelp')}
          </h3>

          <ToolLink
            label={t('templates.componentLibrary')}
            onClick={() => {
              navigate('/component-library');
              setOpen(false);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Solution Card ─── */

function SolutionCard({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ld-semantic-spacing-100)',
        padding: 'var(--ld-semantic-spacing-100)',
        width: '100%',
        borderRadius: 'var(--ld-semantic-border-radius-small)',
        border: isActive
          ? '2px solid var(--ld-semantic-color-action-border-primary)'
          : '1px solid var(--ld-semantic-color-separator)',
        backgroundColor: isActive ? 'var(--ld-semantic-color-action-fill-primary-subtle)' : 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        transition: 'border-color 150ms, background-color 150ms',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-border-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-separator)';
        }
      }}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fabedae4e18b740e6b7363e567a29025e"
        alt={label}
        style={{
          width: 20,
          height: 20,
          borderRadius: 'var(--ld-semantic-border-radius-full)',
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text)',
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Tool Link ─── */

function ToolLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ld-semantic-spacing-100)',
        padding: 'var(--ld-semantic-spacing-100)',
        width: '100%',
        borderRadius: 'var(--ld-semantic-border-radius-small)',
        border: '1px solid var(--ld-semantic-color-separator)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        transition: 'border-color 150ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-border-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-separator)';
      }}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe663bb9ecfe245cd8c1cdb8a20fd945c"
        alt={label}
        style={{
          width: 20,
          height: 20,
          borderRadius: 'var(--ld-semantic-border-radius-full)',
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text)',
        }}
      >
        {label}
      </span>
    </button>
  );
}
