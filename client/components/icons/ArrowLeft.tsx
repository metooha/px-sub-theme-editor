import { SVGProps } from 'react';

export const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M12.707 7.707 5.414 15h24.587v2H5.414l7.293 7.293-1.414 1.414-9-9a1 1 0 0 1 0-1.414l9-9 1.414 1.414Z"/>
  </svg>
);
