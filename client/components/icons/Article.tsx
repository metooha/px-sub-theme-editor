import { SVGProps } from 'react';

export const Article = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M28 2a2 2 0 0 1 2 2v21a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-2.5A1.5 1.5 0 0 1 3.5 21h17a1.5 1.5 0 0 1 1.5 1.5V25a3 3 0 1 0 6 0V4H9v14H7V4a2 2 0 0 1 2-2h19ZM4 25a3 3 0 0 0 3 3h14a4.978 4.978 0 0 1-1-3v-2H4v2Zm20-7H12v-2h12v2Zm-4-4h-8v-2h8v2Zm-4-4h-4V8h4v2Z"/>
  </svg>
);
