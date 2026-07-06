import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerColor = 'neutral' | 'white';
export type SpinnerSize = 'large' | 'small';

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  /**
   * The accessible label for the spinner.
   * @default "Loading…"
   */
  a11yLabel?: string;
  /**
   * The color for the spinner.
   * @default "neutral"
   */
  color?: SpinnerColor;
  /**
   * The size for the spinner.
   * @default "large"
   */
  size?: SpinnerSize;
  /**
   * The props spread to the spinner's svg element.
   * @default {}
   */
  spinnerProps?: React.ComponentPropsWithoutRef<'svg'>;
  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_className?: string;
  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Spinners visually indicate that a process is taking place
 * for an indeterminate amount of time.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner color="white" size="small" />
 * ```
 */
export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  a11yLabel = 'Loading…',
  color = 'neutral',
  size = 'large',
  spinnerProps = {},
  UNSAFE_className,
  UNSAFE_style,
  ...rest
}) => {
  const uniqueTitleId = React.useId();

  const containerClass = [
    styles.container,
    size === 'large' && styles.large,
    size === 'small' && styles.small,
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  const svgClass = [
    color === 'neutral' && styles.neutral,
    color === 'white' && styles.white,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={containerClass}
      style={UNSAFE_style}
      role="status"
      {...rest}
    >
      <svg
        aria-labelledby={uniqueTitleId}
        className={svgClass}
        role="img"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        {...spinnerProps}
      >
        <title id={uniqueTitleId}>{a11yLabel}</title>
        <defs>
          <path
            d="M23.7833 1.55122C21.9046 1.55122 20.3818 3.07279 20.3818 4.94971C20.3818 5.77181 21.2057 14.5072 21.496 15.3808C21.8287 16.382 22.7456 17.0508 23.7833 17.0508C24.8209 17.0508 25.7378 16.382 26.0705 15.3808C26.3608 14.5072 27.1847 5.77181 27.1847 4.94971C27.1847 3.07279 25.6618 1.55122 23.7833 1.55122Z"
            id="ld-spinner-pill"
          />
        </defs>
        <use className={styles.pill} href="#ld-spinner-pill" />
        <use className={`${styles.pill} ${styles.pill2}`} href="#ld-spinner-pill" />
        <use className={`${styles.pill} ${styles.pill3}`} href="#ld-spinner-pill" />
        <use className={`${styles.pill} ${styles.pill4}`} href="#ld-spinner-pill" />
        <use className={`${styles.pill} ${styles.pill5}`} href="#ld-spinner-pill" />
        <use className={`${styles.pill} ${styles.pill6}`} href="#ld-spinner-pill" />
      </svg>
    </span>
  );
};

Spinner.displayName = 'Spinner';
