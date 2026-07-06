import { SVGProps } from 'react';

export const Crop = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M7 2H5v3H2v2h3v17a3 3 0 0 0 3 3h17v3h2v-3h3v-2H8a1 1 0 0 1-1-1V2Z"/>
  <path fill="currentColor" d="M9 5v2h15a1 1 0 0 1 1 1v15h2V8a3 3 0 0 0-3-3H9Z"/>
  </svg>
);
