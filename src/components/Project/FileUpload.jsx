'use client';

import { handleUpload } from '@/server/handle-upload';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { handleMultiUpload } from '@/server/handle-multifile-upload';

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isMultipleUpload: z.boolean().default(false),
});

const FileUpload = ({ groupId, setIsModalOpen }) => {
  const [isUploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      isMultipleUpload: false,
    },
  });

  const { isMultipleUpload } = form.watch();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: isMultipleUpload ? 10 : 1,
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
      'model/obj': ['.obj'],
      'model/fbx': ['.fbx'],
      'model/gltf+json': ['.gltf'],
      'model/gltf-binary': ['.glb'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const onSubmit = async (data) => {
    console.log('Submit');
    if (files.length === 0) {
      toast.error('Please select at least one file to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append('groupId', groupId);

    if (!data.isMultipleUpload) {
      formData.append('name', data.name);
      formData.append('description', data.description);
    }

    try {
      let result;
      if (data.isMultipleUpload) {
        result = await handleMultiUpload(formData);
      } else {
        result = await handleUpload(formData);
      }

      if (result.success) {
        setIsModalOpen(false);
        toast.success('Assets uploaded successfully.');
      } else if (result.errorCount) {
        toast.error(
          `${result.errorCount} assets failed to upload. Please try again later.`
        );
      }
      if (result.successCount > 0) {
        queryClient.invalidateQueries({
          queryKey: ['assets', { groupId }],
          refetchType: 'all',
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='isMultipleUpload'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg p-1'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>
                  Multiple file upload
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='-translate-y-1'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Card>
          {!isMultipleUpload && (
            <CardContent className='pt-6 space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter asset name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter asset description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          )}
          <div
            {...getRootProps()}
            className={cn(
              'hover:cursor-pointer hover:bg-secondary hover:border-primary border mx-6 mb-6 rounded-md transition-all ease-in-out',
              `${
                isDragActive ? 'animate-pulse border-primary bg-secondary' : ''
              }`
            )}
          >
            <CardContent className='flex flex-col h-full items-center justify-center px-2 py-20 text-xs'>
              <input {...getInputProps()} />
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
                        ? 'Drop your asset file here.'
                        : files.length > 0
                        ? `${files.length} file(s) selected`
                        : `Drag and drop ${
                            isMultipleUpload ? 'up to 10 files' : 'a file'
                          } here`}
                    </p>
                    <p className='text-muted-foreground'>
                      Supported formats include image, video, docs, pdf
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
        <Button type='submit' className='w-full' disabled={isUploading}>
          {isUploading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : null}
          {isUploading ? 'Uploading...' : 'Upload Assets'}
        </Button>
      </form>
    </Form>
  );
};

export default FileUpload;
