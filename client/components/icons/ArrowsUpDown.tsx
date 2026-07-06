import { SVGProps } from 'react';

export const ArrowsUpDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m15.324 10.763 6-5.5a1 1 0 0 1 1.352 0l6 5.5-1.352 1.474L23 8.273V27h-2V8.273l-4.324 3.964-1.352-1.474ZM11 23.727l4.324-3.964 1.352 1.474-6 5.5a1 1 0 0 1-1.352 0l-6-5.5 1.352-1.474L9 23.727V5h2v18.727Z"/>
  </svg>
);
