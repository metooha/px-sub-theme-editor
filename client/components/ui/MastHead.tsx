import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, HelpCircle, User, AppSwitcher } from '@/components/icons';
import { MartyAvatar } from '@/features/marty/MartyAvatar';
import { MediaSolutionsDropdown, MediaSolution } from './MediaSolutionsDropdown';
import { useMarty } from '@/contexts/MartyContext';
import { Divider } from './Divider';
import { LanguageSelector } from './LanguageSelector';
import styles from './MastHead.module.css';

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
  const { isMinimized, isSidePanel, isDocked, dockedSection, setDockedSection, setIsMinimized, setIsDocked, setIsSidePanel, setInitialPosition } = useMarty();
  const dragListenersRef = useRef<{ move: (e: MouseEvent) => void; up: () => void } | null>(null);

  // Cleanup window listeners on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (dragListenersRef.current) {
        window.removeEventListener('mousemove', dragListenersRef.current.move);
        window.removeEventListener('mouseup', dragListenersRef.current.up);
        dragListenersRef.current = null;
      }
    };
  }, []);

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
          {isDocked && !dockedSection && (
            <button
              onClick={(e) => {
                const buttonEl = e.currentTarget;
                const wasDragged = (buttonEl as any).wasDragged;
                if (!wasDragged) {
                  if (isSidePanel) {
                    setIsSidePanel(false);
                    setIsMinimized(true);
                  } else {
                    setIsSidePanel(true);
                  }
                }
                setTimeout(() => {
                  if (buttonEl) {
                    (buttonEl as any).wasDragged = false;
                  }
                }, 100);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const buttonEl = e.currentTarget;
                let hasMoved = false;

                const cleanup = () => {
                  if (dragListenersRef.current) {
                    window.removeEventListener('mousemove', dragListenersRef.current.move);
                    window.removeEventListener('mouseup', dragListenersRef.current.up);
                    dragListenersRef.current = null;
                  }
                };

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = Math.abs(moveEvent.clientX - startX);
                  const deltaY = Math.abs(moveEvent.clientY - startY);
                  if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 3) {
                    hasMoved = true;
                    // Open as side panel instead of floating
                    setIsSidePanel(true);
                    setIsMinimized(false);
                    setIsDocked(false);
                    setDockedSection(null);
                    cleanup();
                  }
                };
                const handleMouseUp = () => {
                  cleanup();
                  if (hasMoved) {
                    (buttonEl as any).wasDragged = true;
                  }
                };

                // Clean up any existing listeners first
                cleanup();
                dragListenersRef.current = { move: handleMouseMove, up: handleMouseUp };
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
              }}
              className={styles.iconButton}
              style={{ cursor: 'move' }}
              aria-label={t('masthead.openMarty')}
            >
              <MartyAvatar size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
