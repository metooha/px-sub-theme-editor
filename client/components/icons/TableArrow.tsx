import { SVGProps } from 'react';

export const TableArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M20 4.074H4v7.852h26v18H2V2.074h18v2ZM4 27.926h4.5v-3.5H4v3.5Zm6.5 0H15v-3.5h-4.5v3.5Zm6.5 0h4.5v-3.5H17v3.5Zm6.5 0H28v-3.5h-4.5v3.5ZM4 22.426h4.5v-3H4v3Zm6.5 0H15v-3h-4.5v3Zm6.5 0h4.5v-3H17v3Zm6.5 0H28v-3h-4.5v3Zm-19.5-5h4.5v-3.5H4v3.5Zm6.5 0H15v-3.5h-4.5v3.5Zm6.5 0h4.5v-3.5H17v3.5Zm6.5 0H28v-3.5h-4.5v3.5Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M28 2.074a2 2 0 0 1 2 2v5h-2V5.488l-4 4-1.414-1.414 4-4H23v-2h5Z"/>
  </svg>
);
