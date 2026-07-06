import { SVGProps } from 'react';

export const List = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 25v2H2v-2h2Zm26 2H6v-2h24v2ZM4 17H2v-2h2v2Zm26 0H6v-2h24v2ZM4 7H2V5h2v2Zm26 0H6V5h24v2Z"/>
  </svg>
);
