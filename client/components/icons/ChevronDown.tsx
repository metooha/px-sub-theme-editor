import { SVGProps } from 'react';

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M5 7.5L10 12.5L15 7.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
  </svg>
);
