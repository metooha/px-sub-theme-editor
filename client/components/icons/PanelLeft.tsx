import { SVGProps } from 'react';

export const PanelLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <rect 
      x="3" 
      y="3" 
      width="14" 
      height="14" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M8 3V17" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
  </svg>
);
