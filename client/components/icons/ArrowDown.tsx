import { SVGProps } from 'react';

export const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m17 26.586 7.293-7.293 1.414 1.414-9 9a1 1 0 0 1-1.414 0l-9-9 1.414-1.414L15 26.586V2h2v24.586Z"/>
  </svg>
);
