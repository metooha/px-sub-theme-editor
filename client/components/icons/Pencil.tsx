import { SVGProps } from 'react';

export const Pencil = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M21.703 2.293a1 1 0 0 1 1.415 0l6.589 6.589a1 1 0 0 1 0 1.415l-5.4 5.401-3.957-3.957-.002.002-2.633-2.633L4 22.825V28h5.174l11.563-11.563 1.414 1.416-11.855 11.855A1 1 0 0 1 9.59 30H3a1.001 1.001 0 0 1-1-1.001V22.41a1 1 0 0 1 .293-.707l19.41-19.41ZM19.13 7.695l5.175 5.175 3.28-3.28-5.175-5.175-3.28 3.28Z"/>
  </svg>
);
