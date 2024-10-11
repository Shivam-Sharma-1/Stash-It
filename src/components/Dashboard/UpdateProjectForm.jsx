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
import { updateProject } from '@/server/update-project';
import { Switch } from '../ui/switch';
import { useState } from 'react';
import { PencilSimple } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  project: z
    .string()
    .min(1, {
      message: 'Project name must be at least 1 characters.',
    })
    .transform((val) => DOMPurify.sanitize(val)),
  isPublic: z.boolean().default(false),
});

const UpdateProjectForm = ({ initialProjectData, setIsDialogOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: initialProjectData.name,
      isPublic: initialProjectData.isPublic,
    },
  });

  const onSubmit = async ({ project, isPublic }) => {
    setIsLoading(true);
    const { groupId } = initialProjectData;
    const res = await updateProject({ groupId, project, isPublic });
    if (res.updatedProject) {
      toast.success('Updated Project: ' + project);
    } else {
      toast.error('An error occured while updating your project');
    }
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                <FormLabel className='text-base'>
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
                  {...field}
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
              Updating Project
              <Loader2 className='animate-spin' />
            </>
          ) : (
            <>
              Update Project
              <PencilSimple size={22} color='#ffffff' weight='duotone' />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProjectForm;
