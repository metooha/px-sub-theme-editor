import { SVGProps } from 'react';

export const ExclamationCircleFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm0 17.976c-.571 0-1.048.176-1.429.528-.38.352-.571.808-.571 1.368 0 .592.19 1.056.571 1.392.381.32.858.48 1.429.48.555 0 1.023-.16 1.404-.48.397-.336.596-.8.596-1.392 0-.56-.199-1.016-.596-1.368-.38-.352-.849-.528-1.404-.528ZM14.167 8.24l.571 10.152h2.548l.547-10.152h-3.666Z"/>
  </svg>
);
