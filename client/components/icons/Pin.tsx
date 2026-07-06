import { SVGProps } from 'react';

export const Pin = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="m30 14.594-1.414 1.414-1.59-1.591-6.065 6.063-1 5.998L17 29.41l-6.5-6.497L3.414 30 2 28.587 9.087 21.5 2.59 15.002l2.932-2.932 5.998-1 6.064-6.063-1.593-1.594L17.405 2 30 14.594Zm-17.52-1.657-5.997 1-1.066 1.065 11.582 11.582 1.066-1.067 1-5.997 6.517-6.517-6.584-6.583-6.517 6.517Z" clipRule="evenodd"/>
  </svg>
);
