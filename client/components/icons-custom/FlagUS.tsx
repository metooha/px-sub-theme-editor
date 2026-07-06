/**
 * FlagUS — US flag circular icon
 * Intentional national flag colors (not semantic tokens).
 * Moved from LanguageSelector inline component for reusability.
 */
export function FlagUS({ size = 16 }: { size?: number }) {
  const id = `clip-us-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="20" height="20" fill="#B22234" />
        <rect y="1.538" width="20" height="1.538" fill="#FFFFFF" />
        <rect y="4.615" width="20" height="1.538" fill="#FFFFFF" />
        <rect y="7.692" width="20" height="1.538" fill="#FFFFFF" />
        <rect y="10.769" width="20" height="1.538" fill="#FFFFFF" />
        <rect y="13.846" width="20" height="1.538" fill="#FFFFFF" />
        <rect y="16.923" width="20" height="1.538" fill="#FFFFFF" />
        <rect width="8" height="10.769" fill="#3C3B6E" />
        <circle cx="1.333" cy="1.333" r="0.5" fill="#FFFFFF" />
        <circle cx="2.667" cy="1.333" r="0.5" fill="#FFFFFF" />
        <circle cx="4" cy="1.333" r="0.5" fill="#FFFFFF" />
        <circle cx="5.333" cy="1.333" r="0.5" fill="#FFFFFF" />
        <circle cx="6.667" cy="1.333" r="0.5" fill="#FFFFFF" />
        <circle cx="2" cy="2.667" r="0.5" fill="#FFFFFF" />
        <circle cx="3.333" cy="2.667" r="0.5" fill="#FFFFFF" />
        <circle cx="4.667" cy="2.667" r="0.5" fill="#FFFFFF" />
        <circle cx="6" cy="2.667" r="0.5" fill="#FFFFFF" />
        <circle cx="1.333" cy="4" r="0.5" fill="#FFFFFF" />
        <circle cx="2.667" cy="4" r="0.5" fill="#FFFFFF" />
        <circle cx="4" cy="4" r="0.5" fill="#FFFFFF" />
        <circle cx="5.333" cy="4" r="0.5" fill="#FFFFFF" />
        <circle cx="6.667" cy="4" r="0.5" fill="#FFFFFF" />
        <circle cx="2" cy="5.333" r="0.5" fill="#FFFFFF" />
        <circle cx="3.333" cy="5.333" r="0.5" fill="#FFFFFF" />
        <circle cx="4.667" cy="5.333" r="0.5" fill="#FFFFFF" />
        <circle cx="6" cy="5.333" r="0.5" fill="#FFFFFF" />
        <circle cx="1.333" cy="6.667" r="0.5" fill="#FFFFFF" />
        <circle cx="2.667" cy="6.667" r="0.5" fill="#FFFFFF" />
        <circle cx="4" cy="6.667" r="0.5" fill="#FFFFFF" />
        <circle cx="5.333" cy="6.667" r="0.5" fill="#FFFFFF" />
        <circle cx="6.667" cy="6.667" r="0.5" fill="#FFFFFF" />
        <circle cx="2" cy="8" r="0.5" fill="#FFFFFF" />
        <circle cx="3.333" cy="8" r="0.5" fill="#FFFFFF" />
        <circle cx="4.667" cy="8" r="0.5" fill="#FFFFFF" />
        <circle cx="6" cy="8" r="0.5" fill="#FFFFFF" />
        <circle cx="1.333" cy="9.333" r="0.5" fill="#FFFFFF" />
        <circle cx="2.667" cy="9.333" r="0.5" fill="#FFFFFF" />
        <circle cx="4" cy="9.333" r="0.5" fill="#FFFFFF" />
        <circle cx="5.333" cy="9.333" r="0.5" fill="#FFFFFF" />
        <circle cx="6.667" cy="9.333" r="0.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
