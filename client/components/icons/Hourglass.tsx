import { SVGProps } from 'react';

export const Hourglass = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M6 3.014C6 2.454 6.454 2 7.014 2h17.948a1.014 1.014 0 0 1 0 2.029h-.983v4.979L17.173 16l6.806 6.992v4.979h1.006a1.014 1.014 0 1 1 0 2.029H7.038a1.014 1.014 0 1 1 0-2.029h.96v-4.979L14.804 16 7.998 9.008V4.029h-.984C6.454 4.029 6 3.575 6 3.014ZM21.982 8V4.052H9.996V8h11.986Zm-10.193 2 4.2 4.315 4.2-4.315h-8.4Zm4.223 13.913 3.972 4.035h1.998v-4.105l-5.993-6.158-5.993 6.158v4.105h2.043l3.973-4.035Z" clipRule="evenodd"/>
  </svg>
);
