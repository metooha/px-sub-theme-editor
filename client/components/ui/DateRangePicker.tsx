import * as React from 'react';
import { DatePickerCalendar } from './DatePickerCalendar';
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import styles from './DateRangePicker.module.css';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  /** Selected date range */
  value?: DateRange;
  
  /** Callback when range is applied */
  onApply?: (range: DateRange | undefined) => void;
  
  /** Callback when cancelled */
  onCancel?: () => void;
  
  /** Disable specific dates */
  disabled?: ((date: Date) => boolean) | Date | Date[];
  
  /** Minimum selectable date */
  fromDate?: Date;
  
  /** Maximum selectable date */
  toDate?: Date;
  
  /** Show week numbers */
  showWeekNumbers?: boolean;
  
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Default month to display */
  defaultMonth?: Date;
  
  /** Labels for buttons */
  labels?: {
    cancel?: string;
    apply?: string;
  };
  
  /** Additional CSS class */
  className?: string;
  
  /** Escape hatch for inline styles */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Date Range Picker Component for Living Design 3.5
 * 
 * A date range picker with two side-by-side calendars for selecting start and end dates.
 * Includes Cancel and Apply action buttons.
 * 
 * @example
 * ```tsx
 * const [range, setRange] = useState<DateRange>();
 * 
 * <DateRangePicker
 *   value={range}
 *   onApply={setRange}
 *   onCancel={() => console.log('cancelled')}
 * />
 * ```
 */
export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (props, ref) => {
    const {
      value,
      onApply,
      onCancel,
      disabled,
      fromDate,
      toDate,
      showWeekNumbers = false,
      weekStartsOn = 0,
      defaultMonth,
      labels = {
        cancel: 'Cancel',
        apply: 'Apply',
      },
      className,
      UNSAFE_style,
    } = props;

    // Internal state for temporary selection before applying
    const [tempRange, setTempRange] = React.useState<DateRange | undefined>(value);

    // Internal state for month navigation
    const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
      if (defaultMonth) return defaultMonth;
      if (value?.from) return value.from;
      return new Date();
    });

    // Sync with external value changes
    React.useEffect(() => {
      setTempRange(value);
    }, [value]);

    // Calculate months to display
    const firstMonth = currentMonth;

    const secondMonth = React.useMemo(() => {
      const month = new Date(currentMonth);
      month.setMonth(month.getMonth() + 1);
      return month;
    }, [currentMonth]);

    // Navigation handlers
    const goToPreviousMonth = React.useCallback(() => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() - 1);
        return newMonth;
      });
    }, []);

    const goToNextMonth = React.useCallback(() => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() + 1);
        return newMonth;
      });
    }, []);

    // Handle date selection
    const handleDateSelect = React.useCallback((date: Date | undefined) => {
      if (!date) {
        setTempRange(undefined);
        return;
      }

      setTempRange(prevRange => {
        // If no range or both dates set, start new range
        if (!prevRange || (prevRange.from && prevRange.to)) {
          return { from: date, to: undefined };
        }

        // If only 'from' is set, set 'to'
        if (prevRange.from && !prevRange.to) {
          // Ensure from is before to
          if (date < prevRange.from) {
            return { from: date, to: prevRange.from };
          }
          return { from: prevRange.from, to: date };
        }

        // Default: set as 'from'
        return { from: date, to: undefined };
      });
    }, []);

    // Handle apply
    const handleApply = React.useCallback(() => {
      onApply?.(tempRange);
    }, [onApply, tempRange]);

    // Handle cancel
    const handleCancel = React.useCallback(() => {
      setTempRange(value); // Reset to original value
      onCancel?.();
    }, [onCancel, value]);

    const containerClassName = [
      styles.dateRangePicker,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClassName} style={UNSAFE_style}>
        <div className={styles.calendars}>
          {/* First month */}
          <div className={styles.calendar}>
            <DatePickerCalendar
              mode="range"
              selected={tempRange}
              onSelect={handleDateSelect}
              month={firstMonth}
              onMonthChange={setCurrentMonth}
              disabled={disabled}
              fromDate={fromDate}
              toDate={toDate}
              showWeekNumbers={showWeekNumbers}
              weekStartsOn={weekStartsOn}
              variant="embedded"
            />
          </div>

          {/* Second month */}
          <div className={styles.calendar}>
            <DatePickerCalendar
              mode="range"
              selected={tempRange}
              onSelect={handleDateSelect}
              month={secondMonth}
              disabled={disabled}
              fromDate={fromDate}
              toDate={toDate}
              showWeekNumbers={showWeekNumbers}
              weekStartsOn={weekStartsOn}
              variant="embedded"
              hideNavigation
            />
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="medium"
            onClick={handleCancel}
          >
            {labels.cancel}
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleApply}
            disabled={!tempRange?.from || !tempRange?.to}
          >
            {labels.apply}
          </Button>
        </div>
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';
