import { SVGProps } from 'react';

export const ListBoxFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M25 2a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h18ZM12 23.973 24 24v-2.002l-12-.027v2.002ZM8 21.97v2.002h2V21.97H8Zm4-4.989 12 .026v-2l-12-.027v2.001ZM8 14.98v2.002h2V14.98H8Zm4-4.978 12 .027V8.027L12 8v2.002ZM8 8v2.002h2V8H8Z"/>
  </svg>
);
