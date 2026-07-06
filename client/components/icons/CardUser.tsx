import { SVGProps } from 'react';

export const CardUser = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14.142 17.364a4 4 0 1 0-4.283 0A6.002 6.002 0 0 0 6 22.971h2a4 4 0 0 1 8 0h2a6.002 6.002 0 0 0-3.858-5.607ZM12 15.985a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM25 13h-6v-2h6v2Zm-6 4h4v-2h-4v2Z"/>
  <path fill="currentColor" d="M4 5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm24 2v18H4V7h24Z"/>
  </svg>
);
