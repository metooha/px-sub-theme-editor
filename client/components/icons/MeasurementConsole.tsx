export default function MeasurementConsole({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 3V5.5C6 5.63261 6.05268 5.75979 6.14645 5.85355L7.89645 7.60355L8.60355 6.89645L7 5.29289V3H6Z" fill="currentColor"/>
      <path d="M6.5 10C8.98528 10 11 7.98528 11 5.5C11 3.01472 8.98528 1 6.5 1C4.01472 1 2 3.01472 2 5.5C2 7.98528 4.01472 10 6.5 10ZM6.5 9C4.567 9 3 7.433 3 5.5C3 3.567 4.567 2 6.5 2C8.433 2 10 3.567 10 5.5C10 7.433 8.433 9 6.5 9Z" fill="currentColor"/>
      <path d="M14 7H13V15H14V7Z" fill="currentColor"/>
      <path d="M11 9H12V15H11V9Z" fill="currentColor"/>
      <path d="M10 11H9V15H10V11Z" fill="currentColor"/>
      <path d="M5 12H6V15H5V12Z" fill="currentColor"/>
      <path d="M7 13H8V15H7V13Z" fill="currentColor"/>
    </svg>
  );
}
