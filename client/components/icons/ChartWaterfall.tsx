import { SVGProps } from 'react';

export const ChartWaterfall = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 30H6V10h2v20Zm18 0h-2V20h2v10Zm-6-10h-2V10h2v10Zm-6-10h-2V2h2v8Z"/>
  </svg>
);
