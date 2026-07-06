import type { SVGProps } from 'react';

interface AlignTextProps extends SVGProps<SVGSVGElement> {
  alignment: 'left' | 'center' | 'right';
}

export function AlignText({ alignment, ...props }: AlignTextProps) {
  const lines = alignment === 'left'
    ? [{ x: 2, w: 12 }, { x: 2, w: 8 }]
    : alignment === 'center'
      ? [{ x: 4, w: 8 }, { x: 5, w: 6 }]
      : [{ x: 4, w: 12 }, { x: 8, w: 8 }];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={lines[0].x} y="5" width={lines[0].w} height="2" rx="0.5" fill="currentColor" />
      <rect x={lines[1].x} y="9" width={lines[1].w} height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}
