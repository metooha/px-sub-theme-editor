import { SVGProps } from 'react';

export const CheckCircleFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm-3 17.303-3.151-3.152L8.15 17.85l4 4a1.2 1.2 0 0 0 1.698 0l10-10-1.698-1.697L13 19.304Z"/>
  </svg>
);
