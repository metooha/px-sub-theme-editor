import * as React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

export function ModalExample() {
  const [smallOpen, setSmallOpen] = React.useState(false);
  const [mediumOpen, setMediumOpen] = React.useState(false);
  const [largeOpen, setLargeOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [scrollOpen, setScrollOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Size Variants */}
      <section>
        <h3 className="text-lg font-bold mb-4">Size Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Modal open={smallOpen} onOpenChange={setSmallOpen}>
            <ModalTrigger asChild>
              <Button variant="primary">Small Modal (400px)</Button>
            </ModalTrigger>
            <ModalContent size="small">
              <ModalHeader>
                <ModalTitle>Small Modal</ModalTitle>
                <ModalDescription>
                  This is a small modal with max-width of 400px. Perfect for simple confirmations or brief messages.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p className="text-sm">Content goes here...</p>
              </div>
              <ModalFooter>
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => setSmallOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setSmallOpen(false)}>
                    Confirm
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal open={mediumOpen} onOpenChange={setMediumOpen}>
            <ModalTrigger asChild>
              <Button variant="primary">Medium Modal (600px)</Button>
            </ModalTrigger>
            <ModalContent size="medium">
              <ModalHeader>
                <ModalTitle>Medium Modal</ModalTitle>
                <ModalDescription>
                  This is a medium modal with max-width of 600px. The default size for most use cases.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p className="text-sm">
                  This modal size is ideal for forms, detailed information, and most interactive content.
                  It provides enough space without overwhelming the user.
                </p>
              </div>
              <ModalFooter>
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => setMediumOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setMediumOpen(false)}>
                    Save Changes
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal open={largeOpen} onOpenChange={setLargeOpen}>
            <ModalTrigger asChild>
              <Button variant="primary">Large Modal (800px)</Button>
            </ModalTrigger>
            <ModalContent size="large">
              <ModalHeader>
                <ModalTitle>Large Modal</ModalTitle>
                <ModalDescription>
                  This is a large modal with max-width of 800px. Best for complex forms or detailed content.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p className="text-sm mb-4">
                  Large modals are perfect for complex workflows, multi-column layouts, or when you need to display
                  substantial amounts of information while keeping it focused.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-bold mb-2">Column 1</h4>
                    <p className="text-sm">Content for the first column</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-bold mb-2">Column 2</h4>
                    <p className="text-sm">Content for the second column</p>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => setLargeOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setLargeOpen(false)}>
                    Continue
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </section>

      {/* Form Example */}
      <section>
        <h3 className="text-lg font-bold mb-4">Modal with Form</h3>
        <Modal open={formOpen} onOpenChange={setFormOpen}>
          <ModalTrigger asChild>
            <Button variant="primary">Open Form Modal</Button>
          </ModalTrigger>
          <ModalContent size="medium">
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>
                Make changes to your profile here. Click save when you're done.
              </ModalDescription>
            </ModalHeader>
            <form className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-bold">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm min-h-[100px]"
                  placeholder="Tell us about yourself"
                />
              </div>
            </form>
            <ModalFooter>
              <ButtonGroup>
                <Button variant="secondary" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setFormOpen(false)}>
                  Save Changes
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      {/* Scrolling Content */}
      <section>
        <h3 className="text-lg font-bold mb-4">Modal with Scrolling Content</h3>
        <Modal open={scrollOpen} onOpenChange={setScrollOpen}>
          <ModalTrigger asChild>
            <Button variant="primary">Open Scrolling Modal</Button>
          </ModalTrigger>
          <ModalContent size="medium">
            <ModalHeader>
              <ModalTitle>Terms and Conditions</ModalTitle>
              <ModalDescription>
                Please read and accept our terms and conditions.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-4 text-sm">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                  magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                  non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <p>
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                  esse quam nihil molestiae consequatur.
                </p>
              </div>
            </div>
            <ModalFooter>
              <ButtonGroup>
                <Button variant="secondary" onClick={() => setScrollOpen(false)}>
                  Decline
                </Button>
                <Button variant="primary" onClick={() => setScrollOpen(false)}>
                  Accept
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      {/* Code Examples */}
      <section className="mt-12">
        <h3 className="text-lg font-bold mb-4">Code Examples</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-2">Basic Usage</h4>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
              <code>{`import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

function Example() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="primary">Open Modal</Button>
      </ModalTrigger>
      <ModalContent size="medium">
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>Modal description goes here.</ModalDescription>
        </ModalHeader>
        <div>Content goes here...</div>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <h4 className="font-bold mb-2">Size Variants</h4>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
              <code>{`// Small (400px)
<ModalContent size="small">...</ModalContent>

// Medium (600px) - Default
<ModalContent size="medium">...</ModalContent>

// Large (800px)
<ModalContent size="large">...</ModalContent>

// Custom width
<ModalContent maxWidth="1000px">...</ModalContent>`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
