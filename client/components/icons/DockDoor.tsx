import { SVGProps } from 'react';

export const DockDoor = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M28 28h2v2H2v-2h2V2h24v26ZM6 28h20v-4.5H6V28Zm0-11v4.5h20V17h-4v1a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-1H6Zm6-.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v1ZM6 15h4v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h4v-4.5H6V15Zm0-6.5h20V4H6v4.5Z" clipRule="evenodd"/>
  </svg>
);
