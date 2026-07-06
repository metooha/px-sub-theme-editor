import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlagUS, FlagFR, FlagES } from '@/components/icons-custom';
import styles from './LanguageSelector.module.css';

function CaretDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7.62372 10.3293C7.71866 10.4378 7.85583 10.5 8.00001 10.5C8.14419 10.5 8.28135 10.4378 8.3763 10.3293L11.8763 6.32925C12.0055 6.18161 12.0364 5.97205 11.9553 5.79339C11.8743 5.61474 11.6962 5.5 11.5 5.5H4.50001C4.30382 5.5 4.12576 5.61474 4.04469 5.79339C3.96362 5.97205 3.99453 6.18161 4.12372 6.32925L7.62372 10.3293Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Language = {
  code: string;
  label: string;
  FlagSmall: () => JSX.Element;
  FlagLarge: () => JSX.Element;
};

const LANGUAGES: Language[] = [
  {
    code: 'en',
    label: 'English (US)',
    FlagSmall: () => <FlagUS size={16} />,
    FlagLarge: () => <FlagUS size={20} />,
  },
  {
    code: 'fr',
    label: 'Français',
    FlagSmall: () => <FlagFR size={16} />,
    FlagLarge: () => <FlagFR size={20} />,
  },
  {
    code: 'es',
    label: 'Español',
    FlagSmall: () => <FlagES size={16} />,
    FlagLarge: () => <FlagES size={20} />,
  },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const resolvedLng = i18n.resolvedLanguage || i18n.language?.split('-')[0] || 'en';
  const currentLang = LANGUAGES.find(l => l.code === resolvedLng) || LANGUAGES[0];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.root} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${currentLang.label}`}
      >
        <span className={styles.flagIcon}>
          <currentLang.FlagSmall />
        </span>
        <CaretDown />
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox" aria-label="Select language">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={currentLang.code === lang.code}
              className={`${styles.option} ${currentLang.code === lang.code ? styles.optionSelected : ''}`}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
            >
              <span className={styles.flagIconLarge}>
                <lang.FlagLarge />
              </span>
              <span className={styles.langLabel}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
