import { SVGProps } from 'react';

export const Forklift = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M18 15.39V7h2v15h10v2H19.87A3.997 3.997 0 0 1 16 27a3.997 3.997 0 0 1-3.87-3H9.87A3.997 3.997 0 0 1 2 23l.002-.037L2 5h10l6 10.39ZM16 21a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 21a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2.002-1.46A3.997 3.997 0 0 1 9.87 22h2.262A3.997 3.997 0 0 1 16 19c.73 0 1.411.198 2 .54v-.15L16.62 17H3.997v2.54Zm0-4.54h11.467l-4.62-8H3.999v8Z" clipRule="evenodd"/>
  </svg>
);
