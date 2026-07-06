import { SVGProps } from 'react';

export const Image = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M21.35 14.241a.999.999 0 0 1 1.3 0l7 6A1 1 0 0 1 30 21v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4a1 1 0 0 1 .36-.769l6-5a1 1 0 0 1 1.087-.126l5.407 2.704 6.496-5.568Zm-5.7 7.518a1 1 0 0 1-1.097.136l-5.415-2.709L4 23.47V27a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-5.54l-6-5.143-6.35 5.442ZM27 2a3 3 0 0 1 3 3v11h-2V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v11H2V5a3 3 0 0 1 3-3h22ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
  </svg>
);
