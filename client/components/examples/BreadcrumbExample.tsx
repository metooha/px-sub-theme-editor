import * as React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';

/**
 * Example component demonstrating Breadcrumb usage with Living Design 3.5
 */
export const BreadcrumbExample: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('Product Details');
  const [navHistory, setNavHistory] = React.useState<string[]>(['Home', 'Products', 'Electronics']);

  const handleNavigation = (page: string) => {
    console.log(`Navigating to: ${page}`);
    // In a real app, this would trigger navigation
  };

  const handleBackToRecommendations = () => {
    setCurrentPage('Recommendations List');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px', backgroundColor: '#f9fafb' }}>
      
      {/* Basic 2-level breadcrumb */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Basic Breadcrumb (2 levels)
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Breadcrumb aria-label="Basic breadcrumb navigation">
            <BreadcrumbItem onClick={() => handleNavigation('Recommendations')}>
              Recommendations
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              Recommendation details
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      {/* 3-level breadcrumb with links */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          3-Level Breadcrumb (with href links)
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Breadcrumb aria-label="Product navigation">
            <BreadcrumbItem href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/products">
              Products
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              {currentPage}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      {/* 4-level breadcrumb */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          4-Level Breadcrumb (onClick handlers)
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Breadcrumb aria-label="Category navigation">
            <BreadcrumbItem onClick={() => handleNavigation('Home')}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Products')}>
              Products
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Electronics')}>
              Electronics
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              Smartphones
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      {/* 5-level breadcrumb */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          5-Level Breadcrumb (maximum depth)
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Breadcrumb aria-label="Deep navigation">
            <BreadcrumbItem onClick={() => handleNavigation('Home')}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Products')}>
              Products
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Electronics')}>
              Electronics
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Smartphones')}>
              Smartphones
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              iPhone 15 Pro
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      {/* Custom separator */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Custom Separator
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Arrow separator (›)</p>
            <Breadcrumb separator="›" aria-label="Arrow separator navigation">
              <BreadcrumbItem onClick={() => handleNavigation('Home')}>
                Home
              </BreadcrumbItem>
              <BreadcrumbItem onClick={() => handleNavigation('Products')}>
                Products
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>
                Details
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Chevron separator (&gt;)</p>
            <Breadcrumb separator=">" aria-label="Chevron separator navigation">
              <BreadcrumbItem onClick={() => handleNavigation('Home')}>
                Home
              </BreadcrumbItem>
              <BreadcrumbItem onClick={() => handleNavigation('Products')}>
                Products
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>
                Details
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
      </section>

      {/* Interactive example */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Interactive Example (Real App Pattern)
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Breadcrumb aria-label="Recommendations navigation">
            <BreadcrumbItem onClick={handleBackToRecommendations}>
              Recommendations
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              Recommendation details
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              <strong>Current page:</strong> {currentPage}
            </p>
            <Button
              variant="primary"
              size="medium"
              onClick={handleBackToRecommendations}
            >
              Simulate "Back" Click
            </Button>
          </div>
        </div>
      </section>

      {/* Responsive example */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Responsive Behavior
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
            Resize your browser to see the breadcrumb wrap on smaller screens
          </p>
          <Breadcrumb aria-label="Responsive breadcrumb">
            <BreadcrumbItem onClick={() => handleNavigation('Home')}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Dashboard')}>
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Analytics')}>
              Analytics
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Reports')}>
              Reports
            </BreadcrumbItem>
            <BreadcrumbItem onClick={() => handleNavigation('Monthly Reports')}>
              Monthly Reports
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>
              January 2024 Sales Report
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      {/* Accessibility notes */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Accessibility Features
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <ul style={{ listStyle: 'disc', marginLeft: '24px', fontSize: '14px', lineHeight: '1.6' }}>
            <li><strong>Semantic HTML:</strong> Uses &lt;nav&gt; element with aria-label="breadcrumb"</li>
            <li><strong>Current page:</strong> Marked with aria-current="page"</li>
            <li><strong>Keyboard navigation:</strong> All links are focusable via Tab key</li>
            <li><strong>Focus indicators:</strong> Clear 2px outline on focus</li>
            <li><strong>Separators:</strong> Hidden from screen readers (aria-hidden="true")</li>
            <li><strong>Hover feedback:</strong> Underline removes on hover for visual feedback</li>
          </ul>
        </div>
      </section>

      {/* Code examples */}
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Usage Examples
        </h2>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
          <pre style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '16px', 
            borderRadius: '4px', 
            overflow: 'auto',
            fontSize: '12px',
            lineHeight: '1.5'
          }}>
{`// Basic usage with onClick
<Breadcrumb aria-label="Breadcrumb navigation">
  <BreadcrumbItem onClick={() => navigate('/home')}>
    Home
  </BreadcrumbItem>
  <BreadcrumbItem isCurrent>
    Current Page
  </BreadcrumbItem>
</Breadcrumb>

// With href links
<Breadcrumb aria-label="Product navigation">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Details</BreadcrumbItem>
</Breadcrumb>

// Custom separator
<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Page</BreadcrumbItem>
</Breadcrumb>`}
          </pre>
        </div>
      </section>

    </div>
  );
};

export default BreadcrumbExample;
