import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

export default function TabsExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          Basic Tabs
        </h3>
        <Tabs defaultValue="account">
          <TabList>
            <Tab value="account">Account</Tab>
            <Tab value="password">Password</Tab>
          </TabList>
          <TabPanel value="account">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Account Settings</h4>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Make changes to your account here. Click save when you're done.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="password">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Password Settings</h4>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          Multiple Tabs
        </h3>
        <Tabs defaultValue="overview">
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="analytics">Analytics</Tab>
            <Tab value="reports">Reports</Tab>
            <Tab value="notifications">Notifications</Tab>
          </TabList>
          <TabPanel value="overview">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Overview content goes here.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="analytics">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Analytics content goes here.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="reports">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Reports content goes here.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="notifications">
            <div style={{ padding: '24px', border: '1px solid var(--ld-semantic-color-border-subtlest, #E8E9EB)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                Notifications content goes here.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
}
