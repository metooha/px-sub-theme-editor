import { SVGProps } from 'react';

export const TagFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M21.442 10.585a2 2 0 1 1-2.829 2.829 2 2 0 0 1 2.829-2.829Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M29 2a1 1 0 0 1 .993.883L30 3v12a1 1 0 0 1-.206.607l-.087.1-14 14a1 1 0 0 1-1.32.083l-.094-.083-12-12a1 1 0 0 1-.083-1.32l.083-.095 14-14a1 1 0 0 1 .576-.284L17 2h12Zm-6.144 12.828a4 4 0 1 0-5.657-5.657 4 4 0 0 0 5.657 5.657Z" clipRule="evenodd"/>
  </svg>
);
