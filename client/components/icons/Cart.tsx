import { SVGProps } from 'react';

export const Cart = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M5.701 4H2v2h3.256l2.786 9.287 1.916-.574L7.943 8h19.91l-1.575 7.085-15.881 1.765a2.583 2.583 0 0 0 .285 5.15H27v-2H10.682a.583.583 0 0 1-.064-1.163l16.307-1.811a1.4 1.4 0 0 0 1.212-1.088l1.83-8.234A1.4 1.4 0 0 0 28.601 6H7.343l-.3-1.002A1.4 1.4 0 0 0 5.7 4Zm6.298 24a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
  </svg>
);
