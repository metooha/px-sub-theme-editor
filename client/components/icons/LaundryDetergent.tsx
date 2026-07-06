export default function LaundryDetergent() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <path d="M28 8 L32 8 Q34 8, 34 10 L34 16 Q34 18, 32 18 L28 18" stroke="#5F27CD" strokeWidth="2" fill="none"/>
      {/* Cap */}
      <rect x="18" y="6" width="10" height="4" rx="1" fill="#FF6348"/>
      {/* Bottle body - larger container */}
      <path d="M16 10 L16 36 C16 38 17 40 20 40 L28 40 C31 40 32 38 32 36 L32 10 Z" fill="#A463F2"/>
      {/* Highlight */}
      <ellipse cx="19" cy="16" rx="2.5" ry="6" fill="#C69FF8" opacity="0.6"/>
      {/* Label */}
      <rect x="18" y="18" width="12" height="16" rx="1.5" fill="white" opacity="0.95"/>
      {/* Label content */}
      <circle cx="24" cy="22" r="2" fill="#5F27CD"/>
      <circle cx="21" cy="24" r="1" fill="#A463F2" opacity="0.7"/>
      <circle cx="27" cy="24" r="1" fill="#A463F2" opacity="0.7"/>
      <circle cx="24" cy="26" r="1.5" fill="#A463F2" opacity="0.5"/>
      <line x1="20" y1="29" x2="28" y2="29" stroke="#5F27CD" strokeWidth="1.5"/>
      <line x1="20" y1="31" x2="28" y2="31" stroke="#5F27CD" strokeWidth="1"/>
      <line x1="20" y1="33" x2="25" y2="33" stroke="#5F27CD" strokeWidth="0.8"/>
    </svg>
  );
}
