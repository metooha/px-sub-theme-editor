import { SVGProps } from 'react';

export const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M5 6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-6h-2v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h26V9a3 3 0 0 0-3-3H5Zm23 6H4V9a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v3Z"/>
  <path fill="currentColor" d="M7 20h6v-2H7v2Z"/>
  </svg>
);
