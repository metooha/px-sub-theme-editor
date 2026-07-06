import { SVGProps } from 'react';

export const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2a14 14 0 1 1 0 28 14 14 0 0 1 0-28Zm0 2a12 12 0 1 0 0 24.001A12 12 0 0 0 16 4Zm1 3v8.58l3.7 3.72-1.4 1.4-4-4a.939.939 0 0 1-.3-.7V7h2Z"/>
  </svg>
);
