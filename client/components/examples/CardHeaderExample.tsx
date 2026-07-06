import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Button } from '@/components/ui/Button';
import { Home, CheckCircle, InfoCircle } from '@/components/icons';

/**
 * Example component demonstrating CardHeader usage with Living Design 3.5
 * ✅ Uses only icons from the centralized icon library
 * ✅ Uses only LD Button components (no inline styled buttons)
 * ✅ Uses semantic design tokens throughout
 */
export const CardHeaderExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Example 1: Basic CardHeader with title only */}
      <Card size="small">
        <CardHeader title="Simple Card Title" />
        <CardContent>
          This is a basic card with just a title in the header.
        </CardContent>
      </Card>

      {/* Example 2: CardHeader with leading icon from library */}
      <Card size="small">
        <CardHeader
          leadingIcon={<Home style={{ width: 20, height: 20 }} />}
          title="Card with Icon"
        />
        <CardContent>
          This card has a leading icon (Home) from the icon library.
        </CardContent>
      </Card>

      {/* Example 3: CardHeader with trailing LD Button */}
      <Card size="small">
        <CardHeader
          title="Card with Action"
          trailing={
            <Button variant="primary" size="small">
              Action
            </Button>
          }
        />
        <CardContent>
          This card has a trailing LD Button in the header for quick actions.
        </CardContent>
      </Card>

      {/* Example 4: Large card with icon, title, and trailing button */}
      <Card size="large">
        <CardHeader
          leadingIcon={<CheckCircle style={{ width: 24, height: 24 }} />}
          title="Welcome Onboard"
          trailing={
            <Button variant="secondary" size="small">
              Start Here
            </Button>
          }
        />
        <CardContent>
          This is a large card with a leading icon (CheckCircle), title, and trailing LD Button.
          The larger size provides more generous spacing and emphasizes the content.
        </CardContent>
      </Card>

      {/* Example 5: Long title example with icon library */}
      <Card size="small">
        <CardHeader
          leadingIcon={<InfoCircle style={{ width: 20, height: 20 }} />}
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim magna id tortor pharetra laoreet."
          trailing={
            <Button variant="tertiary" size="small">
              Learn More
            </Button>
          }
        />
        <CardContent>
          This card demonstrates how the CardHeader handles long titles while
          maintaining proper layout and keeping the trailing content accessible.
        </CardContent>
      </Card>
    </div>
  );
};
