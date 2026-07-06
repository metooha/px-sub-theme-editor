import React, { useState } from 'react';
import { Switch } from '@/components/ui/Switch';

export default function SwitchExample() {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [security, setSecurity] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <div style={{ 
      padding: '32px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '48px',
      fontFamily: 'var(--ld-semantic-font-family-sans)'
    }}>
      {/* Basic Switch */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Switch
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch 
            label="Airplane Mode" 
            checked={airplaneMode} 
            onChange={setAirplaneMode} 
          />
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--ld-semantic-color-text-secondary)',
            marginLeft: '60px'
          }}>
            Status: {airplaneMode ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </section>

      {/* All States Demonstration */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch label="Enabled - Off" checked={false} onChange={() => {}} />
          <Switch label="Enabled - On" checked={true} onChange={() => {}} />
          <Switch label="Disabled - Off" checked={false} disabled />
          <Switch label="Disabled - On" checked={true} disabled />
        </div>
      </section>

      {/* Form Settings Example */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Settings Form
        </h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          padding: '24px',
          backgroundColor: 'var(--ld-semantic-color-fill-secondary)',
          borderRadius: '8px',
          maxWidth: '500px'
        }}>
          <Switch 
            label="Marketing emails" 
            checked={marketing} 
            onChange={setMarketing}
          />
          <Switch 
            label="Security alerts (always on)" 
            checked={security} 
            onChange={setSecurity}
          />
          <Switch 
            label="Push notifications" 
            checked={notifications} 
            onChange={setNotifications}
          />
        </div>
      </section>

      {/* Uncontrolled Usage */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Uncontrolled Switch
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch label="Default off" />
          <Switch label="Default on" defaultChecked />
        </div>
      </section>

      {/* Without Label (using aria-labelledby) */}
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Custom Label Pattern
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '16px',
          border: '1px solid var(--ld-semantic-color-border-default)',
          borderRadius: '8px',
          maxWidth: '500px'
        }}>
          <div style={{ flex: 1 }}>
            <div 
              id="dark-mode-label" 
              style={{ 
                fontSize: '14px', 
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-primary)',
                marginBottom: '4px'
              }}
            >
              Dark Mode
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'var(--ld-semantic-color-text-secondary)'
            }}>
              Use dark theme across the application
            </div>
          </div>
          <Switch aria-labelledby="dark-mode-label" defaultChecked />
        </div>
      </section>
    </div>
  );
}
