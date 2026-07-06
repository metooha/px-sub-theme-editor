import { SVGProps } from 'react';

export const InfoCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm0 2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12Zm1.201 19h-2.4v-9h2.4v9ZM16 9.001a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 16 9Z"/>
  </svg>
);
