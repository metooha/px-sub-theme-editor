import { SVGProps } from 'react';

export const ZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14.5 2.001c6.904 0 12.5 5.596 12.5 12.5 0 3.02-1.071 5.789-2.854 7.95l5.86 5.859-1.697 1.696-5.859-5.858A12.45 12.45 0 0 1 14.5 27C7.597 27 2 21.403 2 14.5 2 7.596 7.596 2 14.5 2Zm0 2.4C8.922 4.4 4.4 8.922 4.4 14.5s4.522 10.1 10.1 10.1c5.578 0 10.1-4.522 10.1-10.1 0-5.578-4.522-10.1-10.1-10.1Zm6 11.099-12 .001v-2l12-.001v2Z"/>
  </svg>
);
