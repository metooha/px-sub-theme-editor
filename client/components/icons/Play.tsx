import { SVGProps } from 'react';

export const Play = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M8 8.504c0-1.906 2.048-3.111 3.714-2.186l13.411 7.45c1.715.953 1.715 3.42 0 4.372l-13.411 7.45C10.048 26.515 8 25.31 8 23.405V8.504Zm2.743-.438a.5.5 0 0 0-.743.438v14.901a.5.5 0 0 0 .743.437l13.411-7.45a.5.5 0 0 0 0-.874l-13.41-7.452Z"/>
  </svg>
);
