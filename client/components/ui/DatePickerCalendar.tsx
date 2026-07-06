import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import styles from './DatePickerCalendar.module.css';

export interface DatePickerCalendarProps {
  /** Selected date */
  value?: Date;

  /** Callback when a date is selected */
  onSelect?: (date: Date | undefined) => void;

  /** Selection mode */
  mode?: 'single' | 'multiple' | 'range';

  /** Multiple selected dates (for mode="multiple") */
  selected?: Date | Date[] | { from?: Date; to?: Date };

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

  /** Number of months to display */
  numberOfMonths?: number;

  /** Default month to display */
  defaultMonth?: Date;

  /** Current month (controlled) */
  month?: Date;

  /** Callback when month changes */
  onMonthChange?: (month: Date) => void;

  /** Variant - 'standalone' includes elevation and is self-contained, 'embedded' is for use within other components */
  variant?: 'standalone' | 'embedded';

  /** Hide navigation buttons (useful when parent controls navigation) */
  hideNavigation?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Escape hatch for inline styles */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Date Picker Calendar Component for Living Design 3.5
 * 
 * A calendar component for date selection, supporting single, multiple, and range modes.
 * Based on LD 3.5 design specifications.
 * 
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date>();
 * 
 * <DatePickerCalendar
 *   mode="single"
 *   value={date}
 *   onSelect={setDate}
 * />
 * ```
 */
export const DatePickerCalendar = React.forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  (props, ref) => {
    const {
      value,
      onSelect,
      mode = 'single',
      selected,
      disabled,
      fromDate,
      toDate,
      showWeekNumbers = false,
      weekStartsOn = 0,
      numberOfMonths = 1,
      defaultMonth,
      month: controlledMonth,
      onMonthChange,
      variant = 'standalone',
      hideNavigation = false,
      className,
      UNSAFE_style,
    } = props;

    // Internal month state
    const [internalMonth, setInternalMonth] = React.useState<Date>(
      controlledMonth || defaultMonth || value || new Date()
    );

    const currentMonth = controlledMonth !== undefined ? controlledMonth : internalMonth;

    // Handle month change
    const handleMonthChange = React.useCallback((newMonth: Date) => {
      if (controlledMonth === undefined) {
        setInternalMonth(newMonth);
      }
      onMonthChange?.(newMonth);
    }, [controlledMonth, onMonthChange]);

    // Navigation
    const goToPreviousMonth = React.useCallback(() => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      handleMonthChange(newMonth);
    }, [currentMonth, handleMonthChange]);

    const goToNextMonth = React.useCallback(() => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      handleMonthChange(newMonth);
    }, [currentMonth, handleMonthChange]);

    // Get month name and year
    const monthYear = React.useMemo(() => {
      const monthName = currentMonth.toLocaleDateString('en-US', { month: 'short' });
      const year = currentMonth.getFullYear();
      return `${monthName} ${year}`;
    }, [currentMonth]);

    // Get day names based on week start
    const dayNames = React.useMemo(() => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (weekStartsOn === 0 || !showWeekNumbers) {
        return days;
      }
      // For week numbers variant, start from Saturday
      return ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    }, [weekStartsOn, showWeekNumbers]);

    // Generate calendar days
    const calendarDays = React.useMemo(() => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      // Get first day of month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // Determine which day of week the month starts on
      let startDayOfWeek = firstDay.getDay();
      
      // Adjust for week starting on different days
      if (showWeekNumbers) {
        // For week numbers, weeks start on Saturday
        startDayOfWeek = (firstDay.getDay() + 1) % 7;
      } else if (weekStartsOn !== 0) {
        startDayOfWeek = (startDayOfWeek - weekStartsOn + 7) % 7;
      }
      
      const totalDays = lastDay.getDate();
      
      // Calculate days to show from previous month
      const prevMonthDays: Array<{ date: Date; isCurrentMonth: boolean }> = [];
      const prevMonth = new Date(year, month, 0);
      const prevMonthTotal = prevMonth.getDate();
      
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push({
          date: new Date(year, month - 1, prevMonthTotal - i),
          isCurrentMonth: false,
        });
      }
      
      // Current month days
      const currentMonthDays: Array<{ date: Date; isCurrentMonth: boolean }> = [];
      for (let day = 1; day <= totalDays; day++) {
        currentMonthDays.push({
          date: new Date(year, month, day),
          isCurrentMonth: true,
        });
      }
      
      // Next month days to fill the grid
      const totalCells = prevMonthDays.length + currentMonthDays.length;
      const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
      const nextMonthDays: Array<{ date: Date; isCurrentMonth: boolean }> = [];
      
      for (let day = 1; day <= remainingCells; day++) {
        nextMonthDays.push({
          date: new Date(year, month + 1, day),
          isCurrentMonth: false,
        });
      }
      
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }, [currentMonth, weekStartsOn, showWeekNumbers]);

    // Split days into weeks
    const weeks = React.useMemo(() => {
      const weeksArray: Array<typeof calendarDays> = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        weeksArray.push(calendarDays.slice(i, i + 7));
      }
      return weeksArray;
    }, [calendarDays]);

    // Get week number
    const getWeekNumber = (date: Date): number => {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    // Check if date is disabled
    const isDateDisabled = React.useCallback((date: Date): boolean => {
      if (fromDate && date < fromDate) return true;
      if (toDate && date > toDate) return true;
      
      if (typeof disabled === 'function') {
        return disabled(date);
      }
      
      if (disabled instanceof Date) {
        return date.toDateString() === disabled.toDateString();
      }
      
      if (Array.isArray(disabled)) {
        return disabled.some(d => date.toDateString() === d.toDateString());
      }
      
      return false;
    }, [disabled, fromDate, toDate]);

    // Check if date is selected
    const isDateSelected = React.useCallback((date: Date): boolean => {
      if (mode === 'single') {
        const selectedDate = (selected as Date) || value;
        return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
      }

      if (mode === 'multiple' && Array.isArray(selected)) {
        return selected.some(d => date.toDateString() === d.toDateString());
      }

      if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
        const { from, to } = selected as { from?: Date; to?: Date };
        if (!from) return false;
        if (!to) return date.toDateString() === from.toDateString();
        return date >= from && date <= to;
      }

      return false;
    }, [mode, selected, value]);

    // Check if date is range start
    const isRangeStart = React.useCallback((date: Date): boolean => {
      if (mode !== 'range' || !selected || typeof selected !== 'object' || !('from' in selected)) {
        return false;
      }
      const { from } = selected as { from?: Date; to?: Date };
      return from ? date.toDateString() === from.toDateString() : false;
    }, [mode, selected]);

    // Check if date is range end
    const isRangeEnd = React.useCallback((date: Date): boolean => {
      if (mode !== 'range' || !selected || typeof selected !== 'object' || !('from' in selected)) {
        return false;
      }
      const { from, to } = selected as { from?: Date; to?: Date };
      if (!from || !to) return false;
      return date.toDateString() === to.toDateString();
    }, [mode, selected]);

    // Check if date is in range (but not start or end)
    const isInRange = React.useCallback((date: Date): boolean => {
      if (mode !== 'range' || !selected || typeof selected !== 'object' || !('from' in selected)) {
        return false;
      }
      const { from, to } = selected as { from?: Date; to?: Date };
      if (!from || !to) return false;
      return date > from && date < to;
    }, [mode, selected]);

    // Check if date is today
    const isToday = React.useCallback((date: Date): boolean => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }, []);

    // Handle day click
    const handleDayClick = React.useCallback((date: Date) => {
      if (isDateDisabled(date)) return;
      
      onSelect?.(date);
    }, [isDateDisabled, onSelect]);

    const calendarClassName = [
      styles.calendar,
      variant === 'embedded' && styles['calendar--embedded'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={calendarClassName} style={UNSAFE_style}>
        {/* Header */}
        <div className={styles.header}>
          {!hideNavigation && (
            <button
              type="button"
              className={`${styles.navButton} ${styles['navButton--prev']}`}
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
          )}

          <div className={styles.monthYear}>{monthYear}</div>

          {!hideNavigation && (
            <button
              type="button"
              className={`${styles.navButton} ${styles['navButton--next']}`}
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          )}
        </div>

        {/* Calendar Grid */}
        <div className={styles.grid}>
          {/* Day Headers */}
          <div className={`${styles.dayHeaders} ${showWeekNumbers ? styles['dayHeaders--withWeeks'] : ''}`}>
            {showWeekNumbers && (
              <div className={`${styles.dayHeader} ${styles['dayHeader--weekNumber']}`}>
                WM<br />WK
              </div>
            )}
            {dayNames.map((day, index) => (
              <div key={index} className={styles.dayHeader}>
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className={styles.weeks}>
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className={`${styles.week} ${showWeekNumbers ? styles['week--withWeeks'] : ''}`}
              >
                {showWeekNumbers && (
                  <div className={styles.weekNumber}>
                    {getWeekNumber(week[0].date)}
                  </div>
                )}
                {week.map((day, dayIndex) => {
                  const selected = isDateSelected(day.date);
                  const disabled = isDateDisabled(day.date);
                  const today = isToday(day.date);
                  const rangeStart = isRangeStart(day.date);
                  const rangeEnd = isRangeEnd(day.date);
                  const inRange = isInRange(day.date);

                  const dayClassName = [
                    styles.day,
                    !day.isCurrentMonth && styles['day--outside'],
                    selected && !rangeStart && !rangeEnd && !inRange && styles['day--selected'],
                    disabled && styles['day--disabled'],
                    today && styles['day--today'],
                    rangeStart && styles['day--rangeStart'],
                    rangeEnd && styles['day--rangeEnd'],
                    inRange && styles['day--inRange'],
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      key={dayIndex}
                      type="button"
                      className={dayClassName}
                      onClick={() => handleDayClick(day.date)}
                      disabled={disabled}
                      aria-label={day.date.toLocaleDateString()}
                      aria-selected={selected}
                    >
                      {day.date.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

DatePickerCalendar.displayName = 'DatePickerCalendar';
