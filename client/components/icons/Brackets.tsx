import { SVGProps } from 'react';

export const Brackets = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m12.334 8 .691.72L5.443 16l7.582 7.28-.691.72-.693.72L2.557 16l9.084-8.72.693.72Zm17.11 8-9.085 8.72-.693-.72-.691-.72 7.58-7.28-7.58-7.28.691-.72.693-.72L29.443 16Z"/>
  </svg>
);
