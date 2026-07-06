import * as React from 'react';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import { Alert } from '@/components/ui/Alert';

/**
 * Example component demonstrating Panel usage patterns
 */
export default function PanelExample() {
  const [openPanels, setOpenPanels] = React.useState<Record<string, boolean>>({});

  const openPanel = (key: string) => {
    setOpenPanels(prev => ({ ...prev, [key]: true }));
  };

  const closePanel = (key: string) => {
    setOpenPanels(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Size Variants */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Size Variants</h3>
        <p className="text-sm text-[#74767C] mb-4">
          Panels come in three sizes: small (320px), medium (420px), and large (600px). 
          On mobile (&lt;900px), all panels use viewport width - 24px.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => openPanel('small')}>
            Open Small Panel
          </Button>
          <Button variant="primary" onClick={() => openPanel('medium')}>
            Open Medium Panel
          </Button>
          <Button variant="primary" onClick={() => openPanel('large')}>
            Open Large Panel
          </Button>
        </div>

        {/* Small Panel */}
        <Panel
          isOpen={openPanels['small']}
          onClose={() => closePanel('small')}
          title="Small Panel"
          size="small"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => closePanel('small')}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => closePanel('small')}>
                Confirm
              </Button>
            </ButtonGroup>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-[#2E2F32]">
              This is a small panel (320px wide on desktop). Perfect for simple forms or quick actions.
            </p>
            <Alert variant="info">
              Small panels are ideal for focused tasks with minimal content.
            </Alert>
          </div>
        </Panel>

        {/* Medium Panel */}
        <Panel
          isOpen={openPanels['medium']}
          onClose={() => closePanel('medium')}
          title="Medium Panel"
          size="medium"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => closePanel('medium')}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => closePanel('medium')}>
                Save
              </Button>
            </ButtonGroup>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-[#2E2F32]">
              This is a medium panel (420px wide on desktop). This is the default size and works well 
              for most use cases.
            </p>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E2F32]">Features:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-[#2E2F32]">
                <li>Adequate space for form fields</li>
                <li>Good for settings and configurations</li>
                <li>Balances content with screen real estate</li>
              </ul>
            </div>
          </div>
        </Panel>

        {/* Large Panel */}
        <Panel
          isOpen={openPanels['large']}
          onClose={() => closePanel('large')}
          title="Large Panel"
          size="large"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => closePanel('large')}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => closePanel('large')}>
                Apply
              </Button>
            </ButtonGroup>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-[#2E2F32]">
              This is a large panel (600px wide on desktop). Best for complex content, 
              data tables, or detailed information displays.
            </p>
            <Alert variant="info">
              Large panels provide more room for complex layouts and detailed content.
            </Alert>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#2E2F32]">Ideal for:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-[#2E2F32]">
                <li>Complex multi-step forms</li>
                <li>Data tables and lists</li>
                <li>Detailed product information</li>
                <li>Rich text editing interfaces</li>
              </ul>
            </div>
          </div>
        </Panel>
      </section>

      {/* Position Variants */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Position Variants</h3>
        <p className="text-sm text-[#74767C] mb-4">
          Panels can slide in from the left or right side of the viewport.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" onClick={() => openPanel('left')}>
            Open from Left
          </Button>
          <Button variant="secondary" onClick={() => openPanel('right')}>
            Open from Right
          </Button>
        </div>

        {/* Left Panel */}
        <Panel
          isOpen={openPanels['left']}
          onClose={() => closePanel('left')}
          title="Left Panel"
          position="left"
          size="medium"
          actions={
            <Button variant="primary" onClick={() => closePanel('left')}>
              Close
            </Button>
          }
        >
          <p className="text-sm text-[#2E2F32]">
            This panel slides in from the left side. Left-positioned panels can be useful 
            for navigation menus or secondary content that complements the main view.
          </p>
        </Panel>

        {/* Right Panel */}
        <Panel
          isOpen={openPanels['right']}
          onClose={() => closePanel('right')}
          title="Right Panel"
          position="right"
          size="medium"
          actions={
            <Button variant="primary" onClick={() => closePanel('right')}>
              Close
            </Button>
          }
        >
          <p className="text-sm text-[#2E2F32]">
            This panel slides in from the right side (default position). Right-positioned 
            panels are commonly used for settings, details, and supplementary information.
          </p>
        </Panel>
      </section>

      {/* With and Without Actions */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Optional Actions Footer</h3>
        <p className="text-sm text-[#74767C] mb-4">
          The actions footer is optional. Omit the actions prop to hide the footer section.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => openPanel('with-actions')}>
            With Actions
          </Button>
          <Button variant="primary" onClick={() => openPanel('no-actions')}>
            No Actions
          </Button>
        </div>

        {/* With Actions */}
        <Panel
          isOpen={openPanels['with-actions']}
          onClose={() => closePanel('with-actions')}
          title="Panel with Actions"
          size="medium"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => closePanel('with-actions')}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => closePanel('with-actions')}>
                Delete
              </Button>
            </ButtonGroup>
          }
        >
          <p className="text-sm text-[#2E2F32]">
            This panel has an actions footer with buttons. Use this pattern when you need 
            primary/secondary actions that should always be visible.
          </p>
        </Panel>

        {/* No Actions */}
        <Panel
          isOpen={openPanels['no-actions']}
          onClose={() => closePanel('no-actions')}
          title="Panel without Actions"
          size="medium"
        >
          <div className="space-y-4">
            <p className="text-sm text-[#2E2F32]">
              This panel has no actions footer. The divider and footer section are completely 
              hidden. Use this pattern for informational panels or when actions are embedded 
              in the content area.
            </p>
            <Button variant="primary" onClick={() => closePanel('no-actions')}>
              Embedded Action Button
            </Button>
          </div>
        </Panel>
      </section>

      {/* Form Example */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Form Example</h3>
        <p className="text-sm text-[#74767C] mb-4">
          Example of a panel used for a form with multiple fields.
        </p>
        <Button variant="primary" onClick={() => openPanel('form')}>
          Open Form Panel
        </Button>

        <Panel
          isOpen={openPanels['form']}
          onClose={() => closePanel('form')}
          title="Edit Settings"
          size="medium"
          actions={
            <ButtonGroup>
              <Button variant="secondary" onClick={() => closePanel('form')}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => closePanel('form')}>
                Save Changes
              </Button>
            </ButtonGroup>
          }
        >
          <div className="space-y-6 w-full">
            <Alert variant="info">
              Make changes to your account settings here. Click save when you're done.
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2E2F32]" htmlFor="name">
                  Display Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-[#BABBBE] rounded text-sm"
                  defaultValue="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2E2F32]" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-[#BABBBE] rounded text-sm"
                  defaultValue="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2E2F32] mb-3">
                  Preferences
                </label>
                <div className="flex flex-col gap-3">
                  <Checkbox
                    label="Receive email notifications"
                    defaultChecked
                  />
                  <Checkbox
                    label="Enable two-factor authentication"
                  />
                  <Checkbox
                    label="Show online status"
                    defaultChecked
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2E2F32]" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  placeholder="Tell us about yourself"
                  className="w-full px-3 py-2 border border-[#BABBBE] rounded text-sm resize-none"
                  defaultValue="Product manager passionate about building great user experiences."
                />
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* Scrollable Content */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Scrollable Content</h3>
        <p className="text-sm text-[#74767C] mb-4">
          Panel content area is scrollable when content exceeds available height.
        </p>
        <Button variant="primary" onClick={() => openPanel('scrollable')}>
          Open Scrollable Panel
        </Button>

        <Panel
          isOpen={openPanels['scrollable']}
          onClose={() => closePanel('scrollable')}
          title="Long Content Panel"
          size="medium"
          actions={
            <Button variant="primary" onClick={() => closePanel('scrollable')}>
              Got it
            </Button>
          }
        >
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div key={num} className="space-y-2">
                <h4 className="text-sm font-bold text-[#2E2F32]">Section {num}</h4>
                <p className="text-sm text-[#2E2F32]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* Custom Title */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Custom Title</h3>
        <p className="text-sm text-[#74767C] mb-4">
          The title prop accepts React nodes, allowing for custom title layouts.
        </p>
        <Button variant="primary" onClick={() => openPanel('custom-title')}>
          Open Panel with Custom Title
        </Button>

        <Panel
          isOpen={openPanels['custom-title']}
          onClose={() => closePanel('custom-title')}
          title={
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#2E2F32]">Custom Title Layout</h2>
              <p className="text-sm text-[#74767C]">With subtitle and metadata</p>
            </div>
          }
          size="medium"
          ariaLabel="Custom Title Panel"
        >
          <p className="text-sm text-[#2E2F32]">
            You can pass custom JSX to the title prop to create more complex header layouts, 
            including subtitles, badges, or other metadata. Just make sure to provide an ariaLabel 
            prop for accessibility.
          </p>
        </Panel>
      </section>

      {/* Code Examples */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-[#2E2F32]">Usage Examples</h3>
        <div className="bg-[#F4F5F5] p-4 rounded-lg border border-[#E3E4E5]">
          <pre className="text-xs font-mono overflow-x-auto">
            <code>{`import { Panel } from '@/components/ui/Panel';
import { Button, ButtonGroup } from '@/components/ui/Button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Panel
      </Button>
      
      <Panel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
        size="medium"
        position="right"
        actions={
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </ButtonGroup>
        }
      >
        <p>Panel content goes here...</p>
      </Panel>
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
