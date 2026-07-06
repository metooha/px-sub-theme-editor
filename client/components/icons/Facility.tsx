import { SVGProps } from 'react';

export const Facility = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14.662 2.559a2 2 0 0 1 2.676 0l6.046 5.44H26a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-8v-8h-4v8H6a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4h2.616l6.046-5.44Zm-5.278 7.44H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6v-8h8v8h6a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-3.384L16 4.045 9.384 9.999Z"/>
  </svg>
);
