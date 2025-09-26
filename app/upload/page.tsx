import UploadForm from '@/components/upload/upload-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Invoices</h1>
          <p className="text-gray-600 mt-1">
            Upload your PDF invoices for automatic processing and data extraction
          </p>
        </div>
      </div>
      
      <UploadForm />
    </div>
  );
}