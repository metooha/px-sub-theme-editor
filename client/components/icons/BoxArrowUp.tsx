import { SVGProps } from 'react';

export const BoxArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M30 11v6h-2v-5H4v15h14v2H2V11l4-8h20l4 8ZM4.736 10H15V5H7.236l-2.5 5ZM17 10h10.264l-2.5-5H17v5Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M23.584 18.293a1 1 0 0 1 1.414 0L30 23.295l-.707.707-.709.707-3.291-3.293v6.613h-2v-6.615l-3.291 3.295-1.416-1.414 4.998-5.002ZM12 25.338H6v-2.994h6v2.994Z"/>
  </svg>
);
