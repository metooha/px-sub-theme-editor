import React from 'react';
import { Rating } from '@/components/ui/Rating';

export const RatingExample: React.FC = () => {
  const ratingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return (
    <div className="space-y-8">
      {/* Header with documentation link */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-[#2E2F32]">Rating</h3>
        <p className="text-[#46474A] mb-2">
          Ratings provide insight into how well a product or service has been received by those who have bought or used it previously.
        </p>
        <a
          href="https://digitaltoolkit.livingdesign.walmart.com/components/rating/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline', fontSize: '0.875rem' }}
        >
          View Living Design 3.5 Documentation →
        </a>
      </div>

      {/* Size Variants */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-[#2E2F32]">Size Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Small Size Column */}
          <div>
            <h5 className="text-md font-medium mb-3 text-[#46474A]">Small (Default)</h5>
            <p className="text-sm text-[#74767C] mb-4">12×12px stars - Default use of the rating component</p>
            <div className="space-y-3">
              {ratingValues.map((value) => (
                <div key={`small-${value}`} className="flex items-center gap-3">
                  <Rating value={value} size="small" />
                  <span className="text-sm text-[#46474A] min-w-[80px]">
                    {value} {value === 1 ? 'star' : 'stars'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Large Size Column */}
          <div>
            <h5 className="text-md font-medium mb-3 text-[#46474A]">Large</h5>
            <p className="text-sm text-[#74767C] mb-4">20×20px stars - Use when rating requires increased prominence</p>
            <div className="space-y-3">
              {ratingValues.map((value) => (
                <div key={`large-${value}`} className="flex items-center gap-3">
                  <Rating value={value} size="large" />
                  <span className="text-sm text-[#46474A] min-w-[80px]">
                    {value} {value === 1 ? 'star' : 'stars'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-[#2E2F32]">Usage Examples</h4>
        <div className="bg-[#F7F8F9] rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#2E2F32]">Product Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={4.5} size="small" />
              <span className="text-sm text-[#46474A]">(4.5 out of 5)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-[#2E2F32]">Featured Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={4.5} size="large" />
              <span className="text-sm text-[#46474A]">(4.5 out of 5)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-[#2E2F32]">Average Customer Rating</p>
            <div className="flex items-center gap-2">
              <Rating value={3.5} size="small" />
              <span className="text-sm text-[#46474A]">Based on 1,234 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Design Tokens */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-[#2E2F32]">Design Tokens</h4>
        <div className="bg-[#F7F8F9] rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: '#FFC220' }}></div>
            <div>
              <p className="text-sm font-medium text-[#2E2F32]">Star Fill</p>
              <p className="text-xs text-[#74767C] font-mono">
                var(--ld-semantic-color-rating-fill) / #FFC220
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2" style={{ borderColor: '#CC851A' }}></div>
            <div>
              <p className="text-sm font-medium text-[#2E2F32]">Star Border</p>
              <p className="text-xs text-[#74767C] font-mono">
                var(--ld-semantic-color-rating-border) / #CC851A
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Props API */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-[#2E2F32]">Props</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#E6E6E8]">
            <thead className="bg-[#F7F8F9]">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-[#2E2F32] border-b border-[#E6E6E8]">
                  Prop
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[#2E2F32] border-b border-[#E6E6E8]">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[#2E2F32] border-b border-[#E6E6E8]">
                  Default
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[#2E2F32] border-b border-[#E6E6E8]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-[#E6E6E8]">
                  value
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  number
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  required
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  Rating value between 0 and 5, supports 0.5 increments
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-[#E6E6E8]">
                  size
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  'small' | 'large'
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  'small'
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  Size variant of the rating stars
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-[#0071DC] border-b border-[#E6E6E8]">
                  className
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  string
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  ''
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A] border-b border-[#E6E6E8]">
                  Additional CSS classes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono" style={{ color: 'var(--ld-semantic-color-text, #2e2f32)' }}>
                  aria-label
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A]">
                  string
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A]">
                  auto-generated
                </td>
                <td className="px-4 py-2 text-sm text-[#46474A]">
                  Custom accessible label for screen readers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Examples */}
      <div>
        <h4 className="text-lg font-medium mb-4 text-[#2E2F32]">Code Examples</h4>
        <div className="space-y-4">
          <div className="bg-[#2E2F32] rounded-lg p-4">
            <pre className="text-sm text-white overflow-x-auto">
              <code>{`import { Rating } from '@/components/ui/Rating';

// Basic usage
<Rating value={4.5} />

// Large size
<Rating value={4.5} size="large" />

// With custom aria-label
<Rating value={3.5} aria-label="Average rating: 3.5 stars" />

// With className
<Rating value={5} className="my-custom-class" />`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
