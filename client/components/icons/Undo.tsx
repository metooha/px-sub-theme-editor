import { SVGProps } from 'react';

export const Undo = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14.707 3.707 12.414 6H16c6.627 0 12 5.373 12 12s-5.373 12-12 12S4 24.627 4 18h2c0 5.523 4.477 10 10 10s10-4.477 10-10S21.523 8 16 8h-3.586l2.293 2.293-1.414 1.414-4-4a1 1 0 0 1 0-1.414l4-4 1.414 1.414Z"/>
  </svg>
);
