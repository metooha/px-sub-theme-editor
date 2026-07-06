import { SVGProps } from 'react';

export const BoxDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M27 25h-6v-2h6v2Zm0-4h-6v-2h6v2Zm-16 3.338H5v-2.994h6v2.994Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M29 10v4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2H1V10l4-8h20l4 8Zm-9.6 6a.4.4 0 0 0-.4.4v11.2c0 .22.18.4.4.4h9.2a.4.4 0 0 0 .4-.4V16.4a.4.4 0 0 0-.4-.4h-9.2ZM3 26h14V16a2 2 0 0 1 2-2h8v-3H3v15Zm.736-17H14V4H6.236l-2.5 5ZM16 9h10.264l-2.5-5H16v5Z" clipRule="evenodd"/>
  </svg>
);
