import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { SkeletonText } from '@/components/ui/SkeletonText';

export default function SkeletonExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic Skeleton - Rectangle */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Skeleton - Rectangle
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', maxWidth: '600px' }}>
          <Skeleton width={200} height={20} variant="rectangle" />
          <Skeleton width={150} height={20} variant="rectangle" />
          <Skeleton width={100} height={20} variant="rectangle" />
        </div>
      </section>

      {/* Basic Skeleton - Rounded */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Skeleton - Rounded (Pills)
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', maxWidth: '600px' }}>
          <Skeleton width={200} height={32} variant="rounded" />
          <Skeleton width={150} height={32} variant="rounded" />
          <Skeleton width={100} height={32} variant="rounded" />
        </div>
      </section>

      {/* Avatar Skeletons */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Avatar Skeletons
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Skeleton width={48} height={48} variant="rounded" aria-label="Loading avatar" />
          <Skeleton width={40} height={40} variant="rounded" aria-label="Loading avatar" />
          <Skeleton width={32} height={32} variant="rounded" aria-label="Loading avatar" />
        </div>
      </section>

      {/* SkeletonText - Default */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          SkeletonText - Default (3 lines)
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <SkeletonText lines={3} variant="rectangle" />
        </div>
      </section>

      {/* SkeletonText - Multiple Lines */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          SkeletonText - 5 Lines
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <SkeletonText lines={5} variant="rectangle" />
        </div>
      </section>

      {/* SkeletonText - Rounded */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          SkeletonText - Rounded Variant
        </h3>
        <div style={{ maxWidth: '600px' }}>
          <SkeletonText lines={3} variant="rounded" />
        </div>
      </section>

      {/* Magic Mode - Single Skeleton */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Magic Mode - AI Content Loading
        </h3>
        <p style={{
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-secondary)',
          marginBottom: '16px'
        }}>
          The magic variant indicates AI-generated content with a special shimmer animation.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', maxWidth: '600px' }}>
          <Skeleton width={400} height={24} variant="rectangle" isMagic />
          <Skeleton width={300} height={24} variant="rounded" isMagic />
        </div>
      </section>

      {/* Magic Mode - SkeletonText */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Magic Mode - SkeletonText with Staggered Animation
        </h3>
        <p style={{
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-secondary)',
          marginBottom: '16px'
        }}>
          Each line animates with a 200ms delay for a cascading effect.
        </p>
        <div style={{ maxWidth: '600px' }}>
          <SkeletonText lines={4} variant="rectangle" isMagic />
        </div>
      </section>

      {/* Card Skeleton Example */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Card Loading State
        </h3>
        <div style={{
          maxWidth: '400px',
          padding: '24px',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          borderRadius: 'var(--ld-primitive-scale-borderradius-100)',
          backgroundColor: 'var(--ld-semantic-color-fill-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Skeleton width={48} height={48} variant="rounded" />
            <div style={{ flex: 1 }}>
              <SkeletonText lines={2} variant="rectangle" />
            </div>
          </div>
          <Skeleton width="100%" height={200} variant="rectangle" />
          <div style={{ marginTop: '16px' }}>
            <SkeletonText lines={3} variant="rectangle" />
          </div>
        </div>
      </section>

      {/* AI-Generated Card Loading */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          AI-Generated Content Card (Magic Mode)
        </h3>
        <div style={{
          maxWidth: '400px',
          padding: '24px',
          border: '1px solid var(--ld-semantic-color-border-moderate)',
          borderRadius: 'var(--ld-primitive-scale-borderradius-100)',
          backgroundColor: 'var(--ld-semantic-color-fill-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Skeleton width={48} height={48} variant="rounded" isMagic />
            <div style={{ flex: 1 }}>
              <SkeletonText lines={2} variant="rectangle" isMagic />
            </div>
          </div>
          <Skeleton width="100%" height={200} variant="rectangle" isMagic />
          <div style={{ marginTop: '16px' }}>
            <SkeletonText lines={3} variant="rectangle" isMagic />
          </div>
        </div>
      </section>
    </div>
  );
}
