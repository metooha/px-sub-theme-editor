import { SVGProps } from 'react';

export const History = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16l2 .001c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12c-4.344 0-8.15 2.308-10.256 5.766L9 9.766v2H3a1 1 0 0 1-1-1V4.999h2v3.787a13.992 13.992 0 0 1 12-6.784Zm.117 6v8.34l6.394 2.74-.787 1.839-7.607-3.26V8.001h2Z"/>
  </svg>
);
