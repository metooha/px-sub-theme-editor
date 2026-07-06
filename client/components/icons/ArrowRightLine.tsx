import { SVGProps } from 'react';

export const ArrowRightLine = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M7.999 3.999h2v11.029l10.732-.002-3.959-4.21L18.245 9.5l5.492 5.842c.35.372.35.944 0 1.317L18.245 22.5l-1.473-1.316 3.96-4.21-10.733.001V28h-2V4Z"/>
  </svg>
);
