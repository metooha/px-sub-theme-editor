import { SVGProps } from 'react';

export const ArrowUpDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16.705 2.293a1 1 0 0 0-1.414 0l-4.998 5.002 1.416 1.414L15 5.414v21.17l-3.291-3.293-.709.707-.707.707 5.002 5.002a1 1 0 0 0 1.414 0l4.998-5.002-1.416-1.414L17 26.586V5.416l3.291 3.293.709-.707.707-.707-5.002-5.002Z"/>
  </svg>
);
