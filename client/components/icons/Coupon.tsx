import { SVGProps } from 'react';

export const Coupon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M11 19H9v-6h2v6Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M30 26H2v-5.594C3.244 19.231 4 17.69 4 16c0-1.69-.756-3.233-2-4.408V6h28v20ZM4 10.793C5.228 12.21 6 14.006 6 16l-.012.432C5.886 18.253 5.137 19.89 4 21.203V24h5v-3h2v3h17V8H11v3H9V8H4v2.793Z" clipRule="evenodd"/>
  </svg>
);
