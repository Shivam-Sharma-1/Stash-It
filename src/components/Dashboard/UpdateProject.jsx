import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UpdateProjectForm from './UpdateProjectForm';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';

const UpdateProject = ({ initialProjectData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} dialog={false}>
      <DialogTrigger className='w-full text-sm flex flex-row items-center justify-start gap-2 hover:bg-secondary p-2'>
        <PencilSimple className='mr-2 h-4 w-4' />
        Edit
      </DialogTrigger>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit the project</DialogTitle>
        </DialogHeader>
        <UpdateProjectForm
          setIsDialogOpen={setIsDialogOpen}
          initialProjectData={initialProjectData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProject;
