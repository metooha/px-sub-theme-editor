import { SVGProps } from 'react';

export const UserPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001a7 7 0 0 1 3.607 13H21a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5h-9a6 6 0 0 0-6 6v5h12v2H6a2 2 0 0 1-2-2v-5a8 8 0 0 1 8-8h.393a7 7 0 0 1 3.607-13Zm8 23h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3Zm-8-21a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/>
  </svg>
);
