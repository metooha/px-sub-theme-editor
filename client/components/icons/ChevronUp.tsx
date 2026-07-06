import { SVGProps } from 'react';

export const ChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M15 12.5L10 7.5L5 12.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
  </svg>
);
