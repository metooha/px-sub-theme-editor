import { SVGProps } from 'react';

export const Clipboard = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M22.009 26h-12v-2h12v2Zm-.006-7.973v2L14.013 20v-2l7.99.027ZM12.013 20h-1.998v-2h1.998v2Zm9.99-5.973v2L14.013 16v-2l7.99.027ZM12.013 16h-1.998v-2h1.998v2Zm9.99-5.959v2l-7.99-.025v-2l7.99.025Zm-9.99 1.975h-1.998v-2h1.998v2Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M22.983 6a3 3 0 0 1 2.998 3l.02 18a3 3 0 0 1-2.998 3H9.017a3 3 0 0 1-2.998-3l-.02-18a3 3 0 0 1 2.998-3h.012V5a1 1 0 0 1 1-1h3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h3a1 1 0 0 1 1 1v1h-.026ZM16.01 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8.997 8A1 1 0 0 0 8 9l.018 18 .02.201a1 1 0 0 0 .98.799h13.986l.201-.02a1 1 0 0 0 .777-.779l.02-.201-.018-18c0-.483-.343-.887-.798-.98L22.983 8H8.997Z" clipRule="evenodd"/>
  </svg>
);
