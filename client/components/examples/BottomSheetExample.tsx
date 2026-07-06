import React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export default function BottomSheetExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFixedOpen, setIsFixedOpen] = React.useState(false);
  const [isNoActionsOpen, setIsNoActionsOpen] = React.useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Basic Example */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Bottom Sheet
        </h3>
        <p style={{
          color: 'var(--ld-semantic-color-text-secondary)',
          fontSize: '14px',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          Default bottom sheet with content and action buttons. Height adjusts to content.
        </p>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Bottom Sheet
        </Button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Your Action"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </ButtonGroup>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{
              color: 'var(--ld-semantic-color-text-primary)',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: '600'
            }}>
              Are you sure you want to continue?
            </p>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              This action cannot be undone. All data associated with this item will be
              permanently removed from our servers.
            </p>
          </div>
        </BottomSheet>
      </section>

      {/* Fixed Height Example */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Fixed Height Bottom Sheet
        </h3>
        <p style={{
          color: 'var(--ld-semantic-color-text-secondary)',
          fontSize: '14px',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          Bottom sheet with fixed height (80vh). Content area is scrollable when content overflows.
        </p>
        <Button variant="secondary" onClick={() => setIsFixedOpen(true)}>
          Open Fixed Height Sheet
        </Button>

        <BottomSheet
          isOpen={isFixedOpen}
          onClose={() => setIsFixedOpen(false)}
          title="Terms and Conditions"
          adjustHeight="fixed"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setIsFixedOpen(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => setIsFixedOpen(false)}>
                Accept
              </Button>
            </ButtonGroup>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text-primary)'
            }}>
              1. Introduction
            </h4>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Welcome to our service. By accessing or using our service, you agree to be bound
              by these Terms and Conditions. Please read them carefully.
            </p>
            
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text-primary)',
              marginTop: '8px'
            }}>
              2. Use of Service
            </h4>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              You must be at least 18 years old to use this service. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>

            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text-primary)',
              marginTop: '8px'
            }}>
              3. Privacy Policy
            </h4>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Your privacy is important to us. Please review our Privacy Policy to understand
              how we collect, use, and protect your personal information.
            </p>

            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text-primary)',
              marginTop: '8px'
            }}>
              4. Intellectual Property
            </h4>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              All content, trademarks, and other intellectual property on our service are owned
              by us or our licensors. You may not use them without permission.
            </p>

            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--ld-semantic-color-text-primary)',
              marginTop: '8px'
            }}>
              5. Limitation of Liability
            </h4>
            <p style={{
              color: 'var(--ld-semantic-color-text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              We are not liable for any indirect, incidental, special, or consequential damages
              arising from your use of the service.
            </p>
          </div>
        </BottomSheet>
      </section>

      {/* No Actions Example */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Bottom Sheet Without Actions
        </h3>
        <p style={{
          color: 'var(--ld-semantic-color-text-secondary)',
          fontSize: '14px',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          Information-only bottom sheet without action buttons.
        </p>
        <Button variant="tertiary" onClick={() => setIsNoActionsOpen(true)}>
          View Information
        </Button>

        <BottomSheet
          isOpen={isNoActionsOpen}
          onClose={() => setIsNoActionsOpen(false)}
          title="Product Information"
          showActions={false}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-primary)',
                marginBottom: '8px'
              }}>
                Description
              </h4>
              <p style={{
                color: 'var(--ld-semantic-color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                This premium product is crafted with the highest quality materials to ensure
                durability and performance.
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--ld-semantic-color-text-primary)',
                marginBottom: '8px'
              }}>
                Specifications
              </h4>
              <ul style={{
                color: 'var(--ld-semantic-color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.8',
                paddingLeft: '20px'
              }}>
                <li>Weight: 2.5 lbs</li>
                <li>Dimensions: 10" x 8" x 4"</li>
                <li>Material: Premium cotton blend</li>
                <li>Made in USA</li>
              </ul>
            </div>
          </div>
        </BottomSheet>
      </section>
    </div>
  );
}
