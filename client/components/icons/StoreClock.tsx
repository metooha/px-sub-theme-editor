import { SVGProps } from 'react';

export const StoreClock = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m24.795 11.963 1.473 1.47-1.22 1.22-1.976-1.977V9.734h1.723v2.229Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M14.662 3.514a1.999 1.999 0 0 1 2.676 0l3.656 3.297-.096.06A5.964 5.964 0 0 1 24 6.001a6 6 0 0 1 6 6v12.993A4.003 4.003 0 0 1 26 29h-8v-8.014h-4V29H6c-2.209 0-4-1.793-4-4.006V12.973a4.004 4.004 0 0 1 4-4.008h2.617l6.045-5.451Zm-5.28 7.455H6c-1.104 0-2 .897-2 2.004v12.021c0 1.106.896 2.002 2 2.002h6v-8.013h8v8.013h6c1.104 0 2-.896 2-2.002v-8.531A5.97 5.97 0 0 1 24 18a6 6 0 0 1-6-6c0-1.56.463-2.83 1.44-3.896.043-.052-.046.05 0 0-.045.051-3.44-3.1-3.44-3.1l-6.617 5.965ZM24 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
  </svg>
);
