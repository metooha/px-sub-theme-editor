import React from 'react';
import {
  Modal as Dialog,
  ModalContent as DialogContent,
  ModalDescription as DialogDescription,
  ModalHeader as DialogHeader,
  ModalTitle as DialogTitle,
  ModalTrigger as DialogTrigger,
  ModalFooter as DialogFooter,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

export default function DialogExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Dialog
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div style={{ display: 'grid', gap: '16px', paddingTop: '16px', paddingBottom: '16px' }}>
              <TextField
                label="Name"
                defaultValue="Pedro Duarte"
              />
              <TextField
                label="Username"
                defaultValue="@peduarte"
              />
            </div>
            <DialogFooter>
              <Button variant="primary">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Simple Dialog
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Show Message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Important Message</DialogTitle>
              <DialogDescription>
                This is a simple dialog that displays important information to the user.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
