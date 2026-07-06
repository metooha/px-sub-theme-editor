import { SVGProps } from 'react';

export const LockOpen = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2a7.001 7.001 0 0 1 6.929 6H20.9A5 5 0 0 0 11 9v3h14a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3h2V9a7 7 0 0 1 7-7ZM7 14a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V15a1 1 0 0 0-1-1H7Zm10 10h-2v-6h2v6Z"/>
  </svg>
);
