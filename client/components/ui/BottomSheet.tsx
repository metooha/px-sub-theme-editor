import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import styles from './BottomSheet.module.css';
import { IconButton } from './IconButton';
import { X } from '@/components/icons';

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is open.
   */
  isOpen?: boolean;
  
  /**
   * Alternative prop name for controlling open state (matches Vaul API).
   */
  open?: boolean;
  
  /**
   * Callback fired when the bottom sheet should close.
   */
  onClose?: () => void;
  
  /**
   * Alternative callback name (matches Vaul API).
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * The title displayed in the header.
   */
  title: string;
  
  /**
   * The main content of the bottom sheet.
   */
  children: React.ReactNode;
  
  /**
   * Optional action buttons displayed in the footer.
   * Pass a ButtonGroup component with your action buttons.
   */
  actions?: React.ReactNode;
  
  /**
   * Whether to show the actions section.
   * @default true if actions are provided
   */
  showActions?: boolean;
  
  /**
   * Height adjustment mode.
   * - "fixed": Content area fills available space (80vh)
   * - "content": Content area adjusts to content size
   * @default "content"
   */
  adjustHeight?: 'fixed' | 'content';
  
  /**
   * Whether background should scale when sheet is open.
   * @default true
   */
  shouldScaleBackground?: boolean;
}

/**
 * BottomSheet component for Living Design 3.5
 * 
 * A mobile-friendly modal component that slides up from the bottom of the screen.
 * Replaces the previous Drawer component with LD 3.5 design tokens and styling.
 * 
 * Uses Vaul library for accessibility and gesture support.
 * 
 * @example
 * ```tsx
 * <BottomSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   actions={
 *     <ButtonGroup>
 *       <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleSubmit}>Submit</Button>
 *     </ButtonGroup>
 *   }
 * >
 *   <p>Are you sure you want to continue?</p>
 * </BottomSheet>
 * ```
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      isOpen,
      open,
      onClose,
      onOpenChange,
      title,
      children,
      actions,
      showActions,
      adjustHeight = 'content',
      shouldScaleBackground = true,
    },
    ref
  ) => {
    // Support both isOpen/onClose and open/onOpenChange APIs
    const isControlled = open !== undefined || isOpen !== undefined;
    const isSheetOpen = open ?? isOpen ?? false;
    
    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (!newOpen) {
        onClose?.();
      }
      onOpenChange?.(newOpen);
    }, [onClose, onOpenChange]);
    
    // Determine if actions should be shown
    const shouldShowActions = showActions ?? (actions != null);
    
    const contentClassName = [
      styles.content,
      adjustHeight === 'fixed' ? styles['content--fixedHeight'] : styles['content--contentHeight'],
    ].filter(Boolean).join(' ');
    
    const contentContainerClassName = [
      styles.contentContainer,
      adjustHeight === 'fixed' ? styles['contentContainer--fixed'] : styles['contentContainer--content'],
    ].filter(Boolean).join(' ');
    
    return (
      <DrawerPrimitive.Root
        open={isSheetOpen}
        onOpenChange={handleOpenChange}
        shouldScaleBackground={shouldScaleBackground}
      >
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className={styles.overlay} />
          <DrawerPrimitive.Content
            ref={ref}
            className={contentClassName}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleContainer}>
                <div className={styles.titleFrame}>
                  <DrawerPrimitive.Title className={styles.title}>
                    {title}
                  </DrawerPrimitive.Title>
                </div>
                <DrawerPrimitive.Close asChild>
                  <IconButton
                    variant="ghost"
                    shape="rounded"
                    aria-label="Close"
                  >
                    <X />
                  </IconButton>
                </DrawerPrimitive.Close>
              </div>
            </div>
            
            {/* Content Container */}
            <div className={contentContainerClassName}>
              {children}
            </div>
            
            {/* Actions */}
            {shouldShowActions && (
              <div className={styles.actions}>
                <div className={styles.divider} />
                <div className={styles.actionContainer}>
                  {actions}
                </div>
              </div>
            )}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

// Export drawer primitives for advanced use cases
export const BottomSheetTrigger = DrawerPrimitive.Trigger;
export const BottomSheetClose = DrawerPrimitive.Close;
export const BottomSheetPortal = DrawerPrimitive.Portal;
