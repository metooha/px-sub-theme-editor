import { SVGProps } from 'react';

export const LineGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M29.154 1.947 30 2.48l-7.11 11.229-4.147 15.844a.5.5 0 0 1-.891.164L10.06 18.805 3.688 28.71l-.844-.537L2 27.634l7.569-11.78a.5.5 0 0 1 .827-.02l7.222 10.115 3.38-12.898.04-.15.082-.131 7.186-11.356.848.533Z"/>
  </svg>
);
