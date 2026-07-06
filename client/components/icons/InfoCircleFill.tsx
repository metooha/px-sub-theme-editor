import { SVGProps } from 'react';

export const InfoCircleFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2Zm-1.2 12v9h2.401v-9h-2.4ZM16 9a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 16 9Z"/>
  </svg>
);
