import * as React from 'react';
import { Metric } from '@/components/ui/Metric';

/**
 * Example component demonstrating Metric usage with Living Design 3.5
 * Showcases all variants and prop combinations
 */
export const MetricExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Overview */}
      <section>
        <h2 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700 }}>
          Metric Component
        </h2>
        <p style={{ marginBottom: '24px', color: 'var(--ld-semantic-color-text-subtlest, #74767C)' }}>
          Emphasizes a single, specific value that informs users of a critical data point.
          Allows users to identify meaningful changes and act on them.
        </p>
        <a 
          href="https://digitaltoolkit.livingdesign.walmart.com/components/metric/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--ld-semantic-color-link-text, #2e2f32)',
            textDecoration: 'underline'
          }}
        >
          View Living Design Documentation →
        </a>
      </section>

      {/* Basic Examples */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Basic Metrics
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Metric
            title="Total Revenue"
            value="$45,200"
          />
          <Metric
            title="Active Users"
            value="1,234"
            time="Last 30 days"
          />
          <Metric
            title="Conversion Rate"
            value="3.2"
            unit="%"
            time="This week"
          />
          <Metric
            title="Average Order Value"
            value="$89.50"
            unit="USD"
          />
        </div>
      </section>

      {/* Trend Variants */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Trend Variants
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Metric
            title="Sales"
            value="1,234"
            unit="items"
            variant="positiveUp"
            textLabel="↑ 15% from last month"
            time="This month"
          />
          <Metric
            title="Cost per Click"
            value="$2.45"
            variant="positiveDown"
            textLabel="↓ 8% improvement"
            time="Last 7 days"
          />
          <Metric
            title="Error Rate"
            value="0.8"
            unit="%"
            variant="negativeUp"
            textLabel="↑ 0.3% from baseline"
            time="Today"
          />
          <Metric
            title="Churn Rate"
            value="2.1"
            unit="%"
            variant="negativeDown"
            textLabel="↓ 0.5% worsening"
            time="Q1 2024"
          />
        </div>
      </section>

      {/* All Variants Comparison */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          All Variant Types
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Neutral</h3>
            <Metric
              title="Page Views"
              value="12,345"
              variant="neutral"
              time="Today"
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Positive Up</h3>
            <Metric
              title="Revenue"
              value="$8,900"
              variant="positiveUp"
              textLabel="Up 12%"
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Positive Down</h3>
            <Metric
              title="Bounce Rate"
              value="32"
              unit="%"
              variant="positiveDown"
              textLabel="Down 5%"
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Negative Up</h3>
            <Metric
              title="Complaints"
              value="23"
              variant="negativeUp"
              textLabel="Up 8"
            />
          </div>
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Negative Down</h3>
            <Metric
              title="Customer Sat"
              value="4.1"
              unit="/5"
              variant="negativeDown"
              textLabel="Down 0.3"
            />
          </div>
        </div>
      </section>

      {/* Without Text Labels */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Without Text Labels
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
          <Metric
            title="Sessions"
            value="5,432"
            time="Last hour"
          />
          <Metric
            title="Downloads"
            value="892"
            unit="files"
          />
          <Metric
            title="Response Time"
            value="124"
            unit="ms"
            time="Average"
          />
        </div>
      </section>

      {/* Real-world Dashboard Example */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Dashboard Example
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '24px',
          padding: '24px',
          background: 'var(--ld-semantic-color-background-subtle, #F7F8F9)',
          borderRadius: '8px'
        }}>
          <Metric
            title="Total Sales"
            value="$234,567"
            variant="positiveUp"
            textLabel="↑ $23K vs last week"
            time="This week"
          />
          <Metric
            title="Orders"
            value="1,847"
            unit="orders"
            variant="positiveUp"
            textLabel="↑ 18% increase"
            time="This week"
          />
          <Metric
            title="Avg Order Value"
            value="$127.03"
            variant="negativeDown"
            textLabel="↓ $8.50 decrease"
            time="This week"
          />
          <Metric
            title="Return Rate"
            value="2.3"
            unit="%"
            variant="positiveDown"
            textLabel="↓ 0.5% improvement"
            time="This month"
          />
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Code Examples
        </h2>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
            Basic Metric
          </h3>
          <pre style={{ 
            background: 'var(--ld-semantic-color-background-subtle, #F7F8F9)',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`<Metric
  title="Total Revenue"
  value="$45,200"
/>`}
          </pre>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
            Metric with Positive Trend
          </h3>
          <pre style={{ 
            background: 'var(--ld-semantic-color-background-subtle, #F7F8F9)',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`<Metric
  title="Sales"
  value="1,234"
  unit="items"
  variant="positiveUp"
  textLabel="↑ 15% from last month"
  time="This month"
/>`}
          </pre>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>
            All Props
          </h3>
          <pre style={{ 
            background: 'var(--ld-semantic-color-background-subtle, #F7F8F9)',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`<Metric
  title="Conversion Rate"        // Required
  value="3.2"                    // Required
  unit="%"                       // Optional
  time="This week"               // Optional
  textLabel="↑ 0.5% increase"   // Optional
  variant="positiveUp"           // Optional: neutral (default) | positiveUp | negativeUp | positiveDown | negativeDown
  className="custom-class"       // Optional
/>`}
          </pre>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Usage Guidelines
        </h2>
        <div style={{ 
          background: 'var(--ld-semantic-color-background-subtle, #F7F8F9)',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>Use positiveUp</strong> when an increase is good (e.g., revenue, sales, engagement)</li>
            <li><strong>Use positiveDown</strong> when a decrease is good (e.g., cost, error rate, bounce rate)</li>
            <li><strong>Use negativeUp</strong> when an increase is bad (e.g., complaints, errors, churn)</li>
            <li><strong>Use negativeDown</strong> when a decrease is bad (e.g., customer satisfaction, quality score)</li>
            <li><strong>Use neutral</strong> when the metric doesn't imply a trend or when you just want to display a value</li>
            <li>Keep text labels concise and actionable</li>
            <li>Include units when they add clarity (%, USD, items, etc.)</li>
            <li>Use time labels to provide context for when the metric applies</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MetricExample;
