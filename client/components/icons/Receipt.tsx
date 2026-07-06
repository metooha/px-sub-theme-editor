import { SVGProps } from 'react';

export const Receipt = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M26 2.035A3.5 3.5 0 0 1 30 5.5V14h-5v13a1 1 0 0 1-.293.707l-2 2a1 1 0 0 1-1.331.074l-1.93-1.544-2.391 1.595a1 1 0 0 1-1.11 0l-2.445-1.63-2.445 1.63a1 1 0 0 1-1.11 0l-2.391-1.595-1.929 1.544a1 1 0 0 1-1.332-.074l-2-2A1 1 0 0 1 2 27V7a5 5 0 0 1 5-5h19v.035ZM7 4a3 3 0 0 0-3 3v19.586l1.074 1.074 1.801-1.441a1 1 0 0 1 1.18-.051l2.445 1.63 2.445-1.63a1 1 0 0 1 1.11 0l2.445 1.63 2.445-1.63a1 1 0 0 1 1.18.05l1.8 1.442L23 26.586V5c0-.35.06-.687.17-1H7Zm13 16H7v-2h13v2Zm-4-5H7v-2h9v2ZM26.5 4A1.5 1.5 0 0 0 25 5.5V12h3V5.5A1.5 1.5 0 0 0 26.5 4ZM16 10H7V8h9v2Z"/>
  </svg>
);
