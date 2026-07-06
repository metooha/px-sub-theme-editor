import { SVGProps } from 'react';

export const BarGraphThin = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M19.001 29.999h-6V14.003h6v15.996Zm-4-2h2V16.003h-2v11.996Zm-4.004 1.998H5v-20h5.998v20Zm-3.998-2h1.998v-16H7v16Zm20.002 2h-5.998V2.001H27v27.996Zm-3.998-2H25V4.001h-1.998v23.996Z" clipRule="evenodd"/>
  </svg>
);
