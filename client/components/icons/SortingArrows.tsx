import { SVGProps } from 'react';

export const SortingArrows = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M16 30 6.2 18.8h19.6L16 30Zm0-4.25 3.629-4.148h-7.26L16 25.75Zm9.8-12.55H6.202L16 2l9.8 11.2Zm-13.429-2.802h7.262L16 6.248l-3.629 4.15Z" clipRule="evenodd"/>
  </svg>
);
