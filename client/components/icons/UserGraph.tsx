import { SVGProps } from 'react';

export const UserGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m22.176 25.468 1.418-2.137H29v2h-4.332l-2.732 4.125-4.05-8.093-3.349 3.968H10.12v-2h3.49l4.71-5.576 3.857 7.713Z"/>
  <path fill="currentColor" d="M14 17.544c.648 0 1.29.06 1.92.172l-1.557 1.836A9 9 0 0 0 5 28.544H3a10.999 10.999 0 0 1 11-11Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M14 2.544a7 7 0 1 1-.001 13.999A7 7 0 0 1 14 2.544Zm.975 2.096A5.003 5.003 0 0 0 9 9.544a5 5 0 1 0 5.975-4.904Z" clipRule="evenodd"/>
  </svg>
);
