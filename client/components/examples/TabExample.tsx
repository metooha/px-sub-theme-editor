import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Tag } from '@/components/ui/Tag';

/**
 * TabExample - Demonstrates all variants of the Tab Navigation component
 * 
 * Shows:
 * - Basic 2-3 tab usage
 * - Tabs with trailing badges
 * - Controlled and uncontrolled usage
 * - Small screen responsive mode
 * - Disabled tabs
 */
export function TabExample() {
  const [selectedTab, setSelectedTab] = React.useState('overview');
  const [campaignTab, setCampaignTab] = React.useState('active');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Example 1: Basic Tabs (Uncontrolled) */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Basic Tabs (Uncontrolled)
        </h3>
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">First Tab</Tab>
            <Tab value="tab2">Second Tab</Tab>
            <Tab value="tab3">Third Tab</Tab>
          </TabList>
          
          <TabPanel value="tab1">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Content for the first tab. This is an uncontrolled example using defaultValue.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="tab2">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Content for the second tab.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="tab3">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Content for the third tab.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </section>
      
      {/* Example 2: Filled Variant (White Background) */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Filled Variant (White Background)
        </h3>
        <div style={{
          background: 'var(--ld-semantic-color-background-subtle, #f8f8f8)',
          padding: '24px',
          borderRadius: '8px',
        }}>
          <Tabs defaultValue="overview">
            <TabList variant="filled">
              <Tab value="overview">Overview</Tab>
              <Tab value="analytics">Analytics</Tab>
              <Tab value="reports">Reports</Tab>
            </TabList>

            <TabPanel value="overview">
              <div style={{
                padding: '24px',
                background: 'var(--ld-semantic-color-surface, #ffffff)',
                borderRadius: '0 0 8px 8px',
              }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                  margin: 0,
                }}>
                  The filled variant gives tabs a white surface background, ideal for use on subtle/colored page backgrounds.
                </p>
              </div>
            </TabPanel>

            <TabPanel value="analytics">
              <div style={{
                padding: '24px',
                background: 'var(--ld-semantic-color-surface, #ffffff)',
                borderRadius: '0 0 8px 8px',
              }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                  margin: 0,
                }}>
                  Analytics content with white filled tabs above.
                </p>
              </div>
            </TabPanel>

            <TabPanel value="reports">
              <div style={{
                padding: '24px',
                background: 'var(--ld-semantic-color-surface, #ffffff)',
                borderRadius: '0 0 8px 8px',
              }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                  margin: 0,
                }}>
                  Reports content.
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>

      {/* Example 3: Controlled Tabs with Counts */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Controlled Tabs with Trailing Counts
        </h3>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabList>
            <Tab value="overview">
              Overview
            </Tab>
            <Tab value="analytics">
              Analytics
            </Tab>
            <Tab value="reports">
              Reports
            </Tab>
            <Tab value="settings">
              Settings
            </Tab>
          </TabList>
          
          <TabPanel value="overview">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Overview dashboard showing key metrics and insights.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="analytics">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Detailed analytics and performance data.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="reports">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Generated reports and exports.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="settings">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Configuration and preferences.
              </p>
            </div>
          </TabPanel>
        </Tabs>
        <p style={{
          marginTop: '16px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-body-small-size)',
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          Current selection: <strong>{selectedTab}</strong>
        </p>
      </section>
      
      {/* Example 3: Tabs with Badges */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Tabs with Trailing Badges
        </h3>
        <Tabs value={campaignTab} onValueChange={setCampaignTab}>
          <TabList>
            <Tab 
              value="active"
              trailing={
                <Tag variant="secondary">
                  24
                </Tag>
              }
            >
              Active campaigns
            </Tab>
            <Tab 
              value="paused"
              trailing={
                <Tag variant="secondary">
                  8
                </Tag>
              }
            >
              Paused
            </Tab>
            <Tab 
              value="completed"
              trailing={
                <Tag variant="secondary">
                  156
                </Tag>
              }
            >
              Completed
            </Tab>
          </TabList>
          
          <TabPanel value="active">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                24 active campaigns currently running.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="paused">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                8 paused campaigns.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="completed">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                156 completed campaigns in history.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </section>
      
      {/* Example 4: Small Screen Mode */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Small Screen Mode (Full Width)
        </h3>
        <div style={{ maxWidth: '375px' }}>
          <Tabs defaultValue="home">
            <TabList smallScreen>
              <Tab value="home">Home</Tab>
              <Tab value="search">Search</Tab>
              <Tab value="cart">Cart</Tab>
              <Tab value="account">Account</Tab>
            </TabList>
            
            <TabPanel value="home">
              <div style={{ padding: '24px 0' }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Home screen content. Tabs fill width evenly on small screens.
                </p>
              </div>
            </TabPanel>
            
            <TabPanel value="search">
              <div style={{ padding: '24px 0' }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Search interface.
                </p>
              </div>
            </TabPanel>
            
            <TabPanel value="cart">
              <div style={{ padding: '24px 0' }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Shopping cart.
                </p>
              </div>
            </TabPanel>
            
            <TabPanel value="account">
              <div style={{ padding: '24px 0' }}>
                <p style={{
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                  fontSize: 'var(--ld-semantic-font-body-medium-size)',
                  lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                  color: 'var(--ld-semantic-color-text)',
                }}>
                  Account settings.
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
      
      {/* Example 5: Disabled Tab */}
      <section>
        <h3 style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: 'var(--ld-semantic-font-heading-small-size-b-s)',
          fontWeight: 'var(--ld-semantic-font-heading-small-weight-default)',
          lineHeight: 'var(--ld-semantic-font-heading-small-line-height-b-s)',
          marginBottom: '24px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Tabs with Disabled State
        </h3>
        <Tabs defaultValue="available">
          <TabList>
            <Tab value="available">Available</Tab>
            <Tab value="locked" disabled>
              Locked
            </Tab>
            <Tab value="premium" disabled>
              Premium Only
            </Tab>
          </TabList>
          
          <TabPanel value="available">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                This tab is available to all users.
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="locked">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Locked content (should not be accessible).
              </p>
            </div>
          </TabPanel>
          
          <TabPanel value="premium">
            <div style={{ padding: '24px 0' }}>
              <p style={{
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: 'var(--ld-semantic-font-body-medium-size)',
                lineHeight: 'var(--ld-semantic-font-body-medium-line-height)',
                color: 'var(--ld-semantic-color-text)',
              }}>
                Premium content (should not be accessible).
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
}
