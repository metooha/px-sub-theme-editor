import { SVGProps } from 'react';

export const FuelPump = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M6 4h14v22h2V12.17c1.165.412 2 1.523 2 2.83v8a3 3 0 0 0 6 0V10.35a2 2 0 0 0-.438-1.25L25.78 4.376l-1.562 1.25L28 10.35V23a1 1 0 0 1-2 0v-8a5.002 5.002 0 0 0-4-4.9V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v22h2V4Z"/>
  <path fill="currentColor" d="M8 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7Zm2 7h6V8h-6v6ZM2 30h22v-2H2v2Z"/>
  </svg>
);
