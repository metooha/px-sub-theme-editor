import { SVGProps } from 'react';

export const GridFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M13 18.001a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Zm16 0a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H19a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Zm-16-16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Zm16 0a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H19a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Z"/>
  </svg>
);
