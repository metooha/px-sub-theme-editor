import { SVGProps } from 'react';

export const Download = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M10 3V13M10 13L6 9M10 13L14 9" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 17H17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
