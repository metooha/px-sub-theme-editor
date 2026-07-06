import { SVGProps } from 'react';

export const PlayFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 8.503c0-1.906 2.048-3.11 3.714-2.185l13.411 7.45c1.715.953 1.715 3.42 0 4.372l-13.411 7.45C10.048 26.515 8 25.31 8 23.404V8.503Z"/>
  </svg>
);
