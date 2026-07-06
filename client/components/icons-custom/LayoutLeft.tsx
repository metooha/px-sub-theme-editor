import type { SVGProps } from 'react';

export function LayoutLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="23" height="15" rx="1.5" stroke="currentColor" />
      <rect x="2" y="3" width="8" height="2" rx="0.5" fill="currentColor" />
      <rect x="2" y="7" width="6" height="1" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="14" y="2" width="8" height="12" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}
