import { SVGProps } from 'react';

export const BarGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M20 29.999h-7.998V14.003H20v15.996Zm-5.998-2H18V16.003h-3.998v11.996Zm-4.004 1.998H2v-20h7.998v20Zm-5.998-2h3.998v-16H4v16Zm26 2h-7.998V2.001H30v27.996Zm-5.998-2H28V4.001h-3.998v23.996Z" clipRule="evenodd"/>
  </svg>
);
