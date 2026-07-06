import * as React from 'react';
import { format, parse, isValid } from 'date-fns';
import { DateField } from './DateField';
import { DatePickerCalendar } from './DatePickerCalendar';
import { IconButton } from './IconButton';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Calendar as CalendarIcon } from '@/components/icons/Calendar';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  /** Label text displayed above the input (required) */
  label: React.ReactNode;
  
  /** Callback when popover closes (required) */
  onClose: () => void;
  
  /** Callback when popover opens (required) */
  onOpen: () => void;
  
  /** Callback when a date is selected (required) */
  onSelect: (value?: Date | undefined) => void;
  
  /** Accessibility labels for calendar and icon button */
  a11yLabels?: {
    calendarIconButton?: string;
  };
  
  /** Whether the date picker is disabled */
  disabled?: boolean;
  
  /** Function to filter which dates should be disabled */
  disabledDateFilter?: (date: Date) => boolean;
  
  /** Error message to display */
  error?: React.ReactNode;
  
  /** Date format string (default: "MM/dd/yyyy") */
  format?: string;
  
  /** Helper text shown below input */
  helperText?: React.ReactNode;
  
  /** ID for the input element */
  id?: string;
  
  /** Whether the calendar popover is open (controlled) */
  isOpen?: boolean;
  
  /** Locale string for date formatting */
  locale?: string;
  
  /** Maximum selectable date */
  maxDate?: Date;
  
  /** Minimum selectable date */
  minDate?: Date;
  
  /** Whether the input is read-only */
  readOnly?: boolean;
  
  /** Custom error renderer function */
  renderError?: (error: any, value: string) => string;
  
  /** Size variant for the date picker */
  size?: 'small' | 'large';
  
  /** Additional props to pass to the input element */
  textFieldProps?: React.InputHTMLAttributes<HTMLInputElement>;
  
  /** Selected date value */
  value?: Date;
  
  /** Escape hatch for additional CSS classes */
  UNSAFE_className?: string;
  
  /** Escape hatch for inline styles */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * DatePicker component for Living Design 3.5
 * 
 * A combined text input and calendar popup for date selection.
 * Supports both manual text entry and calendar-based selection.
 * 
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date>();
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <DatePicker
 *   label="Select date"
 *   value={date}
 *   isOpen={isOpen}
 *   onOpen={() => setIsOpen(true)}
 *   onClose={() => setIsOpen(false)}
 *   onSelect={(date) => setDate(date)}
 * />
 * ```
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      label,
      onClose,
      onOpen,
      onSelect,
      a11yLabels,
      disabled = false,
      disabledDateFilter,
      error: externalError,
      format: dateFormat = 'MM/dd/yyyy',
      helperText,
      id,
      isOpen = false,
      locale,
      maxDate,
      minDate,
      readOnly = false,
      renderError,
      size,
      textFieldProps,
      value,
      UNSAFE_className,
      UNSAFE_style,
    } = props;

    // Convert Date to formatted string for display
    const dateToString = React.useCallback((date: Date | undefined): string => {
      if (!date) return '';
      try {
        return format(date, dateFormat);
      } catch {
        return '';
      }
    }, [dateFormat]);

    // Convert string to Date object
    const stringToDate = React.useCallback((value: string): Date | null => {
      if (!value.trim()) return null;
      try {
        const parsed = parse(value, dateFormat, new Date());
        return isValid(parsed) ? parsed : null;
      } catch {
        return null;
      }
    }, [dateFormat]);

    // Internal state for the text input value
    const [inputValue, setInputValue] = React.useState(() => dateToString(value));

    // Sync value prop changes to input
    React.useEffect(() => {
      setInputValue(dateToString(value));
    }, [value, dateToString]);

    // Handle text input change
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      // Try to parse and update if valid
      const parsedDate = stringToDate(newValue);
      if (parsedDate) {
        onSelect(parsedDate);
      } else if (!newValue.trim()) {
        onSelect(undefined);
      }
      
      textFieldProps?.onChange?.(e);
    }, [stringToDate, onSelect, textFieldProps]);

    // Handle calendar date selection
    const handleCalendarSelect = React.useCallback((selectedDate: Date | undefined) => {
      onSelect(selectedDate);
      onClose();
    }, [onSelect, onClose]);

    // Handle icon button click
    const handleIconButtonClick = React.useCallback(() => {
      if (!disabled && !readOnly) {
        onOpen();
      }
    }, [disabled, readOnly, onOpen]);

    // Calculate disabled dates for DayPicker
    const getDisabledDates = React.useCallback(() => {
      if (!minDate && !maxDate && !disabledDateFilter) {
        return undefined;
      }

      return (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (disabledDateFilter && disabledDateFilter(date)) return true;
        return false;
      };
    }, [minDate, maxDate, disabledDateFilter]);

    const wrapperClassName = [
      styles.datePicker,
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    // Convert ReactNode to string for DateField compatibility
    const labelString = typeof label === 'string' ? label : String(label || '');
    const errorString = externalError ? (typeof externalError === 'string' ? externalError : String(externalError)) : undefined;
    const helperTextString = helperText ? (typeof helperText === 'string' ? helperText : String(helperText)) : undefined;

    return (
      <div className={wrapperClassName} style={UNSAFE_style}>
        <Popover
          open={isOpen && !disabled && !readOnly}
          onOpenChange={(open) => {
            if (open) {
              onOpen();
            } else {
              onClose();
            }
          }}
        >
          <div className={styles.datePicker__fieldWrapper}>
            <DateField
              ref={ref}
              id={id}
              label={labelString}
              value={inputValue}
              onChange={handleInputChange}
              error={errorString}
              helperText={helperTextString}
              disabled={disabled}
              showCalendarIcon={false}
              validateOnBlur={false}
              placeholder={dateFormat.toLowerCase()}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              endAdornment={
                <PopoverTrigger asChild>
                  <IconButton
                    aria-label={a11yLabels?.calendarIconButton || 'Open calendar'}
                    variant="ghost"
                    size="medium"
                    shape="rounded"
                    onClick={handleIconButtonClick}
                    disabled={disabled || readOnly}
                    UNSAFE_className={styles.datePicker__iconButton}
                    tabIndex={-1}
                  >
                    <CalendarIcon />
                  </IconButton>
                </PopoverTrigger>
              }
              {...textFieldProps}
            />
          </div>

          <PopoverContent
            className={styles.datePicker__popoverContent}
            align="start"
            sideOffset={8}
            showArrow={false}
          >
            <DatePickerCalendar
              mode="single"
              variant="embedded"
              value={value}
              onSelect={handleCalendarSelect}
              disabled={getDisabledDates()}
              fromDate={minDate}
              toDate={maxDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
