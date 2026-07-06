export default function Reports({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8.74041 7.44936L13.4827 2.70711L12.7756 2L8.74041 6.03515L5.91196 3.2067L2 7.11901L2.70714 7.82609L5.91199 4.62095L8.74041 7.44936Z" fill="currentColor"/>
      <path d="M11.7347 15.4045V6.40447H12.7347V15.4045H11.7347Z" fill="currentColor"/>
      <path d="M5.73471 15.4045V7.90447H6.73471V15.4045H5.73471Z" fill="currentColor"/>
      <path d="M2.73471 15.4045V10.4045H3.73471V15.4045H2.73471Z" fill="currentColor"/>
      <path d="M8.73471 9.40447V15.4045H9.73471V9.40447H8.73471Z" fill="currentColor"/>
    </svg>
  );
}
