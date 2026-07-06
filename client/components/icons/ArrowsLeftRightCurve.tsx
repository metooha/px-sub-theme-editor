import { SVGProps } from 'react';

export const ArrowsLeftRightCurve = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m26.587 8-4.293-4.293 1.414-1.414 6.001 6a1 1 0 0 1 0 1.414l-6 6-1.415-1.414L26.588 10H6.998a3 3 0 0 0-3 3v2h-2v-2a5 5 0 0 1 5-5h19.59ZM5.413 24l4.293 4.293-1.414 1.414-6.001-6a1 1 0 0 1 0-1.414l6-6 1.415 1.414L5.413 22H25a3 3 0 0 0 3-3v-2h2.001v2a5 5 0 0 1-5 5H5.411Z"/>
  </svg>
);
