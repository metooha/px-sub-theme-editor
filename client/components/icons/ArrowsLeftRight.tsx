import { SVGProps } from 'react';

export const ArrowsLeftRight = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m21.237 15.324 5.5 6a1 1 0 0 1 0 1.352l-5.5 6-1.474-1.352L23.727 23H5v-2h18.727l-3.964-4.324 1.474-1.352ZM8.273 11l3.964 4.324-1.474 1.352-5.5-6a1 1 0 0 1 0-1.352l5.5-6 1.474 1.352L8.273 9H27v2H8.273Z"/>
  </svg>
);
