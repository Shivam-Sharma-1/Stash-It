'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { deleteProject } from '@/server/delete-project';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const DeleteProjectButton = ({ projectData }) => {
  const { groupId: groupIdParam } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: handleDeleteMutation } = useMutation({
    mutationFn: (groupId) => deleteProject({ groupId }),
    onSuccess: ({ deletedProject }) => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
        refetchType: 'all',
      });
      toast.success('Deleted Project: ' + deletedProject.name);
    },
    onSettled: () => {
      setIsLoading(false);
      setIsDialogOpen(false);
      if (groupIdParam) {
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      toast.error('An error occured while deleting your project');
    },
  });

  const handleDelete = async (groupId) => {
    setIsLoading(true);
    const res = await handleDeleteMutation(groupId);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} dialog={false}>
      <DialogTrigger className='w-full text-sm flex flex-row items-center justify-start gap-2 hover:bg-secondary p-2'>
        <Trash className='mr-2 h-4 w-4' />
        Delete
      </DialogTrigger>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this project?
        </DialogDescription>
        <Button
          className='flex flex-row items-center gap-2'
          disabled={isLoading}
          onClick={() => handleDelete(projectData.groupId)}
        >
          {isLoading ? (
            <>
              Deleting Project
              <Loader2 className='animate-spin' />
            </>
          ) : (
            <>
              <Trash size={22} color='#ffffff' weight='duotone' />
              Delete Project
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectButton;
