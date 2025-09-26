import { Invoice } from './types';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-15',
    amount: 1250.00,
    status: 'done',
    fileName: 'invoice_001.pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: '2024-01-16',
    amount: 875.50,
    status: 'processing',
    fileName: 'invoice_002.pdf',
    uploadedAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: '2024-01-17',
    amount: 2100.75,
    status: 'pending',
    fileName: 'invoice_003.pdf',
    uploadedAt: '2024-01-17T09:15:00Z',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    date: '2024-01-18',
    amount: 450.25,
    status: 'failed',
    fileName: 'invoice_004.pdf',
    uploadedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    date: '2024-01-19',
    amount: 1680.00,
    status: 'done',
    fileName: 'invoice_005.pdf',
    uploadedAt: '2024-01-19T11:30:00Z',
  },
];

export const getStatusColor = (status: Invoice['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'done':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};