import { SVGProps } from 'react';

export const Store = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M17.338 3.514a1.997 1.997 0 0 0-2.676 0l-6.046 5.45H6c-2.21 0-4 1.794-4 4.008v12.02A4.004 4.004 0 0 0 6 29h8v-8.014h4V29h8c2.21 0 4-1.794 4-4.007V12.972a4.004 4.004 0 0 0-4-4.007h-2.616l-6.046-5.451Zm-7.954 7.454L16 5.003l6.616 5.965H26c1.105 0 2 .897 2 2.004v12.02a2.002 2.002 0 0 1-2 2.004h-6v-8.014h-8v8.014H6c-1.105 0-2-.897-2-2.003V12.972c0-1.107.895-2.004 2-2.004h3.384Z"/>
  </svg>
);
