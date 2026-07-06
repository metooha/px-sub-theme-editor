import { SVGProps } from 'react';

export const ImageFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M30 22.598v4.601A2.8 2.8 0 0 1 27.2 30H4.8A2.801 2.801 0 0 1 2 27.2v-4.555l6.174-5.086 5.385 2.734.597.305.508-.438 6.32-5.457L30 22.598ZM9 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M27.2 2C28.745 2 30 3.254 30 4.8v15.147l-9.025-7.877-7.11 6.135-5.369-2.724-.582-.297L2 20.054V4.802A2.8 2.8 0 0 1 4.8 2h22.4ZM9 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
  </svg>
);
