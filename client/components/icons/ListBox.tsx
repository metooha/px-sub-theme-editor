import { SVGProps } from 'react';

export const ListBox = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M10.005 23.974H8.006v-2h1.999v2ZM23.994 24l-11.99-.026v-2l11.99.026v2Zm-13.989-7.012H8.006v-2h1.999v2Zm13.989.027-11.99-.027v-2l11.99.027v2Zm-13.989-7.001H8.006v-2h1.999v2Zm13.989.026-11.99-.026v-2l11.99.027v2Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M24.975 2.003a2.999 2.999 0 0 1 2.998 3l.018 21.993c0 1.657-1.342 3-2.997 3H7.007a2.999 2.999 0 0 1-2.998-3L3.991 5.003a3 3 0 0 1 2.998-3h17.986Zm-17.986 2a1 1 0 0 0-1 1l.019 21.993.02.201a1 1 0 0 0 .979.8h17.986l.202-.02c.39-.08.698-.389.778-.78l.02-.2-.018-21.994a1 1 0 0 0-.799-.98l-.2-.02H6.988Z" clipRule="evenodd"/>
  </svg>
);
