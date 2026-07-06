import { SVGProps } from 'react';

export const RulerArrowFill = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="m22 30 8-8L10 2l-8 8 20 20ZM13.19 7.856l-2.22 2.224-1.43-1.43 2.222-2.223 1.428 1.428Zm-.904 7.097-1.429-1.429 4-4 1.43 1.428-4 4Zm7.094-.907-2.22 2.224-1.43-1.428 2.222-2.224 1.428 1.428Zm-.903 7.097-1.428-1.428 3.999-4.001 1.428 1.428-4 4.001Zm4.873 1.318-1.428-1.429 2.222-2.223 1.427 1.429-2.221 2.223ZM19 2h5v2h-2.586L28 10.586V8h2v5a1 1 0 0 1-1 1h-5v-2h2.586L20 5.414V8h-2V3a1 1 0 0 1 1-1Z"/>
  </svg>
);
