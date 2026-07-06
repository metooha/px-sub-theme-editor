import { SVGProps } from 'react';

export const ArrowsUpDownLine = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M5 23.501a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-4h2v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4.002h2v4.002Zm7.006-8.416 3.293-3.293 1.414 1.414L12.42 17.5a2 2 0 0 1-2.828 0l-4.293-4.293 1.414-1.414 3.293 3.293V5.499h2v9.586Zm9-9a2 2 0 0 1 2.828 0l4.293 4.293-1.414 1.414-3.293-3.293v9.586h-2V8.499l-3.293 3.293-1.414-1.414 4.293-4.293Z"/>
  </svg>
);
