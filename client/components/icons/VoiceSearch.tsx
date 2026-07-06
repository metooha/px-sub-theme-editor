import { SVGProps } from 'react';

export const VoiceSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M22 27h-2V5h2v22ZM10 7v18H8V7h2Zm18 16h-2V9h2v14ZM16 10v12h-2V10h2ZM6 13v6H4v-6h2Z"/>
  </svg>
);
