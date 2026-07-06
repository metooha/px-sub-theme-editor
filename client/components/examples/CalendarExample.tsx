import React from 'react';
import { DatePickerCalendar } from '@/components/ui/DatePickerCalendar';

export default function CalendarExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2024, 8, 15)); // Sep 15, 2024
  const [multipleDate, setMultipleDate] = React.useState<Date[] | undefined>([]);

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
          Date Picker Calendar - Standard Week (Sun-Sat)
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          <DatePickerCalendar
            mode="single"
            value={date}
            onSelect={setDate}
            weekStartsOn={0}
          />
        </div>
        {date && (
          <p style={{
            marginTop: '16px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            Selected: {date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
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
          Date Picker Calendar - With Week Numbers (Sat-Fri)
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          <DatePickerCalendar
            mode="single"
            value={date}
            onSelect={setDate}
            showWeekNumbers
            weekStartsOn={6}
          />
        </div>
        {date && (
          <p style={{
            marginTop: '16px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            Selected: {date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
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
          Multiple Variants Comparison
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Standard */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '12px'
            }}>
              Standard (Sun-Sat)
            </h4>
            <DatePickerCalendar
              mode="single"
              value={date}
              onSelect={setDate}
              weekStartsOn={0}
            />
          </div>

          {/* With Week Numbers */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '12px'
            }}>
              With Week Numbers (Sat-Fri)
            </h4>
            <DatePickerCalendar
              mode="single"
              value={date}
              onSelect={setDate}
              showWeekNumbers
              weekStartsOn={6}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
