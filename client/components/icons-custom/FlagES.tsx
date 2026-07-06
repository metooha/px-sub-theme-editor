/**
 * FlagES — Spanish flag circular icon
 * Intentional national flag colors (not semantic tokens).
 * Moved from LanguageSelector inline component for reusability.
 */
export function FlagES({ size = 16 }: { size?: number }) {
  const id = `clip-es-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="20" height="20" fill="#c60b1e" />
        <rect y="5" width="20" height="10" fill="#ffc400" />
        <rect x="3" y="6.5" width="3" height="7" fill="#c60b1e" rx="0.5" />
      </g>
    </svg>
  );
}
