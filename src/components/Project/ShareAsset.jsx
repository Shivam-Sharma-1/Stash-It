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
import shareAsset from '@/server/share-asset';
import { Share, ShareFat } from '@phosphor-icons/react/dist/ssr';
import CopyLink from './CopyLink';

const ShareAsset = ({ cid }) => {
  const [shareUrl, setShareUrl] = useState(null);
  async function getShareUrl() {
    const shareUrlResponse = await shareAsset(cid);
    setShareUrl(shareUrlResponse);
  }
  return (
    <Dialog>
      <DialogTrigger
        onClick={getShareUrl}
        className='w-full text-sm flex flex-row items-center justify-start hover:bg-secondary px-2 py-1.5'
      >
        <ShareFat className='mr-2 h-4 w-4' />
        Share
      </DialogTrigger>
      <DialogContent className='w-fit'>
        <DialogHeader>
          <DialogTitle className='w-fit'>Share this url</DialogTitle>
        </DialogHeader>
        <CopyLink text={shareUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default ShareAsset;
