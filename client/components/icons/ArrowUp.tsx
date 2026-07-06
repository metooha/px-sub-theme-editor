import { SVGProps } from 'react';

export const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M15.293 2.293a1 1 0 0 1 1.414 0l9 9-1.415 1.414L17 5.414V30h-2V5.414l-7.293 7.293-1.414-1.414 9-9Z"/>
  </svg>
);
