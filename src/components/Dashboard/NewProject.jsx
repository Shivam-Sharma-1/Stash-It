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
import NewProjectForm from './NewProjectForm';
import { Button } from '../ui/button';
import { FolderPlus } from '@phosphor-icons/react/dist/ssr';

const NewProject = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog
      dialog={false}
      open={isDialogOpen}
      onOpenChange={(open) => setIsDialogOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant='outline' className='flex flex-row gap-2 items-center'>
          Create Project
          <FolderPlus size={26} weight='duotone' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <NewProjectForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
