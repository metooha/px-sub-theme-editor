import { SVGProps } from 'react';

export const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <rect 
      x="3" 
      y="4" 
      width="14" 
      height="13" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M3 8H17" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M6 3V5M14 3V5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
