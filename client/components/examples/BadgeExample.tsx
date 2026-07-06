import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

/**
 * BadgeExample - Demonstrates LD 3.5 Badge component usage
 * 
 * Reference: guidelines/Badge.md
 */
export function BadgeExample() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Count Badges</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Button variant="secondary" aria-label="Inbox, 5 unread messages">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Inbox
                <Badge variant="info" value={5} aria-label="5 unread" />
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" aria-label="Notifications, 12 new items">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Notifications
                <Badge variant="error" value={12} aria-label="12 new" />
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" aria-label="Cart, 3 items">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Cart
                <Badge variant="success" value={3} aria-label="3 items" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Semantic Variants</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Badge variant="info" value={1} />
            <span className="text-sm">Info</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="success" value={2} />
            <span className="text-sm">Success</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="warning" value={3} />
            <span className="text-sm">Warning</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="error" value={4} />
            <span className="text-sm">Error</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="neutral" value={5} />
            <span className="text-sm">Neutral</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Extended Color Palette</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Badge variant="blue" value={0} />
            <span className="text-sm">Blue</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="green" value={0} />
            <span className="text-sm">Green</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="red" value={0} />
            <span className="text-sm">Red</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="orange" value={0} />
            <span className="text-sm">Orange</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="purple" value={0} />
            <span className="text-sm">Purple</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="pink" value={0} />
            <span className="text-sm">Pink</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="teal" value={0} />
            <span className="text-sm">Teal</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="yellow" value={0} />
            <span className="text-sm">Yellow</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Size Variants</h2>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Badge variant="info" value={9} size="small" />
            <span className="text-sm">Small</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="info" value={9} size="medium" />
            <span className="text-sm">Medium</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Badge variant="info" value={9} size="large" />
            <span className="text-sm">Large</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Dot Badges (Status Indicators)</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Badge variant="success" aria-label="Status: active" />
            <span>Active</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="error" aria-label="Status: error" />
            <span>Error</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="warning" aria-label="Status: pending" />
            <span>Pending</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="neutral" aria-label="Status: inactive" />
            <span>Inactive</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Large Numbers</h2>
        <div className="flex items-center gap-4">
          <Badge variant="info" value={99} />
          <Badge variant="success" value={999} />
          <Badge variant="error" value="99+" />
        </div>
      </section>
    </div>
  );
}
