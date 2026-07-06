import { SVGProps } from 'react';

export const Tag = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M29.006 2.001a1 1 0 0 1 1 1v12c0 .265-.106.52-.293.707L16.42 29.001a2.001 2.001 0 0 1-2.83 0L3.007 18.415a2 2 0 0 1 0-2.83L16.299 2.294a1 1 0 0 1 .707-.292h12Zm-11.586 2-13 13 10.586 10.585 13-13V4H17.42Zm2.586 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
  </svg>
);
