import React from 'react';
import { DateRangePicker, DateRange } from '@/components/ui/DateRangePicker';

export default function DateRangePickerExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2024, 8, 15), // Sep 15, 2024
    to: new Date(2024, 9, 9), // Oct 9, 2024
  });

  const [rangeWithWeeks, setRangeWithWeeks] = React.useState<DateRange | undefined>({
    from: new Date(2024, 8, 15), // Sep 15, 2024
    to: new Date(2024, 9, 24), // Oct 24, 2024
  });

  const handleApply = React.useCallback((newRange: DateRange | undefined) => {
    setRange(newRange);
    console.log('Range applied:', newRange);
  }, []);

  const handleApplyWithWeeks = React.useCallback((newRange: DateRange | undefined) => {
    setRangeWithWeeks(newRange);
    console.log('Range with weeks applied:', newRange);
  }, []);

  const handleCancel = React.useCallback(() => {
    console.log('Cancelled');
  }, []);

  return (
    <div style={{
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      fontFamily: 'var(--ld-semantic-font-family-sans)',
    }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Date Range Picker - Standard Week (Sun-Sat)
        </h3>
        <DateRangePicker
          value={range}
          onApply={handleApply}
          onCancel={handleCancel}
          weekStartsOn={0}
        />
        {range?.from && range?.to && (
          <p style={{
            marginTop: '24px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            Selected range: {range.from.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })} - {range.to.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        )}
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Date Range Picker - With Week Numbers (Sat-Fri)
        </h3>
        <DateRangePicker
          value={rangeWithWeeks}
          onApply={handleApplyWithWeeks}
          onCancel={handleCancel}
          showWeekNumbers
          weekStartsOn={6}
        />
        {rangeWithWeeks?.from && rangeWithWeeks?.to && (
          <p style={{
            marginTop: '24px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            Selected range: {rangeWithWeeks.from.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })} - {rangeWithWeeks.to.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        )}
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Date Range Picker - No Initial Selection
        </h3>
        <DateRangePicker
          onApply={(newRange) => console.log('New range:', newRange)}
          onCancel={handleCancel}
          weekStartsOn={0}
        />
      </section>
    </div>
  );
}
