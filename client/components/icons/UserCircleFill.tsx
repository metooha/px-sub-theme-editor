import { SVGProps } from 'react';

export const UserCircleFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2Zm0 5a5 5 0 0 0-2.706 9.205 9.162 9.162 0 0 0-3.8 2.29 9.162 9.162 0 0 0-2.025 3.056l2.225.898a6.8 6.8 0 0 1 12.611 0l2.226-.898a9.177 9.177 0 0 0-2.026-3.057 9.16 9.16 0 0 0-3.799-2.289A5 5 0 0 0 16 7Zm0 2.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z"/>
  </svg>
);
