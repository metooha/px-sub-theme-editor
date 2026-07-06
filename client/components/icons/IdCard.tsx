import { SVGProps } from 'react';

export const IdCard = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M28 6.001a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-1.999h24Zm-24 2v18h24v-18H4Zm8 2.985a4 4 0 0 1 2.142 7.378A6.004 6.004 0 0 1 18 23.972h-2a4 4 0 1 0-8 0H6a6.004 6.004 0 0 1 3.858-5.608A4 4 0 0 1 12 10.986Zm11 7.015h-4v-2h4v2Zm-11-5.015a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm13 1.015h-6v-2h6v2Z"/>
  </svg>
);
