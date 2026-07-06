export default function Sponge() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sponge base (yellow part) */}
      <rect x="10" y="20" width="28" height="16" rx="3" fill="#FFE66D"/>
      {/* Sponge texture holes */}
      <circle cx="15" cy="24" r="1.5" fill="#E8D658" opacity="0.7"/>
      <circle cx="20" cy="26" r="1.2" fill="#E8D658" opacity="0.7"/>
      <circle cx="25" cy="24" r="1.3" fill="#E8D658" opacity="0.7"/>
      <circle cx="30" cy="27" r="1.4" fill="#E8D658" opacity="0.7"/>
      <circle cx="17" cy="30" r="1.1" fill="#E8D658" opacity="0.7"/>
      <circle cx="27" cy="31" r="1.3" fill="#E8D658" opacity="0.7"/>
      <circle cx="33" cy="23" r="1.2" fill="#E8D658" opacity="0.7"/>
      {/* Green scrubbing pad on top */}
      <path d="M10 16 Q10 14, 12 14 L36 14 Q38 14, 38 16 L38 20 L10 20 Z" fill="#6BCB77"/>
      {/* Scrubbing pad texture */}
      <line x1="12" y1="16" x2="36" y2="16" stroke="#5AAF66" strokeWidth="0.5" opacity="0.8"/>
      <line x1="12" y1="18" x2="36" y2="18" stroke="#5AAF66" strokeWidth="0.5" opacity="0.8"/>
      <circle cx="15" cy="17" r="0.5" fill="#4A9B5C" opacity="0.6"/>
      <circle cx="22" cy="17" r="0.5" fill="#4A9B5C" opacity="0.6"/>
      <circle cx="29" cy="17" r="0.5" fill="#4A9B5C" opacity="0.6"/>
      <circle cx="35" cy="17" r="0.5" fill="#4A9B5C" opacity="0.6"/>
      {/* Shadow/depth */}
      <ellipse cx="24" cy="36" rx="12" ry="2" fill="#D4C358" opacity="0.3"/>
    </svg>
  );
}
