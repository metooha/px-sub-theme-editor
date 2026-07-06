import * as React from 'react';
import { DatePicker } from '@/components/ui/DatePicker';

export const DatePickerExample: React.FC = () => {
  // State for default example
  const [defaultDate, setDefaultDate] = React.useState<Date>();
  const [defaultIsOpen, setDefaultIsOpen] = React.useState(false);

  // State for with helper text
  const [helperDate, setHelperDate] = React.useState<Date>();
  const [helperIsOpen, setHelperIsOpen] = React.useState(false);

  // State for error state
  const [errorDate, setErrorDate] = React.useState<Date>();
  const [errorIsOpen, setErrorIsOpen] = React.useState(false);

  // State for small size
  const [smallDate, setSmallDate] = React.useState<Date>();
  const [smallIsOpen, setSmallIsOpen] = React.useState(false);

  // State for large size
  const [largeDate, setLargeDate] = React.useState<Date>();
  const [largeIsOpen, setLargeIsOpen] = React.useState(false);

  // State for with restrictions
  const [restrictedDate, setRestrictedDate] = React.useState<Date>();
  const [restrictedIsOpen, setRestrictedIsOpen] = React.useState(false);

  // Date restrictions (next 30 days only)
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Default
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={defaultDate}
            isOpen={defaultIsOpen}
            onOpen={() => setDefaultIsOpen(true)}
            onClose={() => setDefaultIsOpen(false)}
            onSelect={(date) => setDefaultDate(date)}
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          With Helper Text
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={helperDate}
            isOpen={helperIsOpen}
            onOpen={() => setHelperIsOpen(true)}
            onClose={() => setHelperIsOpen(false)}
            onSelect={(date) => setHelperDate(date)}
            helperText="Select a date from the calendar or type manually"
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Error State
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={errorDate}
            isOpen={errorIsOpen}
            onOpen={() => setErrorIsOpen(true)}
            onClose={() => setErrorIsOpen(false)}
            onSelect={(date) => setErrorDate(date)}
            error="Please select a valid date"
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Disabled State
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={new Date()}
            isOpen={false}
            onOpen={() => {}}
            onClose={() => {}}
            onSelect={() => {}}
            disabled
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Read-only State
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={new Date()}
            isOpen={false}
            onOpen={() => {}}
            onClose={() => {}}
            onSelect={() => {}}
            readOnly
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Small Size
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={smallDate}
            isOpen={smallIsOpen}
            onOpen={() => setSmallIsOpen(true)}
            onClose={() => setSmallIsOpen(false)}
            onSelect={(date) => setSmallDate(date)}
            size="small"
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          Large Size
        </h3>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={largeDate}
            isOpen={largeIsOpen}
            onOpen={() => setLargeIsOpen(true)}
            onClose={() => setLargeIsOpen(false)}
            onSelect={(date) => setLargeDate(date)}
            size="large"
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: 700, 
          marginBottom: '16px',
          color: 'var(--ld-semantic-color-text, #2e2f32)'
        }}>
          With Date Restrictions
        </h3>
        <p style={{ 
          fontSize: '0.875rem', 
          marginBottom: '12px',
          color: 'var(--ld-semantic-color-text-subtle, #515357)'
        }}>
          Only dates within the next 30 days can be selected
        </p>
        <div style={{ maxWidth: '320px' }}>
          <DatePicker
            label="Choose date (mm/dd/yyyy)"
            value={restrictedDate}
            isOpen={restrictedIsOpen}
            onOpen={() => setRestrictedIsOpen(true)}
            onClose={() => setRestrictedIsOpen(false)}
            onSelect={(date) => setRestrictedDate(date)}
            minDate={today}
            maxDate={thirtyDaysFromNow}
            helperText={`Select a date between ${format(today, 'MM/dd/yyyy')} and ${format(thirtyDaysFromNow, 'MM/dd/yyyy')}`}
          />
        </div>
      </div>
    </div>
  );
};

// Helper to format dates for display
function format(date: Date, formatStr: string): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
