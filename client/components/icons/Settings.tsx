import { SVGProps } from 'react';

export const Settings = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M16.5 10.5L15.5 10L16.5 9.5L17 8.5L17.5 9.5L18.5 10L17.5 10.5L17 11.5L16.5 10.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
    <path 
      d="M2 10.5L3 10L2 9.5L1.5 8.5L1 9.5L0 10L1 10.5L1.5 11.5L2 10.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square" 
      strokeLinejoin="round"
    />
    <path 
      d="M10 2V3.5M10 16.5V18M4 4L5 5M15 15L16 16M2 10H3.5M16.5 10H18M4 16L5 15M15 5L16 4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
  </svg>
);
