import { SVGProps } from 'react';

export const Table = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M30 30H2V2h28v28ZM4 28h6.6v-4.148H4V28Zm8.6 0h6.8v-4.148h-6.8V28Zm8.8 0H28v-4.148h-6.6V28ZM4 21.852h6.6v-3.914H4v3.914Zm8.6 0h6.8v-3.914h-6.8v3.914Zm8.8 0H28v-3.914h-6.6v3.914ZM4 15.938h6.6v-3.914H4v3.914Zm8.6 0h6.8v-3.914h-6.8v3.914Zm8.8 0H28v-3.914h-6.6v3.914ZM4 10.024h24V4H4v6.024Z" clipRule="evenodd"/>
  </svg>
);
