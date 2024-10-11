'use client';

import { handleUpload } from '@/server/handle-upload';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const FileUpload = ({ groupId, setIsModalOpen }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 10,
    accept: {
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'video/mp4': ['.mp4'],
      'video/mkv': ['.mkv'],
      'audio/mp3': ['.mp3'],
      'audio/wav': ['.wav'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        setUploading(true);
        setUploadStatus('Uploading...');

        const formData = new FormData();
        acceptedFiles.forEach((file, index) => {
          formData.append(`file${index}`, file);
        });
        formData.append('groupId', groupId);

        try {
          const result = await handleUpload(formData);
          setUploadResult(result);
          if (result.success) {
            setIsModalOpen(false);
            toast.success('Assets uploaded successfully.');
          } else if (result.errorCount) {
            toast.error(
              `${result.errorCount} assets failed to upload. Please try again later.`
            );
          }
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all  ease-in-out',
        `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`
      )}
    >
      <CardContent className='flex flex-col h-full items-center justify-center px-2 py-24 text-xs'>
        <input disabled={isUploading} {...getInputProps()} />
        <div className='flex items-center flex-col justify-center gap-4'>
          {isUploading ? (
            <>
              <Loader2 className='animate-spin' />
              Uploading...
            </>
          ) : (
            <>
              <p className='text-muted-foreground text-2xl'>
                {isDragActive
                  ? 'Drop your image here!'
                  : 'Start by uploading an image'}
              </p>
              <p className='text-muted-foreground'>
                Supported formats .jpeg .jpg .webp .png
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
