'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DOMPurify from 'dompurify';
import { updateAsset } from '@/server/update-asset';
import { Loader2 } from 'lucide-react';
import { PencilSimple } from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  asset: z
    .string()
    .min(1, {
      message: 'Asset name must be at least 1 characters.',
    })
    .transform((val) => DOMPurify.sanitize(val)),
});

const UpdateAssetForm = ({ cid, asset, setIsDialogOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: asset.metadata.name,
    },
  });

  const onSubmit = async ({ asset }) => {
    setIsLoading(true);
    const res = await updateAsset({ cid, asset });
    if (res.updatedAsset) {
      toast.success('Updated Asset');
      queryClient.invalidateQueries({
        queryKey: [
          'assets',
          {
            groupId: groupId,
          },
        ],
        refetchType: 'all',
      });
      setIsDialogOpen(false);
    } else {
      toast.error('Error updating asset');
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='asset'
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
        <Button
          className='w-full flex flex-row gap-2 items-center'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Updating Asset
              <Loader2 className='animate-spin' />
            </>
          ) : (
            <>
              Update Asset
              <PencilSimple size={22} color='#ffffff' weight='duotone' />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAssetForm;
