import { SVGProps } from 'react';

export const PlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16.84 8.129v7.002h7v2h-7v6.998h-2V17.13h-7v-2h7V8.129h2Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M16 2c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2Zm0 2C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12c0-6.628-5.373-12-12-12Z" clipRule="evenodd"/>
  </svg>
);
