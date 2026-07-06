import { SVGProps } from 'react';

export const LightBulb = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M19.377 28a2 2 0 0 1-2 2h-2.754a2 2 0 0 1-2-2h6.754Zm.123-3a1 1 0 1 1 0 2h-7a1 1 0 1 1 0-2h7Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M16 2c5.523 0 10 4.477 10 10 0 3.7-2.012 6.929-5 8.658v2.301a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-2.3A9.993 9.993 0 0 1 6 12C6 6.477 10.477 2 16 2Zm0 2a8 8 0 0 0-5 14.242c1.241.996 1.988 1.352 2 1.358v2.183a.3.3 0 0 0 .3.299H15V18.35a6 6 0 0 1-4.041-2.668l1.732-1a3.995 3.995 0 0 0 6.567.066l1.738 1.004A5.998 5.998 0 0 1 17 18.348v3.734h1.7a.3.3 0 0 0 .3-.299V19.6a16.92 16.92 0 0 0 2-1.358A8 8 0 0 0 16 4Z" clipRule="evenodd"/>
  </svg>
);
