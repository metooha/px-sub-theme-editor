import { SVGProps } from 'react';

export const FactoryFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M19.5 11.624V5.5L9 11.624V2H2v28h28V5.5l-10.5 6.124Z" clipRule="evenodd"/>
  </svg>
);
