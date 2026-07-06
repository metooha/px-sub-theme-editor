'use client';

import React, { useState } from 'react';
import { Select, SelectItem, SelectLabel, SelectGroup, SelectSeparator } from '@/components/ui/Select';

/**
 * SelectExample - Comprehensive demonstration of all Select component variants
 * 
 * This component showcases:
 * - Size variants (small, large)
 * - Error states
 * - Magic (AI) variant
 * - Helper text
 * - Disabled states
 * - Grouped options
 * - All interactive states
 */
export function SelectExample() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [value8, setValue8] = useState('');

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700' }}>
        Living Design 3.5 Select Component
      </h1>

      {/* Size Variants */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Size Variants
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Small</h3>
            <Select
              label="Category"
              size="small"
              value={value1}
              onValueChange={setValue1}
              placeholder="Select a category..."
            >
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Large (Default)</h3>
            <Select
              label="Category"
              size="large"
              value={value2}
              onValueChange={setValue2}
              placeholder="Select a category..."
            >
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      {/* Error States */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Error States
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Small with Error</h3>
            <Select
              label="Payment Method"
              size="small"
              value={value3}
              onValueChange={setValue3}
              error={true}
              errorMessage="Please select a payment method"
              required
            >
              <SelectItem value="credit">Credit Card</SelectItem>
              <SelectItem value="debit">Debit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Large with Error</h3>
            <Select
              label="Shipping Method"
              size="large"
              value={value4}
              onValueChange={setValue4}
              error={true}
              errorMessage="Shipping method is required for checkout"
              required
            >
              <SelectItem value="standard">Standard Shipping</SelectItem>
              <SelectItem value="express">Express Shipping</SelectItem>
              <SelectItem value="overnight">Overnight Shipping</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      {/* Magic (AI) Variant */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Magic (AI-Assisted) Variant
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Small with Magic</h3>
            <Select
              label="AI Recommendation"
              size="small"
              isMagic={true}
              value={value5}
              onValueChange={setValue5}
              helperText="AI suggests based on your browsing history"
            >
              <SelectItem value="recommended">Top Recommendation</SelectItem>
              <SelectItem value="popular">Popular Choice</SelectItem>
              <SelectItem value="trending">Trending Now</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Large with Magic</h3>
            <Select
              label="Smart Filter"
              size="large"
              isMagic={true}
              value={value6}
              onValueChange={setValue6}
              helperText="AI-powered filtering for best results"
            >
              <SelectItem value="best-match">Best Match (AI)</SelectItem>
              <SelectItem value="personalized">Personalized for You</SelectItem>
              <SelectItem value="trending">Trending in Your Area</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Disabled States
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Small Disabled</h3>
            <Select
              label="Region"
              size="small"
              disabled={true}
              defaultValue="us"
            >
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="mx">Mexico</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Large Disabled</h3>
            <Select
              label="Store Location"
              size="large"
              disabled={true}
              defaultValue="nyc"
            >
              <SelectItem value="nyc">New York City</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="chi">Chicago</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Disabled with Error</h3>
            <Select
              label="Unavailable Option"
              size="large"
              disabled={true}
              error={true}
              errorMessage="This feature is currently unavailable"
            >
              <SelectItem value="opt1">Option 1</SelectItem>
              <SelectItem value="opt2">Option 2</SelectItem>
            </Select>
          </div>

          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Disabled Magic</h3>
            <Select
              label="AI Feature"
              size="large"
              disabled={true}
              isMagic={true}
              helperText="AI features coming soon"
            >
              <SelectItem value="ai1">AI Option 1</SelectItem>
              <SelectItem value="ai2">AI Option 2</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      {/* Grouped Options */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Grouped Options
        </h2>
        
        <div style={{ maxWidth: '400px' }}>
          <Select
            label="Product Category"
            size="large"
            value={value7}
            onValueChange={setValue7}
            placeholder="Select a product..."
          >
            <SelectGroup>
              <SelectLabel>Electronics</SelectLabel>
              <SelectItem value="laptop">Laptops</SelectItem>
              <SelectItem value="phone">Smartphones</SelectItem>
              <SelectItem value="tablet">Tablets</SelectItem>
            </SelectGroup>
            
            <SelectSeparator />
            
            <SelectGroup>
              <SelectLabel>Clothing</SelectLabel>
              <SelectItem value="mens">Men's Clothing</SelectItem>
              <SelectItem value="womens">Women's Clothing</SelectItem>
              <SelectItem value="kids">Kids' Clothing</SelectItem>
            </SelectGroup>
            
            <SelectSeparator />
            
            <SelectGroup>
              <SelectLabel>Home & Garden</SelectLabel>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="decor">Home Decor</SelectItem>
              <SelectItem value="garden">Garden Tools</SelectItem>
            </SelectGroup>
          </Select>
        </div>
      </section>

      {/* With Helper Text */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          With Helper Text
        </h2>
        
        <div style={{ maxWidth: '400px' }}>
          <Select
            label="Subscription Plan"
            size="large"
            value={value8}
            onValueChange={setValue8}
            helperText="You can change your plan at any time"
          >
            <SelectItem value="free">Free - $0/month</SelectItem>
            <SelectItem value="basic">Basic - $9.99/month</SelectItem>
            <SelectItem value="pro">Pro - $19.99/month</SelectItem>
            <SelectItem value="enterprise">Enterprise - Custom pricing</SelectItem>
          </Select>
        </div>
      </section>

      {/* All States Demo */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
          Interactive States Demo
        </h2>
        <p style={{ marginBottom: '16px', color: '#515357' }}>
          Hover, focus, and interact with the selects below to see all interactive states:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <Select label="Default" size="small">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </Select>

          <Select label="With Magic" size="small" isMagic={true}>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </Select>

          <Select label="With Error" size="small" error={true} errorMessage="Error state">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </Select>

          <Select label="Disabled" size="small" disabled={true}>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </Select>
        </div>
      </section>
    </div>
  );
}

export default SelectExample;
