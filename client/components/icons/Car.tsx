import { SVGProps } from 'react';

export const Car = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M29 13a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H10v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1-1-1V14a1 1 0 0 1 1-1h26ZM5 28h3v-2H5v2Zm19 0h3v-2h-3v2ZM4 24h24v-9H4v9Zm4.5-7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm15 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM19 20.5h-6v-2h6v2ZM24.19 2a2 2 0 0 1 1.94 1.515l1.81 7.243-1.94.484L24.19 4H7.75l-1.81 7.242L4 10.758l1.81-7.243A2 2 0 0 1 7.752 2H24.19Z"/>
  </svg>
);
