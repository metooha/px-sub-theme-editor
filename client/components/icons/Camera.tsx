import { SVGProps } from 'react';

export const Camera = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M18.5 4.001a3 3 0 0 1 2.4 1.2L23 8h4a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h4l2.1-2.8A3 3 0 0 1 13.5 4h5Zm-5 2a1 1 0 0 0-.8.4L10 10H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1h-5l-2.7-3.6a1 1 0 0 0-.8-.4h-5Zm2.5 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
  </svg>
);
