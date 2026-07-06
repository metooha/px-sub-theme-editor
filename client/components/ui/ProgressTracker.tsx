import React from 'react';
import styles from './ProgressTracker.module.css';

export type ProgressTrackerStatus = 'info' | 'warning' | 'success' | 'error';

export interface ProgressTrackerProps {
  /**
   * Array of step labels
   * @example ['Step 1', 'Step 2', 'Step 3']
   */
  steps: string[];

  /**
   * Index of the currently active step (0-indexed)
   * @example 0 for first step, 1 for second step, etc.
   */
  activeStep: number;

  /**
   * Visual status variant for the entire tracker
   * @default 'info'
   */
  status?: ProgressTrackerStatus;

  /**
   * Optional custom className for styling
   */
  className?: string;
}

/**
 * ProgressTracker - LD 3.5 Component
 * 
 * A visual representation of a user's progress through a set of steps.
 * Displays the number of steps required to complete a process and highlights
 * completed, current, and future steps.
 * 
 * @example
 * <ProgressTracker
 *   steps={['Order Placed', 'Processing', 'Shipped', 'Delivered']}
 *   activeStep={1}
 *   status="info"
 * />
 */
export function ProgressTracker({
  steps,
  activeStep,
  status = 'info',
  className,
}: ProgressTrackerProps) {
  if (!steps || steps.length < 2) {
    console.warn('ProgressTracker requires at least 2 steps');
    return null;
  }

  // Calculate progress percentage for the indicator
  const progressPercentage = (activeStep / (steps.length - 1)) * 100;

  // Determine position alignment for each stop
  const getStopPosition = (index: number): 'first' | 'middle' | 'last' => {
    if (index === 0) return 'first';
    if (index === steps.length - 1) return 'last';
    return 'middle';
  };

  // Determine state for each stop indicator
  const getStopState = (index: number): 'completed' | 'active' | 'future' => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'future';
  };

  return (
    <div className={`${styles.progressTracker} ${className || ''}`}>
      {/* Track container with background and progress indicator */}
      <div className={styles.trackContainer}>
        <div className={styles.track} />
        <div
          className={`${styles.indicator} ${styles[`indicator--${status}`]}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Stops */}
      <div className={styles.stopsContainer}>
        {steps.map((label, index) => {
          const position = getStopPosition(index);
          const state = getStopState(index);
          const isActive = index === activeStep;

          return (
            <div
              key={index}
              className={`${styles.stop} ${styles[`stop--${position}`]}`}
              style={{
                left: `${(index / (steps.length - 1)) * 100}%`,
              }}
            >
              {/* Stop indicator (SVG circle) */}
              <svg
                className={`${styles.stopIndicator} ${styles[`stopIndicator--${state}`]} ${styles[`stopIndicator--${status}`]}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {state === 'active' ? (
                  <>
                    {/* Active indicator: double circle */}
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      fill="white"
                      strokeWidth="2"
                      className={styles.activeOuterCircle}
                    />
                    <circle cx="8" cy="8" r="4" className={styles.activeInnerCircle} />
                  </>
                ) : (
                  /* Simple filled circle for completed/future */
                  <circle cx="8" cy="8" r="4" className={styles.simpleCircle} />
                )}
              </svg>

              {/* Label */}
              <div
                className={`${styles.stopLabel} ${isActive ? styles['stopLabel--active'] : styles['stopLabel--inactive']}`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
