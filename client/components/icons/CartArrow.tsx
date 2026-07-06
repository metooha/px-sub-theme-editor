import { SVGProps } from 'react';

export const CartArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M2 5.5h3a1 1 0 0 1 1 1v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-4h-2v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-12a3 3 0 0 0-3-3H2v2Z"/>
  <path fill="currentColor" d="m12.293 11.207 4.293 4.293a2 2 0 0 0 2.828 0l4.293-4.293-1.414-1.414L19 13.086V3.5h-2v9.586l-3.293-3.293-1.414 1.414ZM15 26a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
  </svg>
);
