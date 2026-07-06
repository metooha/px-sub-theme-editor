import { SVGProps } from 'react';

export const Refresh = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001a13.95 13.95 0 0 1 9 3.275v-3.26h2v6a1 1 0 0 1-1 1h-6v-2h3.954A11.952 11.952 0 0 0 16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12h2c0 7.732-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2Z"/>
  </svg>
);
