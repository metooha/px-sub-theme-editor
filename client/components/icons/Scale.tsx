import { SVGProps } from 'react';

export const Scale = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4.44 28h23.12l-2.394-11.972h2.04l2.556 12.777A1.001 1.001 0 0 1 28.779 30H3.221a1.001 1.001 0 0 1-.983-1.195l2.557-12.777h2.039L4.439 28Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M16 14a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 4 4 3.98 3.98 0 0 0-.559-2.03l-2.734 2.737-1.414-1.414 2.734-2.736A3.975 3.975 0 0 0 16 16Z" clipRule="evenodd"/>
  <path fill="currentColor" fillRule="evenodd" d="M29 2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H18v2h8l.805 4.028h-2.037L24.36 12H7.64l-.407 2.028H5.195L6 10h8V8H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h26ZM4 6h24V4H4v2Z" clipRule="evenodd"/>
  </svg>
);
