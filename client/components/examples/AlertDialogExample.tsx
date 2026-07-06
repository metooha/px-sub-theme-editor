import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';

export default function AlertDialogExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Confirmation Dialog */}
      <section>
        <SectionHeading>Confirmation</SectionHeading>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Show Confirmation</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm your action</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to proceed with this action? You can always undo this later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Destructive Action */}
      <section>
        <SectionHeading>Destructive Action</SectionHeading>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Save Changes */}
      <section>
        <SectionHeading>Unsaved Changes</SectionHeading>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Discard Changes</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes that will be lost if you leave this page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction variant="primary">Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 'var(--ld-semantic-font-heading-medium-size, 20px)',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        lineHeight: 'var(--ld-semantic-font-heading-medium-lineHeight, 28px)',
        color: 'var(--ld-semantic-color-text, #2E2F32)',
        marginBottom: '16px',
      }}
    >
      {children}
    </h3>
  );
}
