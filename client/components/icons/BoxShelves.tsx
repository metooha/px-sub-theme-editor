import { SVGProps } from 'react';

export const BoxShelves = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M4 30v-2h24v2h2V2h-2v10H17V2H6v10H4V2H2v28h2Zm6.5-26H7.833v8h7.334V4H12.5v2h-2V4ZM28 14v12h-2V16H6v10H4V14h24Zm-8.5 4h-2.59v8H24v-8h-2.5v2h-2v-2Zm-9 2v-2H7.818v8h7.273v-8H12.5v2h-2Z" clipRule="evenodd"/>
  </svg>
);
