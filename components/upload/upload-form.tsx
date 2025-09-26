'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, File, X, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Loader as Loader2 } from 'lucide-react';
import { UploadProgress } from '@/lib/types';

export default function UploadForm() {
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Simulate file upload process
  const simulateUpload = (file: File) => {
    const uploadId = Math.random().toString(36).substr(2, 9);
    const uploadItem: UploadProgress = {
      fileName: file.name,
      progress: 0,
      status: 'uploading',
    };

    setUploadQueue(prev => [...prev, uploadItem]);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadQueue(prev => prev.map(item => {
        if (item.fileName === file.name && item.status === 'uploading') {
          const newProgress = Math.min(item.progress + Math.random() * 15, 100);
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            
            // Simulate processing phase
            setTimeout(() => {
              setUploadQueue(prev => prev.map(prevItem => 
                prevItem.fileName === file.name 
                  ? { ...prevItem, status: 'processing', progress: 100 }
                  : prevItem
              ));

              // Simulate completion or error
              setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                setUploadQueue(prev => prev.map(prevItem => 
                  prevItem.fileName === file.name 
                    ? { 
                        ...prevItem, 
                        status: success ? 'completed' : 'error',
                        error: success ? undefined : 'Processing failed. Please try again.'
                      }
                    : prevItem
                ));
              }, 2000 + Math.random() * 3000);
            }, 1000);

            return { ...item, progress: 100, status: 'processing' };
          }
          
          return { ...item, progress: newProgress };
        }
        return item;
      }));
    }, 200);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragActive(false);
    
    acceptedFiles.forEach((file) => {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setUploadQueue(prev => [...prev, {
          fileName: file.name,
          progress: 0,
          status: 'error',
          error: 'Only PDF files are allowed'
        }]);
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadQueue(prev => [...prev, {
          fileName: file.name,
          progress: 0,
          status: 'error',
          error: 'File size must be less than 10MB'
        }]);
        return;
      }

      simulateUpload(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFromQueue = (fileName: string) => {
    setUploadQueue(prev => prev.filter(item => item.fileName !== fileName));
  };

  const clearCompleted = () => {
    setUploadQueue(prev => prev.filter(item => 
      item.status !== 'completed' && item.status !== 'error'
    ));
  };

  const getStatusIcon = (status: UploadProgress['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (item: UploadProgress) => {
    switch (item.status) {
      case 'uploading':
        return `Uploading... ${Math.round(item.progress)}%`;
      case 'processing':
        return 'Processing invoice...';
      case 'completed':
        return 'Upload completed successfully';
      case 'error':
        return item.error || 'Upload failed';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Invoice PDFs</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive || dropzoneActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            
            {isDragActive || dropzoneActive ? (
              <div>
                <p className="text-lg font-medium text-blue-600">
                  Drop your PDF files here
                </p>
                <p className="text-sm text-blue-500 mt-1">
                  We'll process them automatically
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drag & drop PDF files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports multiple files, max 10MB each
                </p>
              </div>
            )}
          </div>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Only PDF files are accepted. Each file will be automatically processed 
              to extract invoice data including invoice number, date, and amount.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Upload Queue */}
      {uploadQueue.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upload Progress</CardTitle>
            <Button 
              onClick={clearCompleted}
              variant="outline" 
              size="sm"
              disabled={uploadQueue.every(item => 
                item.status === 'uploading' || item.status === 'processing'
              )}
            >
              Clear Completed
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadQueue.map((item, index) => (
              <div key={`${item.fileName}-${index}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-sm truncate max-w-xs">
                      {item.fileName}
                    </span>
                    {getStatusIcon(item.status)}
                  </div>
                  
                  <Button
                    onClick={() => removeFromQueue(item.fileName)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                {item.status !== 'error' && (
                  <Progress value={item.progress} className="h-2" />
                )}
                
                <p className={`text-xs ${
                  item.status === 'error' 
                    ? 'text-red-600' 
                    : item.status === 'completed'
                    ? 'text-green-600'
                    : 'text-gray-600'
                }`}>
                  {getStatusText(item)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}