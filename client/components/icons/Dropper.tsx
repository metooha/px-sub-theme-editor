import { SVGProps } from 'react';

export const Dropper = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 26a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M22.996 2.607c.81-.81 2.122-.81 2.932 0l1.465 1.465c.809.81.809 2.122 0 2.932L22.996 11.4l1.465 1.465-1.465 1.467-1.465-1.467-9.648 9.649-.139.1-4.119 2.94c-2.095 1.496-4.676-1.086-3.18-3.181l2.942-4.117.1-.139 9.646-9.648-1.465-1.465 1.465-1.467L18.6 7.004l4.396-4.397ZM9.072 19.461l-2.941 4.117c-.12.167.048.369.219.324l.07-.035 4.12-2.941 9.524-9.526L18.6 9.935l-9.528 9.526Z" clipRule="evenodd"/>
  </svg>
);
