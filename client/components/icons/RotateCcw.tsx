import { SVGProps } from 'react';

export const RotateCcw = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C7.5 17 5.5 15.5 4.5 13.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <path 
      d="M3 6V10H7" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
  </svg>
);
