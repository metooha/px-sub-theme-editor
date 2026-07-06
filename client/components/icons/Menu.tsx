import { SVGProps } from 'react';

export const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M30 24.001v2H2v-2h28Zm0-7H2v-2h28v2Zm0-9H2v-2h28v2Z"/>
  </svg>
);
