import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export default function AvatarExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Avatar with Image
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/react.png" alt="@react" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Avatar with Fallback
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Different Sizes
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar style={{ width: '32px', height: '32px' }}>
            <AvatarFallback style={{ fontSize: '12px' }}>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar style={{ width: '56px', height: '56px' }}>
            <AvatarFallback style={{ fontSize: '18px' }}>LG</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  );
}
