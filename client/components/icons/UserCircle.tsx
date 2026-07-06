import { SVGProps } from 'react';

export const UserCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2Zm0 2C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4Zm0 3a5 5 0 0 1 2.476 9.346 8.96 8.96 0 0 1 3.888 2.29 8.98 8.98 0 0 1 1.982 2.989l-1.855.749a7 7 0 0 0-12.982 0l-1.855-.749a8.976 8.976 0 0 1 1.982-2.99 8.96 8.96 0 0 1 3.888-2.29A5 5 0 0 1 16 7Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
  </svg>
);
