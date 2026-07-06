import { SVGProps } from 'react';

export const Building = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="m16 2 14 6.396V30h-7v-3.979H9V30H2V8.396L16 2Zm7 20.036v1.985H9v-1.985h14Zm0-2v-1.993H9v1.993h14Zm5-10.361L16 4.192 4 9.672v18.335h3V16.05h18v11.957h3V9.675Z" clipRule="evenodd"/>
  </svg>
);
