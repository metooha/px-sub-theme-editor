import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import styles from './CarouselPagination.module.css';

type CarouselApi = UseEmblaCarouselType[1];

export interface CarouselPaginationProps {
  /** The Embla carousel API obtained via the `setApi` prop on <Carousel> */
  api: CarouselApi | undefined;
  /** Enable auto-play. Default: false */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds. Default: 3000 */
  autoPlayInterval?: number;
  /** Show dot indicators above the progress bar. Default: true */
  showDots?: boolean;
  /** Additional class name */
  className?: string;
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 2.5L11 7L3 11.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="8.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2L4.5 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 2L9.5 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CarouselPagination({
  api,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  className,
}: CarouselPaginationProps) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef<number | undefined>(undefined);

  const updateState = useCallback(
    (emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCurrent(emblaApi.selectedScrollSnap());
      setCount(emblaApi.scrollSnapList().length);
    },
    []
  );

  useEffect(() => {
    if (!api) return;
    updateState(api);
    api.on('select', updateState);
    api.on('reInit', updateState);
    return () => {
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api, updateState]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || !api) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, api, autoPlayInterval]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  // Fraction of progress 0→1
  const progress = count > 1 ? current / (count - 1) : 0;

  const containerClass = [styles.pagination, className].filter(Boolean).join(' ');

  return (
    <div className={containerClass} aria-label="Carousel controls">
      {/* Play / Pause */}
      <button
        className={styles.ctrlBtn}
        onClick={() => setIsPlaying((v) => !v)}
        aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Previous */}
      <button
        className={styles.ctrlBtn}
        onClick={scrollPrev}
        disabled={!api?.canScrollPrev()}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>

      {/* Next */}
      <button
        className={styles.ctrlBtn}
        onClick={scrollNext}
        disabled={!api?.canScrollNext()}
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>

      {/* Progress track */}
      <div
        className={styles.trackWrapper}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={count}
        aria-label={`Slide ${current + 1} of ${count}`}
      >
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Dot tick marks */}
        {showDots && count > 0 && (
          <div className={styles.dots}>
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={[styles.dot, i === current ? styles.dotActive : ''].join(' ')}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
