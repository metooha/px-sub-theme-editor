import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, HelpCircle, User, AppSwitcher } from '@/components/icons';
import { useMartyOptional } from '@/contexts/MartyContext';
import { MediaSolutionsDropdown, MediaSolution } from './MediaSolutionsDropdown';
import { Divider } from './Divider';
import { LanguageSelector } from './LanguageSelector';
import styles from './MastHead.module.css';

/**
 * Small "Marty is docked here" indicator shown next to the Account icon
 * when the floating panel has been docked to the masthead.
 * No-op (renders nothing) when Marty isn't docked here, or when used
 * outside a MartyProvider (e.g. the component library pages).
 */
function MartyMastheadDock() {
  const marty = useMartyOptional();
  const [hovered, setHovered] = useState(false);

  if (!marty) return null;
  const { isDocked, dockedSection, setIsSidePanel, setIsDocked, setDockedSection, setInitialPosition, setIsMinimized } = marty;

  if (!(isDocked && dockedSection === null)) return null;

  return (
    <button
      aria-label="Ask Marty"
      onClick={() => setIsSidePanel(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => {
        setHovered(false);
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        let moved = false;
        const onMove = (mv: MouseEvent) => {
          if (Math.hypot(mv.clientX - startX, mv.clientY - startY) > 5) {
            moved = true;
            setInitialPosition({ x: mv.clientX - 25, y: mv.clientY - 25 });
            setIsDocked(false);
            setDockedSection(null);
            setIsSidePanel(false);
            setIsMinimized(false);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
          }
        };
        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        flexShrink: 0,
        borderRadius: '50%',
        border: '1.5px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(134deg, var(--ld-semantic-color-border-magic-start) 10.5%, var(--ld-semantic-color-border-magic-middle) 71.77%, var(--ld-semantic-color-border-magic-stop) 102.41%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        cursor: 'move',
        boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        transition: 'box-shadow 150ms ease',
      }}
    >
      <div style={{ width: 20, height: 20, overflow: 'hidden', borderRadius: '50%' }}>
        <img
          src="/assets/sparky-wink.png"
          alt=""
          width={20}
          height={20}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </button>
  );
}

interface MastHeadProps {
  appName?: string;
  /** Optional logo image URL or custom React node to display instead of / alongside the app name */
  appLogo?: string | React.ReactNode;
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

export function MastHead({
  appName,
  appLogo,
  currentSolution = 'Dashboard Template',
  onSolutionChange
}: MastHeadProps) {
  const { t } = useTranslation();
  const displayAppName = appName ?? t('masthead.appName');

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* App Switcher */}
        <button className={styles.iconButton} aria-label={t('masthead.appSwitcher')}>
          <AppSwitcher style={{ width: 16, height: 16 }} />
        </button>
        
        {/* App Logo / Name */}
        {appLogo ? (
          typeof appLogo === 'string' ? (
            <img src={appLogo} alt={displayAppName} className={styles.appLogo} />
          ) : (
            <>{appLogo}</>
          )
        ) : (
          <span className={styles.appName}>{displayAppName}</span>
        )}
      </div>

      <div className={styles.right}>
        <MediaSolutionsDropdown
          currentSolution={currentSolution}
          onSolutionChange={onSolutionChange}
        />
        <Divider orientation="vertical" UNSAFE_className={styles.divider} />
        <LanguageSelector />
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label={t('masthead.notifications')}>
            <Bell style={{ width: 16, height: 16 }} />
            <span className={styles.notifDot}></span>
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.help')}>
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.account')}>
            <User style={{ width: 16, height: 16 }} />
          </button>
          <MartyMastheadDock />
        </div>
      </div>
    </header>
  );
}
