import { SVGProps } from 'react';

export const Wallet = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M23.625 2.058A2 2 0 0 1 26 4.022v2.99h-2v-2.99L4.966 7.656a1.19 1.19 0 0 0 .223 2.357H28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-13h2v13h24v-3h-8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h8v-3H5.19a3.19 3.19 0 0 1-.6-6.322l19.035-3.633ZM20 23.013h8v-6h-8v6Z"/>
  </svg>
);
