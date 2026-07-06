import { SVGProps } from 'react';

export const ArrowUpLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M28 4H5.414L30 28.6 28.6 30 4 5.414V28H2V3l.02-.201A1 1 0 0 1 3 2h25v2Z"/>
  </svg>
);
