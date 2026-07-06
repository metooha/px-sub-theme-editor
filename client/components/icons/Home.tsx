import { SVGProps } from 'react';

export const Home = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M6.001 28.024h6v-5a4 4 0 0 1 8 0v5h6v-12h2v12a2 2 0 0 1-2 2h-8v-7a2 2 0 0 0-4 0v7h-8a2 2 0 0 1-2-2v-12h2v12Zm8.758-25.591a2 2 0 0 1 2.484 0l12.38 9.807-1.243 1.569L16 4 3.622 13.809 2.38 12.24l12.379-9.807Z"/>
  </svg>
);
