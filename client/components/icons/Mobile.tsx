import { SVGProps } from 'react';

export const Mobile = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M22 2a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h12ZM10 4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H10Zm9 22h-6v-2h6v2Z"/>
  </svg>
);
