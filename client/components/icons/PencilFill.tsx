import { SVGProps } from 'react';

export const PencilFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M21.703 2.293a1 1 0 0 1 1.414 0l6.59 6.59a1 1 0 0 1 0 1.414l-19.41 19.41A1.001 1.001 0 0 1 9.59 30H3a1 1 0 0 1-1-1v-6.59a1 1 0 0 1 .293-.707l19.41-19.41Zm-2.574 5.4 5.174 5.176 3.281-3.281-5.174-5.174-3.281 3.28Z" clipRule="evenodd"/>
  </svg>
);
