export default function CleaningSpray() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottle cap */}
      <rect x="18" y="8" width="12" height="4" rx="1" fill="#FF6B6B"/>
      {/* Trigger top */}
      <path d="M30 12 L34 14 L34 18 L32 19 L30 18 Z" fill="#2E86DE"/>
      {/* Trigger bottom */}
      <ellipse cx="32" cy="18" rx="2.5" ry="1.5" fill="#1E5FA8"/>
      {/* Main bottle body */}
      <rect x="16" y="12" width="16" height="24" rx="2" fill="#4ECDC4"/>
      {/* Bottle highlight */}
      <rect x="18" y="14" width="3" height="20" rx="1" fill="#A8E6E2" opacity="0.6"/>
      {/* Label */}
      <rect x="18" y="20" width="12" height="8" rx="1" fill="white" opacity="0.8"/>
      <line x1="20" y1="22" x2="28" y2="22" stroke="#2E86DE" strokeWidth="1"/>
      <line x1="20" y1="24" x2="28" y2="24" stroke="#2E86DE" strokeWidth="1"/>
      <line x1="20" y1="26" x2="25" y2="26" stroke="#2E86DE" strokeWidth="1"/>
      {/* Bottom */}
      <rect x="16" y="36" width="16" height="4" rx="1" fill="#3DADAA"/>
    </svg>
  );
}
