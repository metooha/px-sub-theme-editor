import { SVGProps } from 'react';

export const Circle = (props: SVGProps<SVGSVGElement>) => (
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
      cy="10" 
      r="7" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
  </svg>
);
