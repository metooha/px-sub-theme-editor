import { SVGProps } from 'react';

export const Columns = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M30 28H2V4h28v24ZM4 26h6V6H4v20Zm18 0h6V6h-6v20Zm-10 0h8V6h-8v20Z" clipRule="evenodd"/>
  </svg>
);
