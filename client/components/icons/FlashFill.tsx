import { SVGProps } from 'react';

export const FlashFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M21.999 2a1.001 1.001 0 0 1 .874 1.485L18.698 11H26a1 1 0 0 1 .773 1.636l-14 17a1 1 0 0 1-1.696-1.02L15.5 18H6a1 1 0 0 1-.868-1.496l8-14A1 1 0 0 1 13.999 2h8Z"/>
  </svg>
);
