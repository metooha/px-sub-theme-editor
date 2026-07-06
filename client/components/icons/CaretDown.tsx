import { SVGProps } from 'react';

export const CaretDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M23 11.001a1 1 0 0 1 .753 1.658l-7 8a1.001 1.001 0 0 1-1.505 0l-7-8A1.001 1.001 0 0 1 9 11.001h14Z"/>
  </svg>
);
