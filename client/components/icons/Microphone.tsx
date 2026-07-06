import { SVGProps } from 'react';

export const Microphone = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M9 16.001a7 7 0 0 0 14 0h2a9 9 0 0 1-8 8.944v3.056h4v2H11v-2h4v-3.056a9 9 0 0 1-8-8.944h2Zm7-14a5 5 0 0 1 5 5v9a5 5 0 0 1-10 0v-9a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v9a3 3 0 0 0 6 0v-9a3 3 0 0 0-3-3Z"/>
  </svg>
);
