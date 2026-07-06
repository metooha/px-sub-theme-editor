import { SVGProps } from 'react';

export const Printer = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M23 16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V17a1 1 0 0 1 1-1h14ZM10 28h12V18H10v10ZM23 2a1 1 0 0 1 1 1v5h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1v2H5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h3V6a1 1 0 0 1 .293-.707l3-3A1 1 0 0 1 12 2h11Zm-4 24h-6v-2h6v2Zm0-4h-6v-2h6v2ZM7 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3-5.586V8h12V4h-9.586L10 6.414Z"/>
  </svg>
);
