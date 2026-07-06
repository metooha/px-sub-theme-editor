import { SVGProps } from 'react';

export const HelpCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <circle 
      cx="10" 
      cy="10" 
      r="7.25" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.5 11.5 9 10.5 9.5C10.2239 9.64732 10 9.92157 10 10.25V11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <circle 
      cx="10" 
      cy="13.5" 
      r="0.75" 
      fill="currentColor"
    />
  </svg>
);
