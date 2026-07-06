import { SVGProps } from 'react';

export const QrCode = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14 17.001a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1.002 1.002 0 0 1 1-1h10Zm11 0v2h2v-2h2v4h-2v2h2v4h-2v2h-2v-2h-2v2h-2v-2h-4v-4h2v-2h2v-4h4Zm-20 10h8v-8H5v8Zm16 0h2v-2h-2v2Zm4-4v4h2v-4h-2Zm-4-2v2h-2v2h2v-2h2v-2h-2Zm-10 4H7v-4h4v4Zm8-8v4h-2v-4h2Zm4 2v2h2v-2h-2Zm-9-16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1.002 1.002 0 0 1 1-1h10Zm14 0a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-10a1.002 1.002 0 0 1 1-1h10Zm-23 10h8v-8H5v8Zm14-8v8h8v-8h-8Zm-8 2v4H7v-4h4Zm14 0v4h-4v-4h4Z"/>
  </svg>
);
