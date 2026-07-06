import React, { useState } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';
import { Card } from '@/components/ui/Card';
import { CarouselPagination } from '@/components/ui/CarouselPagination';

type CarouselApi = UseEmblaCarouselType[1];

const sampleCards = [
  { title: 'Getting Started', description: 'Learn the basics of our platform and set up your first campaign.', accent: '#0071DC' },
  { title: 'Performance', description: 'Track your campaign metrics and optimize for better results.', accent: '#9747FF' },
  { title: 'Analytics', description: 'Dive deep into data insights and reporting dashboards.', accent: '#00A651' },
  { title: 'Integrations', description: 'Connect with third-party tools and services seamlessly.', accent: '#E85D04' },
  { title: 'Settings', description: 'Configure your account preferences and team access.', accent: '#C8102E' },
  { title: 'Resources', description: 'Access documentation, guides, and support materials.', accent: '#006CB7' },
];

function SampleCard({ title, description, accent }: { title: string; description: string; accent: string }) {
  return (
    <Card size="small" UNSAFE_style={{ height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px' }}>
        <div style={{
          width: '32px',
          height: '4px',
          borderRadius: '9999px',
          background: accent,
          marginBottom: '4px',
        }} />
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2e2f32)',
          margin: 0,
        }}>
          {title}
        </h4>
        <p style={{
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-subtle, #515357)',
          margin: 0,
          lineHeight: '20px',
        }}>
          {description}
        </p>
      </div>
    </Card>
  );
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '700',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text, #2e2f32)',
  margin: 0,
};

const subTextStyle: React.CSSProperties = {
  fontSize: '13px',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-secondary, #74767c)',
  margin: 0,
};

// ─── Carousel section with progress bar pagination ───
function CarouselWithPagination({
  title,
  subtitle,
  basis,
  autoPlay = false,
  showDots = true,
}: {
  title: string;
  subtitle: string;
  basis?: string;
  autoPlay?: boolean;
  showDots?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section style={sectionStyle}>
      <div>
        <h3 style={headingStyle}>{title}</h3>
        <p style={subTextStyle}>{subtitle}</p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: autoPlay }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {sampleCards.map((card, index) => (
            <CarouselItem
              key={index}
              className={`pl-3 ${basis ?? 'basis-full sm:basis-1/2 lg:basis-1/3'}`}
            >
              <div style={{ height: '100%' }}>
                <SampleCard {...card} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination bar */}
      <CarouselPagination
        api={api}
        autoPlay={autoPlay}
        showDots={showDots}
      />
    </section>
  );
}

// ─── Basic carousel with built-in arrows (original pattern) ───
export default function CarouselExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '56px' }}>

      {/* With pagination bar + dots */}
      <CarouselWithPagination
        title="Progress Bar Pagination"
        subtitle="Navigate with play/prev/next controls and a progress bar. Click dots to jump to a specific slide."
        showDots={true}
      />

      {/* Multiple items per view */}
      <CarouselWithPagination
        title="Multiple Cards — Progress Bar"
        subtitle="Showing multiple cards at once with a shared progress bar pagination."
        basis="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
        showDots={false}
      />

      {/* Auto-play with looping */}
      <CarouselWithPagination
        title="Auto-Play Carousel"
        subtitle="Press the play button to auto-advance every 3 seconds. Loops back to the start."
        autoPlay={false}
        showDots={true}
      />

      {/* Classic with built-in arrows */}
      <section style={sectionStyle}>
        <div>
          <h3 style={headingStyle}>Classic Arrow Navigation</h3>
          <p style={subTextStyle}>Standard prev/next arrow buttons positioned at the sides of the carousel.</p>
        </div>
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {sampleCards.map((card, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-full">
                  <SampleCard {...card} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

    </div>
  );
}
