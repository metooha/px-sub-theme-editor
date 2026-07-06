import { SVGProps } from 'react';

export const Note = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M18 4H4v16h7a1 1 0 0 1 1 1v7h16V14h2v14a2 2 0 0 1-2 2H11.414A2 2 0 0 1 10 29.414L2.586 22A2 2 0 0 1 2 20.586V4a2 2 0 0 1 2-2h14v2Zm-8 22.586V22H5.414L10 26.586ZM24.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-10 10A1 1 0 0 1 19 18h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l10-10ZM10 16H6v-2h4v2Zm6-2.586V16h2.586l6-6L22 7.414l-6 6ZM12 12H6v-2h6v2Zm11.414-6L26 8.586 27.586 7 25 4.414 23.414 6ZM14 6v2H6V6h8Z"/>
  </svg>
);
