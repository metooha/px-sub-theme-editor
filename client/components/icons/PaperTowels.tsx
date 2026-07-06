export default function PaperTowels() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roll body - white paper */}
      <ellipse cx="24" cy="24" rx="14" ry="16" fill="#FFFFFF"/>
      {/* Outer ring - colored wrapper */}
      <ellipse cx="24" cy="24" rx="14" ry="16" fill="none" stroke="#0891B2" strokeWidth="2"/>
      {/* Inner tube - cyan */}
      <ellipse cx="24" cy="24" rx="5" ry="6" fill="#06B6D4"/>
      {/* Inner tube shadow */}
      <ellipse cx="24" cy="24" rx="3.5" ry="4.5" fill="#0891B2"/>
      
      {/* Decorative pattern - colorful dots */}
      <circle cx="18" cy="18" r="1.5" fill="#F59E0B" opacity="0.8"/>
      <circle cx="30" cy="18" r="1.5" fill="#EF4444" opacity="0.8"/>
      <circle cx="18" cy="24" r="1.5" fill="#10B981" opacity="0.8"/>
      <circle cx="30" cy="24" r="1.5" fill="#8B5CF6" opacity="0.8"/>
      <circle cx="18" cy="30" r="1.5" fill="#EC4899" opacity="0.8"/>
      <circle cx="30" cy="30" r="1.5" fill="#3B82F6" opacity="0.8"/>
      
      {/* Paper texture lines - subtle */}
      <path d="M14 14 L34 14" stroke="#E5E7EB" strokeWidth="0.5"/>
      <path d="M14 18 L34 18" stroke="#E5E7EB" strokeWidth="0.5"/>
      <path d="M14 22 L34 22" stroke="#E5E7EB" strokeWidth="0.5"/>
      <path d="M14 26 L34 26" stroke="#E5E7EB" strokeWidth="0.5"/>
      <path d="M14 30 L34 30" stroke="#E5E7EB" strokeWidth="0.5"/>
      <path d="M14 34 L34 34" stroke="#E5E7EB" strokeWidth="0.5"/>
      
      {/* Perforations - cyan */}
      <circle cx="11" cy="24" r="1" fill="#06B6D4"/>
      <circle cx="37" cy="24" r="1" fill="#06B6D4"/>
      
      {/* Highlight on tube */}
      <ellipse cx="22" cy="22" rx="1.5" ry="2" fill="#67E8F9" opacity="0.6"/>
    </svg>
  );
}
