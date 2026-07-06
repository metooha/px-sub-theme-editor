import { SVGProps } from 'react';

export const Factory = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M19.5 5.5v6.125L30 5.501V30H2V2h7v9.624L19.5 5.5Zm-1.77 3.196v6.27L28 8.969V28H4V4.019h3.295v10.947l10.435-6.27Z" clipRule="evenodd"/>
  </svg>
);
