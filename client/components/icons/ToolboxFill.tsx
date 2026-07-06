import { SVGProps } from 'react';

export const ToolboxFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M10.176 10V7a3 3 0 0 1 3-3H19a3 3 0 0 1 3 3v3h6a2 2 0 0 1 2 2v5h-6v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2h-4v-2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H2v-5a2 2 0 0 1 2-2h6.176Zm2-3a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1v3h-7.824V7Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M2 19v7a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2v-7h-6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2h-4v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2H2Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M10 16v4h2v-4h-2Zm10 4v-4h2v4h-2Z" clipRule="evenodd"/>
  </svg>
);
