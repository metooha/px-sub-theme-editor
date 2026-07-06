import * as React from 'react';
import { Nudge } from '@/components/ui/Nudge';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { LinkButton } from '@/components/ui/LinkButton';
import { InfoCircle, LightBulb, Star, Gift, Bell, Settings, Article, User } from '@/components/icons';

export function NudgeExample() {
  const [dismissedNudges, setDismissedNudges] = React.useState<Set<string>>(new Set());

  const handleDismiss = (nudgeId: string) => {
    setDismissedNudges(prev => new Set([...prev, nudgeId]));
  };

  const resetAll = () => {
    setDismissedNudges(new Set());
  };

  return (
    <div style={{ 
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      fontFamily: 'var(--ld-semantic-font-family-sans)'
    }}>
      
      {/* Reset Button */}
      {dismissedNudges.size > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="small" onClick={resetAll}>
            Reset All Nudges
          </Button>
        </div>
      )}

      {/* Basic Usage */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          Basic Usage
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Nudges provide contextual guidance and prompts. They use the surface-brand background color.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge title="Quick tip">
            Use keyboard shortcuts to work faster and more efficiently.
          </Nudge>

          <Nudge title="Complete your profile">
            Add a profile picture and bio to help others recognize you and build trust with your team.
          </Nudge>
        </div>
      </section>

      {/* With Spot Icons */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          With Spot Icons
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Use SpotIcon components in the leading slot to add visual interest and context.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="Helpful information" 
            leading={<SpotIcon icon={<InfoCircle />} size="small" color="white" />}
          >
            This feature can help you save time on repetitive tasks.
          </Nudge>

          <Nudge 
            title="Pro tip" 
            leading={<SpotIcon icon={<LightBulb />} size="small" color="white" />}
          >
            Enable auto-save to prevent losing your work.
          </Nudge>

          <Nudge 
            title="New feature available" 
            leading={<SpotIcon icon={<Star />} size="small" color="white" />}
          >
            Try out our new collaboration tools to work better with your team.
          </Nudge>

          <Nudge 
            title="Stay updated" 
            leading={<SpotIcon icon={<Bell />} size="small" color="white" />}
          >
            Turn on notifications to get real-time updates on your projects.
          </Nudge>
        </div>
      </section>

      {/* Dismissible Nudges with Close Button */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          Dismissible Nudges
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Add onClose prop to show a close button that allows users to dismiss the nudge.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          {!dismissedNudges.has('tip-1') && (
            <Nudge 
              title="First-time user tip" 
              leading={<SpotIcon icon={<InfoCircle />} size="small" color="white" />}
              onClose={() => handleDismiss('tip-1')}
            >
              Click the settings icon to customize your workspace preferences.
            </Nudge>
          )}

          {!dismissedNudges.has('tip-2') && (
            <Nudge 
              title="Did you know?" 
              leading={<SpotIcon icon={<LightBulb />} size="small" color="white" />}
              onClose={() => handleDismiss('tip-2')}
            >
              You can drag and drop items to reorder them in your list.
            </Nudge>
          )}

          {!dismissedNudges.has('tip-3') && (
            <Nudge 
              title="Customize your experience" 
              leading={<SpotIcon icon={<Settings />} size="small" color="white" />}
              onClose={() => handleDismiss('tip-3')}
            >
              Adjust your preferences in the settings menu to personalize your workflow.
            </Nudge>
          )}
        </div>
      </section>

      {/* With Single Action Button */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          With Single Action Button
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Add action buttons to encourage user engagement.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="Save your progress" 
            leading={<SpotIcon icon={<Article />} size="small" color="white" />}
            actions={<Button variant="primary" size="small">Save now</Button>}
          >
            Your work will be saved automatically, but you can save manually at any time.
          </Nudge>

          <Nudge 
            title="Welcome to the platform" 
            leading={<SpotIcon icon={<User />} size="small" color="white" />}
            actions={<Button variant="primary" size="small">Get started</Button>}
            onClose={() => {}}
          >
            Let's set up your profile and explore the features available to you.
          </Nudge>
        </div>
      </section>

      {/* With Button Groups */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          With Button Groups
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Use ButtonGroup to provide multiple action options.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="Try premium features" 
            leading={<SpotIcon icon={<Gift />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Start free trial</Button>
                <Button variant="secondary" size="small">Learn more</Button>
              </ButtonGroup>
            }
          >
            Unlock advanced analytics and collaboration features with our premium plan.
          </Nudge>

          <Nudge 
            title="Unsaved changes" 
            leading={<SpotIcon icon={<InfoCircle />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Save changes</Button>
                <Button variant="secondary" size="small">Discard</Button>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            You have unsaved changes that will be lost if you leave this page.
          </Nudge>

          <Nudge 
            title="Update available" 
            leading={<SpotIcon icon={<Bell />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Update now</Button>
                <Button variant="tertiary" size="small">Remind me later</Button>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            A new version is available with bug fixes and performance improvements.
          </Nudge>
        </div>
      </section>

      {/* With Link Buttons */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          With Link Buttons
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Combine regular buttons with LinkButtons for primary and secondary actions.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="Complete your setup" 
            leading={<SpotIcon icon={<Star />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Continue setup</Button>
                <LinkButton size="small">Skip for now</LinkButton>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            Add your team information to unlock collaboration features and improve your experience.
          </Nudge>

          <Nudge 
            title="Special offer" 
            leading={<SpotIcon icon={<Gift />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Claim offer</Button>
                <LinkButton size="small">View details</LinkButton>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            Get 30% off your first month when you upgrade to our premium plan today.
          </Nudge>
        </div>
      </section>

      {/* Title Only (No Content) */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          Title Only (No Content)
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Nudges can have just a title for brief messages.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="Quick reminder: Save your work frequently" 
            leading={<SpotIcon icon={<InfoCircle />} size="small" color="white" />}
          />
          
          <Nudge 
            title="Pro tip: Use keyboard shortcuts to work faster" 
            leading={<SpotIcon icon={<LightBulb />} size="small" color="white" />}
            onClose={() => {}}
          />
        </div>
      </section>

      {/* Long Content */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          Long Content
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Nudges automatically handle longer content with proper text wrapping.
        </p>
        <div style={{ maxWidth: '600px' }}>
          <Nudge 
            title="Important information about data privacy" 
            leading={<SpotIcon icon={<InfoCircle />} size="small" color="white" />}
            actions={
              <ButtonGroup>
                <Button variant="primary" size="small">Review settings</Button>
                <LinkButton size="small">Learn more</LinkButton>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            We take your privacy seriously. Your data is encrypted and stored securely. You have full control
            over your information and can export or delete it at any time. We never share your personal data
            with third parties without your explicit consent. Review your privacy settings to customize how
            your information is used within the platform.
          </Nudge>
        </div>
      </section>

      {/* Neutral Color Variant */}
      <section>
        <h2 style={{ 
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)'
        }}>
          Neutral Spot Icon Variant
        </h2>
        <p style={{
          marginBottom: '24px',
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          SpotIcons can also use the neutral color variant for a more subdued appearance.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
          <Nudge 
            title="System notification" 
            leading={<SpotIcon icon={<Bell />} size="small" color="neutral" />}
            actions={<Button variant="secondary" size="small">View all</Button>}
          >
            You have 3 unread notifications waiting for you.
          </Nudge>

          <Nudge 
            title="Documentation updated" 
            leading={<SpotIcon icon={<Article />} size="small" color="neutral" />}
            actions={
              <ButtonGroup>
                <Button variant="secondary" size="small">Read now</Button>
                <LinkButton size="small">Dismiss</LinkButton>
              </ButtonGroup>
            }
            onClose={() => {}}
          >
            The user guide has been updated with new tutorials and examples.
          </Nudge>
        </div>
      </section>
    </div>
  );
}
