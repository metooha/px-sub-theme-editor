import { SVGProps } from 'react';

export const User = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <circle 
      cx="10" 
      cy="7" 
      r="3.25" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
