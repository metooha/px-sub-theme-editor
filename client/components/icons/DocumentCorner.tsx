import { SVGProps } from 'react';

export const DocumentCorner = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M24.01 16.016v2l-16.004-.028v-2l16.004.028Zm0-4v2l-16.004-.028v-2l16.004.028Zm0-3.986v2l-16.004-.026v-2l16.004.025Z"/>
  <path fill="currentColor" fillRule="evenodd" d="M24.99 1.992a3 3 0 0 1 2.998 3l.018 21.992a3 3 0 0 1-2.998 3l-12.159.004a2 2 0 0 1-1.413-.584l-6.843-6.83a2 2 0 0 1-.587-1.415V4.992a3 3 0 0 1 2.998-3H24.99ZM12.006 27.137v-4.649a.5.5 0 0 0-.5-.5H6.857l5.149 5.149Zm2 .847h11.002l.201-.02c.39-.079.7-.387.78-.778l.019-.202-.018-21.992a1 1 0 0 0-.799-.98l-.2-.02H7.003a1 1 0 0 0-1 1l.012 14.996h5.99a2 2 0 0 1 2 2v5.996Z" clipRule="evenodd"/>
  </svg>
);
