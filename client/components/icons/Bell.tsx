import { SVGProps } from 'react';

export const Bell = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M13 25a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0h2Zm4-23v2.05c5.053.502 9 4.765 9 9.95v4.86c0 .174.063.343.177.476l2.583 3.014A1 1 0 0 1 28 24H4a1 1 0 0 1-.759-1.65l2.583-3.014A.732.732 0 0 0 6 18.859V14c0-5.185 3.947-9.448 9-9.95V2h2Zm-1 4a8 8 0 0 0-8 8v4.86c0 .652-.233 1.282-.657 1.778L6.175 22h19.651l-1.168-1.362A2.734 2.734 0 0 1 24 18.859V14a8 8 0 0 0-8-8Z"/>
  </svg>
);
