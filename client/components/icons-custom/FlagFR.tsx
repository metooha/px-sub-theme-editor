/**
 * FlagFR — French flag circular icon
 * Intentional national flag colors (not semantic tokens).
 * Moved from LanguageSelector inline component for reusability.
 */
export function FlagFR({ size = 16 }: { size?: number }) {
  const id = `clip-fr-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="20" height="20" fill="#ED2939" />
        <rect width="13.333" height="20" fill="#FFFFFF" />
        <rect width="6.667" height="20" fill="#002395" />
      </g>
    </svg>
  );
}
