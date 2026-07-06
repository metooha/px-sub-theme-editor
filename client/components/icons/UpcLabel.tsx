import { SVGProps } from 'react';

export const UpcLabel = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 10v8H6v-8h2Zm10 0v8h-4v-8h4Zm4 0v8h-2v-8h2Zm4 0v8h-2v-8h2Zm-14 0v8h-2v-8h2Zm14 13v-2H6v2h20Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M29 28a1.001 1.001 0 0 0 1-1V5a1.001 1.001 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h26ZM4 26V6h24v20H4Z" clipRule="evenodd"/>
  </svg>
);
