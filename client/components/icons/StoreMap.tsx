import { SVGProps } from 'react';

export const StoreMap = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M11.629 7.769a.999.999 0 0 0-.629.927v14.421l-7-2.33V6.998l3.629 1.45.742-1.855-3.628-1.45A2 2 0 0 0 2 7v13.788c0 .86.55 1.623 1.368 1.895l8.082 2.691c.257.17.591.222.913.096l.637-.248V9.373l6-2.398v6.54h2V6.91l7 2.33v4.275h2V9.24c0-.86-.551-1.623-1.368-1.895L20.51 4.641a.993.993 0 0 0-.881-.069l-8 3.197Z"/>
  <path fill="currentColor" d="M23.15 14.755a1 1 0 0 0-1.3 0l-3.22 2.756H16a1 1 0 0 0-1 .999v7.99a1 1 0 0 0 1 .999h5v-3.996h3V27.5h5a1 1 0 0 0 1-.999V18.51a1 1 0 0 0-1-1h-2.63l-3.22-2.756Zm-3.78 4.754 3.13-2.68 3.13 2.68H28v5.993h-2v-3.995h-7v3.995h-2V19.51h2.37Z"/>
  </svg>
);
