import { SVGProps } from 'react';

export const LineGraphXY = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M6 22.988a194.653 194.653 0 0 1 2.37-3.814 604.658 604.658 0 0 1 4.232-6.563l.498-.76 7.824 4.12 5.066-8.303.856.521.853.522-5.556 9.103-.489.803-7.875-4.148a593.8 593.8 0 0 0-3.72 5.777A197.932 197.932 0 0 0 7.727 24H28v2H4V6h2v16.988Z"/>
  </svg>
);
