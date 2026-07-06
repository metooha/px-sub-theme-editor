import { SVGProps } from 'react';

export const LinkExternal = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M18 4.001H4v24h24v-14h2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-24a2 2 0 0 1 2-2h14v2Zm11-2a1 1 0 0 1 1 1v7h-2V5.415L17.707 15.708l-1.414-1.414L26.586 4H22V2h7Z"/>
  </svg>
);
