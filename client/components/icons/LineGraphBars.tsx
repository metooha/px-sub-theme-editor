import { SVGProps } from 'react';

export const LineGraphBars = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M7.958 30h-2V20h2v10Zm6 0h-2V14h2v16Zm6 0h-2V18h2v12Zm6 0h-2V12h2v18Z"/>
  <path fill="currentColor" d="m28 3.25-7.855 10.016-6.041-5.036-8.608 9.53L4 16.432l9.896-10.977 5.96 4.967L26.436 2 28 3.25Z"/>
  </svg>
);
