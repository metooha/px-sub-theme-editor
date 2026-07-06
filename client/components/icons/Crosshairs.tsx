import { SVGProps } from 'react';

export const Crosshairs = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14 28h-2v-8H4v-2h10v10Zm14-10v2h-8v8h-2V18h10Zm-14-4H4v-2h8V4h2v10Zm6-2h8v2H18V4h2v8Z"/>
  </svg>
);
