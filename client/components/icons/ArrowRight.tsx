import { SVGProps } from 'react';

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M29.707 15.293a1 1 0 0 1 0 1.414l-9 9-1.414-1.414L26.586 17H2v-2h24.586l-7.293-7.293 1.414-1.414 9 9Z"/>
  </svg>
);
