import { SVGProps } from 'react';

export const AppSwitcher = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 26a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM4 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
  </svg>
);
