'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FileUpload from './FileUpload';
import { Button } from '../ui/button';
import { Upload } from '@phosphor-icons/react/dist/ssr';

export const UploadFile = ({ groupId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Upload size={22} className='mr-2' /> Upload assets{' '}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload an asset</DialogTitle>
          </DialogHeader>
          <FileUpload setIsModalOpen={setIsOpen} groupId={groupId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
