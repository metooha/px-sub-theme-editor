import { SVGProps } from 'react';

export const CreditCardFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M30 23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9h28v9ZM6 20h6v-2H6v2Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M27 6a3 3 0 0 1 3 3v3H2V9a3 3 0 0 1 3-3h22Z"/>
  </svg>
);
