import { SVGProps } from 'react';

export const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm0 2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12Zm7.707 7.707-10 10a1 1 0 0 1-1.414 0l-4-4 1.414-1.415L13 19.586l9.293-9.293 1.414 1.415Z"/>
  </svg>
);
