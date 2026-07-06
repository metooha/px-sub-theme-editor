import { SVGProps } from 'react';

export const ChatBubbleSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 10h16V8H8v2Zm16 5H8v-2h16v2ZM8 20h11v-2H8v2Z"/>
  <path fill="currentColor" d="M7 2a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h16.65l4.725 3.78A1 1 0 0 0 30 29V7a5 5 0 0 0-5-5H7ZM4 7a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v19.92l-3.375-2.701a1 1 0 0 0-.625-.22H7a3 3 0 0 1-3-3V7Z"/>
  </svg>
);
