import { SVGProps } from 'react';

export const BoxOpenArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M3.999 26a1 1 0 0 0 1 1h21.996a1 1 0 0 0 1-1V13.01h2V26a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13.008h2V26Z"/>
  <path fill="currentColor" d="m30.001 4.996-12.961.012-.045 12.584 3.297-3.274 1.426 1.41-4.96 4.956c-.43.429-.992.416-1.411-.002L10.4 15.729l1.399-1.41 3.195 3.189V4.012c.003-.55.45-.996 1-.996L30.001 3v1.996Z"/>
  </svg>
);
