import { SVGProps } from 'react';

export const ArrowLeftLine = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M24 28h-2V16.97l-10.732.003 3.959 4.209-1.473 1.316-5.492-5.842a.957.957 0 0 1 0-1.316l5.492-5.842 1.473 1.317-3.959 4.21L22 15.023V3.998h2V28Z"/>
  </svg>
);
