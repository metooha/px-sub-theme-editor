import React, { useState, useEffect, Suspense } from 'react';

const Lottie = React.lazy(() => import('lottie-react'));

// Cache animation data to avoid re-fetching
const animationCache: Record<string, unknown> = {};

interface MartyAvatarProps {
  size?: number;
  width?: number;
  height?: number;
  variant?: 'default' | 'glasses' | 'glasses-thinking';
}

export function MartyAvatar({ size = 38, width, height, variant = 'default' }: MartyAvatarProps) {
  const w = width ?? size;
  const h = height ?? size;
  const [animData, setAnimData] = useState<unknown>(
    animationCache[variant] ?? null
  );

  useEffect(() => {
    if (animationCache[variant]) {
      setAnimData(animationCache[variant]);
      return;
    }

    const url = variant === 'glasses'
      ? '/animations/MGFX_AI-SuperAgents_Marty-3xEmotes_v004_28px_opt.json'
      : variant === 'glasses-thinking'
      ? '/animations/MGFX_AI-SuperAgents_Marty-GlassesThinking_v004_28px_opt.json'
      : '/animations/marty-thinking.json';

    fetch(url)
      .then(r => r.json())
      .then(data => {
        animationCache[variant] = data;
        setAnimData(data);
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('MartyAvatar: failed to load animation', err);
        }
        setAnimData(null);
      });
  }, [variant]);

  const placeholder = <div style={{ width: w, height: h }} />;

  if (!animData) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      <div style={{ width: w, height: h, overflow: 'hidden', flexShrink: 0 }}>
        <Lottie
          animationData={animData}
          loop={true}
          style={{ width: w, height: h }}
        />
      </div>
    </Suspense>
  );
}
