import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/mock-data';
import { Invoice } from '@/lib/types';
import { Clock, Loader as Loader2, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Invoice['status'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'processing':
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case 'done':
        return <CheckCircle className="h-3 w-3" />;
      case 'failed':
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'done':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`${getStatusColor(status)} flex items-center gap-1 font-medium`}
    >
      {getIcon()}
      {getLabel()}
    </Badge>
  );
}