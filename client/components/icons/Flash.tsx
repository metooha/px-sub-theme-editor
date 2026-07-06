import { SVGProps } from 'react';

export const Flash = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M22 2.001a1 1 0 0 1 .874 1.485l-4.175 7.515H26a1 1 0 0 1 .771 1.635l-14 17a1 1 0 0 1-1.694-1.02L15.5 18.001H6a1.001 1.001 0 0 1-.868-1.497l8-14A1 1 0 0 1 14 2h8Zm-14.277 14H17a1 1 0 0 1 .923 1.384l-2.403 5.77L23.88 13H17a1.001 1.001 0 0 1-.874-1.486L20.301 4h-5.72L7.723 16Z"/>
  </svg>
);
