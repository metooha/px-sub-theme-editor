import { SVGProps } from 'react';

export const Toolbox = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M10 10V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3h5a3 3 0 0 1 3 3v6h-6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2h-4v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2H2v-6a3 3 0 0 1 3-3h5Zm2-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3h-8V7Zm-8 6a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v4h-4v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2h-4v-2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4v-4Zm6 3v4h2v-4h-2Zm10 4v-4h2v4h-2Z" clipRule="evenodd"/>
  <path fill="currentColor" fillRule="evenodd" d="M2 21v4a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-4h-2v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4H2Z" clipRule="evenodd"/>
  </svg>
);
