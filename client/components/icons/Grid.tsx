import { SVGProps } from 'react';

export const Grid = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M13 18.001a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Zm16 0a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H19a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10Zm-25 10h8v-8H4v8Zm16 0h8v-8h-8v8Zm-7-26a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-.999h10Zm16 0a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H19a1 1 0 0 1-1-1V3a1 1 0 0 1 1-.999h10Zm-25 10h8v-8H4v8Zm16 0h8v-8h-8v8Z"/>
  </svg>
);
