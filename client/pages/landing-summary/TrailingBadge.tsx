import React from 'react';
import styles from './TrailingBadge.module.css';

interface TrailingBadgeProps {
  label: string;
}

export function TrailingBadge({ label }: TrailingBadgeProps) {
  return (
    <span className={styles.badge}>{label}</span>
  );
}
