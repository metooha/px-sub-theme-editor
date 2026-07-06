import { SVGProps } from 'react';

export const Suitcase = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 24.927c0 1.101.895 1.994 2 1.994h20c1.105 0 2-.892 2-1.994v-.994h2v1.08A3.994 3.994 0 0 1 26 29H6c-2.209 0-4-1.785-4-3.987v-1.08h2v.994Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M18 3c1.66 0 3 1.336 3 2.99v2.887h5c2.21 0 4 1.785 4 3.987v9.056H20v2.003a1 1 0 0 1-1 .997h-6a1 1 0 0 1-1-.997V21.92H2v-9.056a3.993 3.993 0 0 1 4-3.987h5V5.99C11 4.336 12.34 3 14 3h4Zm-4 19.926 4.006.008v-3.987H14v3.98ZM6 10.974c-1.105 0-2 .892-2 1.993v6.96h8v-1.984a1 1 0 0 1 1-.997h6c.552 0 1 .446 1 .997v1.983h8v-6.959a1.997 1.997 0 0 0-2-1.993H6Zm8-5.98c-.56 0-1 .438-1 .996v2.887h6V5.99a.989.989 0 0 0-1-.997h-4Z" clipRule="evenodd"/>
  </svg>
);
