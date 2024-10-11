'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DOMPurify from 'dompurify';
import { Switch } from '../ui/switch';
import { createProject } from '@/server/create-project';
import { FolderPlus } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';

const formSchema = z.object({
  project: z
    .string()
    .min(2, {
      message: 'Project name must have atleast 2 characters.',
    })
    .transform((val) => DOMPurify.sanitize(val)),
  isPublic: z.boolean().default(false),
});

const NewProjectForm = ({ setIsDialogOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: '',
      isPublic: false,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: ({ project, isPublic }) => createProject({ project, isPublic }),
    onSuccess: ({ newProject }) => {
      console.log('Project created:', newProject);
      console.log('Invalidating projects query');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Created Project: ' + newProject.name);
    },
    onSettled: () => {
      console.log('Refetching projects query');
      queryClient.refetchQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast.error('An error occured while creating your project');
    },
  });

  const onSubmit = async ({ project, isPublic }) => {
    setIsLoading(true);
    await handleSubmit({ project, isPublic });
    setIsLoading(false);
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='project'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter project name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isPublic'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base text-foreground'>
                  Is the project public?
                </FormLabel>
                <FormDescription>
                  Provide access for users across the globe to see your project.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className='w-full flex flex-row gap-2 items-center'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Creating Project
              <Loader2 className='animate-spin' />
            </>
          ) : (
            <>
              Create Project
              <FolderPlus size={22} color='#ffffff' weight='duotone' />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
