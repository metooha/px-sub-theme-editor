import { SVGProps } from 'react';

export const PinFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="m30.005 14.594-1.414 1.414-1.592-1.591-6.066 6.063-1 5.998-2.934 2.932-6.5-6.497L3.409 30l-1.414-1.413 7.09-7.087-6.5-6.498 2.934-2.932 6-1 6.066-6.063-1.594-1.594L17.405 2l12.6 12.594Z" clipRule="evenodd"/>
  </svg>
);
