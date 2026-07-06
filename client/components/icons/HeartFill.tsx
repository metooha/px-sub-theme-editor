import { SVGProps } from 'react';

export const HeartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M21.62 4.041a8.344 8.344 0 0 1 5.92 2.493 8.573 8.573 0 0 1 2.46 6v.162c0 3.142-1.84 6.487-5.48 9.831a40.81 40.81 0 0 1-7.06 5.088 2.969 2.969 0 0 1-2.92 0 40.806 40.806 0 0 1-7.06-5.088C3.84 19.183 2 15.88 2 12.697v-.163a8.56 8.56 0 0 1 1.346-4.64 8.392 8.392 0 0 1 3.629-3.137 8.26 8.26 0 0 1 4.732-.615A8.315 8.315 0 0 1 16 6.25 8.3 8.3 0 0 1 21.62 4v.041Z"/>
  </svg>
);
