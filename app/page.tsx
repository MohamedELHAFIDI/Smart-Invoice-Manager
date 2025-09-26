import InvoiceTable from '@/components/dashboard/invoice-table';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor your invoice processing status and manage your documents
          </p>
        </div>
      </div>
      
      <InvoiceTable />
    </div>
  );
}