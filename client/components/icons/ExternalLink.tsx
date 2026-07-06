import { SVGProps } from 'react';

export const ExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M11 3H17M17 3V9M17 3L9 11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 11V16C14 16.5523 13.5523 17 13 17H4C3.44772 17 3 16.5523 3 16V7C3 6.44772 3.44772 6 4 6H9" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
