'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '../ui/button';
import { PiTrash } from 'react-icons/pi';
import { deleteAsset } from '@/server/delete-asset';
import UpdateAsset from './UpdateAsset';
import ShareAsset from './ShareAsset';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const AssetActions = ({ cid, asset }) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const handleDelete = async (cid) => {
    const res = await deleteAsset({ cid });
    if (res) {
      toast.success('Deleted Asset');
      queryClient.invalidateQueries({
        queryKey: [
          'assets',
          {
            groupId: groupId,
          },
        ],
        refetchType: 'all',
      });
    } else {
      toast.error('Failed to delete asset.');
    }
  };
  return (
    <DropdownMenu dialog={false}>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Asset Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={(e) => e.preventDefault()}>
          <UpdateAsset asset={asset} cid={cid} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(cid)}
          className='cursor-pointer hover:bg-secondary'
        >
          <PiTrash className='mr-2' />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ShareAsset cid={cid} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssetActions;
