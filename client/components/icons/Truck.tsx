import { SVGProps } from 'react';

export const Truck = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M18 6.001A2 2 0 0 1 20 8v1h1.504c.625 0 1.214.293 1.593.79l3.2 4.21H28a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2.126a4.002 4.002 0 0 1-7.748.001h-4.252A4.002 4.002 0 0 1 6.126 23H4a2 2 0 0 1-2-2V8.001a2 2 0 0 1 2-2h14Zm-8 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 21h2.126a4.001 4.001 0 0 1 7.748.001h4.252A4.002 4.002 0 0 1 25.874 21H28v-5h-1.703a2 2 0 0 1-1.593-.79l-3.2-4.21H20v5.001h-2v-8H4V21Z"/>
  </svg>
);
