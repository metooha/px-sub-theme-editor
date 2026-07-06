import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  section: string;
  title: string;
  description: string;
}

export function PageHeader({ section, title, description }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.titleBlock}>
        <div className={styles.sectionLabel}>{section}</div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
