import { SVGProps } from 'react';

export const PalletBoxes = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="m22 4-.001 10H27v10h3v4h-4v-2h-8v2h-4v-2H6v2H2v-4h3V14h4.999L10 4h12Zm-2 12h-3v8h8v-8h-3v2h-2v-2Zm-10 0H7v8h8v-8h-3v2h-2v-2Zm5-10h-3v8h8V6h-3v2h-2V6Z" clipRule="evenodd"/>
  </svg>
);
