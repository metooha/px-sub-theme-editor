import { SVGProps } from 'react';

export const SignOut = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M13.5 2.5v2h-5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h5v2h-5a4 4 0 0 1-4-4v-18a4 4 0 0 1 4-4h5Zm15.707 12.293a1 1 0 0 1 0 1.414l-5 5-1.414-1.414 3.293-3.293H13.5v-2h12.586l-3.293-3.293 1.414-1.414 5 5Z"/>
  </svg>
);
