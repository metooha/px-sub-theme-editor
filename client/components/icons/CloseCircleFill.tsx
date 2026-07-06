import { SVGProps } from 'react';

export const CloseCircleFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm0 12.585L9.707 8.294 8.293 9.708l6.293 6.293-6.293 6.293 1.414 1.414L16 17.415l6.324 6.324 1.414-1.414-6.324-6.324 6.293-6.293-1.414-1.414L16 14.586Z"/>
  </svg>
);
