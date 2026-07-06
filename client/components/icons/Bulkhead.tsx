import { SVGProps } from 'react';

export const Bulkhead = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M30 2H2v28h28V2Zm-2 13V4H17v12h1v-1h2v1h6v-1h2Zm-2 3h-6v1h-2v-1h-1v10h11v-9h-2v-1Zm-11-2V4H4v11h2v1h6v-1h2v1h1Zm-3 2v1h2v-1h1v10H4v-9h2v-1h6Z" clipRule="evenodd"/>
  </svg>
);
