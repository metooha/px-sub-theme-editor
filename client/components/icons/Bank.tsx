import { SVGProps } from 'react';

export const Bank = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M28 7.882 16.447 2.106a1 1 0 0 0-.894 0L4 7.882v4h2v12H4v6h24v-6h-2v-12h2v-4Zm-2 18v2H6v-2h20ZM15.776 4.23a.5.5 0 0 1 .448 0L26 9.118v.764H6v-.764l9.776-4.888ZM15 11.882v12h-2.5v-12H15Zm2 0h2.5v12H17v-12Zm7 12h-2.5v-12H24v12Zm-16-12h2.5v12H8v-12Z" clipRule="evenodd"/>
  </svg>
);
