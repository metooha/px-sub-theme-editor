import React, { useState } from 'react';
import { ProgressTracker } from '../ui/ProgressTracker';
import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';

export const ProgressTrackerExample: React.FC = () => {
  // Interactive demo state
  const [interactiveStep, setInteractiveStep] = useState(0);
  const interactiveSteps = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation'];

  const handleNext = () => {
    if (interactiveStep < interactiveSteps.length - 1) {
      setInteractiveStep(interactiveStep + 1);
    }
  };

  const handlePrevious = () => {
    if (interactiveStep > 0) {
      setInteractiveStep(interactiveStep - 1);
    }
  };

  const handleReset = () => {
    setInteractiveStep(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {/* Status Variants */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Status Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Info (default)
            </p>
            <ProgressTracker
              steps={['Start', 'In Progress', 'Review', 'Complete']}
              activeStep={1}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Success
            </p>
            <ProgressTracker
              steps={['Start', 'In Progress', 'Review', 'Complete']}
              activeStep={2}
              status="success"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Warning
            </p>
            <ProgressTracker
              steps={['Start', 'In Progress', 'Review', 'Complete']}
              activeStep={1}
              status="warning"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Error
            </p>
            <ProgressTracker
              steps={['Start', 'In Progress', 'Review', 'Complete']}
              activeStep={1}
              status="error"
            />
          </div>
        </div>
      </section>

      {/* Different Step Counts */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Different Step Counts (3-7 Steps)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              3 Steps
            </p>
            <ProgressTracker
              steps={['Step 1', 'Step 2', 'Step 3']}
              activeStep={1}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              4 Steps
            </p>
            <ProgressTracker
              steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
              activeStep={2}
              status="success"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              5 Steps
            </p>
            <ProgressTracker
              steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
              activeStep={3}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              6 Steps
            </p>
            <ProgressTracker
              steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6']}
              activeStep={4}
              status="warning"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              7 Steps
            </p>
            <ProgressTracker
              steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7']}
              activeStep={5}
              status="success"
            />
          </div>
        </div>
      </section>

      {/* Different Active Positions */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Different Active Step Positions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              First Step Active
            </p>
            <ProgressTracker
              steps={['Start', 'Processing', 'Review', 'Complete', 'Done']}
              activeStep={0}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Middle Step Active
            </p>
            <ProgressTracker
              steps={['Start', 'Processing', 'Review', 'Complete', 'Done']}
              activeStep={2}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', color: '#74767C' }}>
              Last Step Active
            </p>
            <ProgressTracker
              steps={['Start', 'Processing', 'Review', 'Complete', 'Done']}
              activeStep={4}
              status="success"
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Interactive Demo
        </h3>
        <div
          style={{
            padding: '24px',
            border: '1px solid #E8E9EA',
            borderRadius: '8px',
            backgroundColor: '#FAFAFA',
          }}
        >
          <ProgressTracker
            steps={interactiveSteps}
            activeStep={interactiveStep}
            status="info"
          />
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <ButtonGroup>
              <Button
                variant="secondary"
                size="medium"
                onClick={handlePrevious}
                disabled={interactiveStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={handleNext}
                disabled={interactiveStep === interactiveSteps.length - 1}
              >
                Next
              </Button>
            </ButtonGroup>
            <Button variant="secondary" size="medium" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <p
            style={{
              marginTop: '16px',
              textAlign: 'center',
              fontSize: '14px',
              color: '#74767C',
            }}
          >
            Current Step: {interactiveStep + 1} of {interactiveSteps.length} - {interactiveSteps[interactiveStep]}
          </p>
        </div>
      </section>

      {/* Real-World Examples */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Real-World Use Cases
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
              E-commerce Checkout
            </p>
            <ProgressTracker
              steps={['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation']}
              activeStep={2}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
              Order Fulfillment
            </p>
            <ProgressTracker
              steps={['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']}
              activeStep={3}
              status="success"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
              Account Setup
            </p>
            <ProgressTracker
              steps={['Personal Info', 'Verify Email', 'Set Password', 'Complete']}
              activeStep={1}
              status="info"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
              Application Review (with warning)
            </p>
            <ProgressTracker
              steps={['Submit', 'Under Review', 'Additional Info Needed', 'Approved']}
              activeStep={2}
              status="warning"
            />
          </div>
          <div>
            <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
              Failed Process
            </p>
            <ProgressTracker
              steps={['Initialize', 'Processing', 'Validation', 'Complete']}
              activeStep={2}
              status="error"
            />
          </div>
        </div>
      </section>

      {/* Compact Layout */}
      <section>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700' }}>
          Compact Layout (3 steps)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
          <ProgressTracker
            steps={['Basic', 'Advanced', 'Review']}
            activeStep={0}
            status="info"
          />
          <ProgressTracker
            steps={['Basic', 'Advanced', 'Review']}
            activeStep={1}
            status="info"
          />
          <ProgressTracker
            steps={['Basic', 'Advanced', 'Review']}
            activeStep={2}
            status="success"
          />
        </div>
      </section>
    </div>
  );
};

export default ProgressTrackerExample;
