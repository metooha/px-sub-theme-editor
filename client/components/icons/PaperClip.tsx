import { SVGProps } from 'react';

export const PaperClip = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M21.09 23c0 2.897-2.277 5.09-5.09 5.09A5.09 5.09 0 0 1 10.91 23V7.09a3.183 3.183 0 0 1 6.363 0v15.688c0 .7-.573 1.273-1.273 1.273s-1.273-.573-1.273-1.273V8.009h-1.909v14.769a3.183 3.183 0 0 0 6.364 0V7.09A5.09 5.09 0 0 0 14.09 2 5.09 5.09 0 0 0 9 7.09V23c0 3.87 3.13 7 7 7s7-3.13 7-7V8.01h-1.91V23Z" clipRule="evenodd"/>
  </svg>
);
