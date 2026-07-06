import { SVGProps } from 'react';

export const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <circle 
      cx="8.5" 
      cy="8.5" 
      r="5.75" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M13 13L17 17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
