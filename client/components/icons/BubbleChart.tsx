import { SVGProps } from 'react';

export const BubbleChart = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M26.02 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Zm-7 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm-5 4a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-9 0a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm15.71 2a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm0 2a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5Z" clipRule="evenodd"/>
  </svg>
);
