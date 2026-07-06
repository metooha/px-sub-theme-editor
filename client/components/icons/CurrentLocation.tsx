import { SVGProps } from 'react';

export const CurrentLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M17 6.05A10.003 10.003 0 0 1 25.95 15H30v2h-4.05A10.003 10.003 0 0 1 17 25.95V30h-2v-4.05A10.003 10.003 0 0 1 6.05 17H2v-2h4.05A10.003 10.003 0 0 1 15 6.05V2h2v4.05ZM16 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>
  </svg>
);
