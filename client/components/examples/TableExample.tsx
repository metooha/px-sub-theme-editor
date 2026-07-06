import React from 'react';
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';
import { DataTableCell } from '@/components/ui/DataTableCellText';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
  { invoice: 'INV006', paymentStatus: 'Pending', totalAmount: '$200.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV007', paymentStatus: 'Unpaid', totalAmount: '$300.00', paymentMethod: 'Credit Card' },
];

export default function TableExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '16px'
        }}>
          Data Table
        </h3>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>Invoice</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
              <DataTableHeader>Method</DataTableHeader>
              <DataTableHeader alignment="right">Amount</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {invoices.map((invoice) => (
              <DataTableRow key={invoice.invoice}>
                <DataTableCell>{invoice.invoice}</DataTableCell>
                <DataTableCell>{invoice.paymentStatus}</DataTableCell>
                <DataTableCell>{invoice.paymentMethod}</DataTableCell>
                <DataTableCell variant="numeric">{invoice.totalAmount}</DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </section>
    </div>
  );
}
