import { SVGProps } from 'react';

export const BarGraphFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M9.998 29.998H2v-20h7.998v20Zm10.002 0h-7.998V14.004H20v15.994Zm10 0h-7.998V2.002H30v27.996Z"/>
  </svg>
);
