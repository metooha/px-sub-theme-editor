import { SVGProps } from 'react';

export const ScatterChart = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M8 26a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12-8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-8-2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm24-2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" clipRule="evenodd"/>
  </svg>
);
