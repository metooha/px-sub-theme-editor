import { SVGProps } from 'react';

export const BoxCorners = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 28h8v2H2V20h2v8Zm26-8v10H20v-2h8v-8h2ZM12 4H4v8H2V2h10v2Zm18 8h-2V4h-8V2h10v10Z"/>
  </svg>
);
