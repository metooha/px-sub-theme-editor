import { SVGProps } from 'react';

export const PencilBox = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="m29.805 6.132-3.938-3.938a.661.661 0 0 0-.935 0l-12.74 12.74A.661.661 0 0 0 12 15.4V20h4.6c.174 0 .343-.07.467-.194l12.74-12.74a.66.66 0 0 0 0-.935Zm-15.807 9.822 9.095-9.096 2.046 2.046L16.042 18h-2.044v-2.046ZM24.51 5.444l.891-.89 2.044 2.044-.891.89-2.044-2.044Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M8.999 2a7 7 0 0 0-7 7v14a7 7 0 0 0 7 7h14a7 7 0 0 0 7-7V13h-2v10a5 5 0 0 1-5 5h-14a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5h10V2h-10Z"/>
  </svg>
);
