import { SVGProps } from 'react';

export const SuitcaseFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M12.013 24a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1h10v2a4 4 0 0 1-4 4h-20a4 4 0 0 1-4-4v-2h10v1Zm6-1h-4v-4h4v4Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M18.013 3c1.66 0 3 1.34 3 3v3h5a4 4 0 0 1 4 4v8h-10v-3a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v3h-10v-8a4 4 0 0 1 4-4h5V6c0-1.66 1.34-3 3-3h4Zm-4 2c-.56 0-1 .44-1 1v3h6V6c0-.56-.44-1-1-1h-4Z" clipRule="evenodd"/>
  </svg>
);
