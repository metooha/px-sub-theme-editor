export default function DishSoap() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="20" y="6" width="8" height="3" rx="1.5" fill="#FF6B6B"/>
      {/* Neck */}
      <rect x="19" y="9" width="10" height="4" rx="1" fill="#FFA502"/>
      {/* Main bottle */}
      <path d="M17 13 L17 35 C17 37 18 38 20 38 L28 38 C30 38 31 37 31 35 L31 13 Z" fill="#FFD93D"/>
      {/* Shine/highlight */}
      <ellipse cx="20" cy="18" rx="2" ry="4" fill="#FFE066" opacity="0.7"/>
      {/* Label */}
      <rect x="19" y="22" width="10" height="10" rx="1" fill="white" opacity="0.9"/>
      {/* Label text lines */}
      <circle cx="24" cy="25" r="2" fill="#6BCB77"/>
      <line x1="21" y1="29" x2="27" y2="29" stroke="#4D96A9" strokeWidth="1"/>
      <line x1="21" y1="31" x2="27" y2="31" stroke="#4D96A9" strokeWidth="0.8"/>
      {/* Bottom edge */}
      <ellipse cx="24" cy="38" rx="7" ry="2" fill="#E5B632"/>
    </svg>
  );
}
