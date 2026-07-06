import React, { useState, useEffect } from 'react';
import { ProgressIndicator } from '../ui/ProgressIndicator';

export const ProgressIndicatorExample: React.FC = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animated progress demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {/* Basic Examples with All Variants */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Color Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ProgressIndicator
            value={75}
            label="Primary Progress"
            variant="primary"
            valueLabel="75%"
          />
          <ProgressIndicator
            value={90}
            label="Success Progress"
            variant="success"
            valueLabel="90%"
          />
          <ProgressIndicator
            value={60}
            label="Warning Progress"
            variant="warning"
            valueLabel="60%"
          />
          <ProgressIndicator
            value={30}
            label="Error Progress"
            variant="error"
            valueLabel="30%"
          />
        </div>
      </section>

      {/* Without Labels */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Without Labels
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator value={45} variant="primary" />
          <ProgressIndicator value={70} variant="success" />
          <ProgressIndicator value={55} variant="warning" />
          <ProgressIndicator value={25} variant="error" />
        </div>
      </section>

      {/* With Auto Percentage Display */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Auto Percentage Display
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator
            value={85}
            label="Loading"
            variant="primary"
            showValue
          />
          <ProgressIndicator
            value={100}
            label="Complete"
            variant="success"
            showValue
          />
          <ProgressIndicator
            value={50}
            label="Processing"
            variant="warning"
            showValue
          />
          <ProgressIndicator
            value={15}
            label="Failed"
            variant="error"
            showValue
          />
        </div>
      </section>

      {/* Custom Value Labels */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Custom Value Labels
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator
            value={75}
            label="File Upload"
            variant="primary"
            valueLabel="750 MB / 1 GB"
          />
          <ProgressIndicator
            value={40}
            label="Tasks Complete"
            variant="primary"
            valueLabel="4 of 10"
          />
          <ProgressIndicator
            value={66}
            label="Battery"
            variant="success"
            valueLabel="66%"
          />
        </div>
      </section>

      {/* Animated Progress */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Animated Progress
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator
            value={animatedProgress}
            label="Animated Demo"
            variant="primary"
            showValue
          />
        </div>
      </section>

      {/* Different Progress Levels */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Different Progress Levels
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator
            value={0}
            label="Not Started"
            variant="primary"
            valueLabel="0%"
          />
          <ProgressIndicator
            value={25}
            label="Getting Started"
            variant="primary"
            valueLabel="25%"
          />
          <ProgressIndicator
            value={50}
            label="Half Way"
            variant="primary"
            valueLabel="50%"
          />
          <ProgressIndicator
            value={75}
            label="Almost Done"
            variant="success"
            valueLabel="75%"
          />
          <ProgressIndicator
            value={100}
            label="Completed"
            variant="success"
            valueLabel="100%"
          />
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Common Use Cases
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressIndicator
            value={82}
            label="Download Progress"
            variant="primary"
            valueLabel="820 KB / 1 MB"
          />
          <ProgressIndicator
            value={95}
            label="Installation"
            variant="success"
            showValue
          />
          <ProgressIndicator
            value={68}
            label="Storage Usage"
            variant="warning"
            valueLabel="68 GB / 100 GB"
          />
          <ProgressIndicator
            value={92}
            label="Disk Space Critical"
            variant="error"
            valueLabel="92%"
          />
        </div>
      </section>
    </div>
  );
};

export default ProgressIndicatorExample;
