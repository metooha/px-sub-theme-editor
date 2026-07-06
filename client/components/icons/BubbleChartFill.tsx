import { SVGProps } from 'react';

export const BubbleChartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M20.73 13a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5ZM8.52 5.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm13-3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" clipRule="evenodd"/>
  </svg>
);
