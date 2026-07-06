import { SVGProps } from 'react';

export const ScanDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" fillRule="evenodd" d="M12 19.984c2.21 0 4 1.79 4 3.997v3.996h6a2 2 0 0 0 2-1.998v-5.995h2v5.995a3.998 3.998 0 0 1-4 3.997h-7.898a.044.044 0 0 0-.03.011.045.045 0 0 1-.062 0L6 21.983v-1.999h6Zm2 7.166v-3.17a2 2 0 0 0-2-1.997H8.828L14 27.15Z" clipRule="evenodd"/>
  <path fill="currentColor" d="M22 25.98h-4v-2h4v2Zm0-3.997h-4v-1.999h4v1.999Zm8-4.996H2v-1.998h28v1.998ZM22 2c2.21 0 4 1.79 4 3.997v5.994h-2V5.997a2 2 0 0 0-2-1.999H10a2 2 0 0 0-2 1.999v5.994H6V5.997A3.998 3.998 0 0 1 10 2h12Z"/>
  <path fill="currentColor" d="M22 11.991H10V9.993h12v1.998Zm0-3.996H10V5.997h12v1.998Z"/>
  </svg>
);
