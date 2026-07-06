import { SVGProps } from 'react';

export const ArrowCircleDot = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m14.707 3.56-2.293 2.294H16c6.627 0 12 5.372 12 12 0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10h-3.586l2.293 2.292-1.414 1.414-4-4a1 1 0 0 1 0-1.414l4-4 1.414 1.415Z"/>
  <path fill="currentColor" d="M16.006 13.86a4 4 0 1 1-.002 8.001 4 4 0 0 1 .002-8.002Z"/>
  </svg>
);
