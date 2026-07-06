import { SVGProps } from 'react';

export const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 27.001a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-17h2v17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-17h2v17Zm5-3h-2v-12h2v12Zm4-12v12h-2v-12h2Zm4 12h-2v-12h2v12Zm1-22a1 1 0 0 1 1 1v3h5v2H4v-2h5v-3a1 1 0 0 1 1-1h12Zm-11 4h10v-2H11v2Z"/>
  </svg>
);
