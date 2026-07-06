import { SVGProps } from 'react';

export const X = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M5 5L15 15M15 5L5 15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
