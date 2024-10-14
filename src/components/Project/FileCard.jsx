'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { File, FileArchive, FileAudio, Video } from '@phosphor-icons/react';
import AssetActions from './AssetActions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function FileCard({ fileData, isExplore }) {
  const type = fileData.mime_type;

  return (
    <Card className='hover:bg-secondary hover:cursor-pointer'>
      <CardContent className='p-4'>
        <div className='flex w-full aspect-square flex-col items-center justify-center p-2'>
          <div className='w-full h-full flex items-center justify-center relative'>
            {type.startsWith('image/') ? (
              <Image
                priority
                data-fancybox='gallery'
                className='cursor-pointer object-contain'
                src={fileData.url ?? ''}
                alt='file'
                fill
              />
            ) : type.startsWith('video/') || type.startsWith('audio/') ? (
              <a
                data-fancybox
                data-type='html5video'
                controls
                href={fileData.url}
                className='w-full h-full items-center justify-center flex'
              >
                {type.startsWith('video/') && (
                  <Video
                    size={80}
                    className='min-w-full'
                    color='#ff4444'
                    weight='duotone'
                  />
                )}
                {type.startsWith('audio/') && (
                  <FileAudio size={80} color='#ff4444' weight='duotone' />
                )}
              </a>
            ) : type.startsWith('application/') ? (
              <a href={fileData.url} target='_blank' rel='noreferrer'>
                <File size={80} color='#ff4444' weight='duotone' />
              </a>
            ) : (
              <FileArchive size={80} color='#ff4444' weight='duotone' />
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between text-lg font-medium w-full'>
          <div className='flex flex-row justify-between items-center text-lg font-medium w-full'>
            <span className='w-full truncate'>{fileData.metadata.name}</span>
            <AssetActions
              isExplore={isExplore}
              cid={fileData.ipfs_pin_hash}
              asset={fileData}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='text-muted-foreground text-sm text-left line-clamp-2'>
                  {fileData.metadata.keyvalues &&
                    fileData.metadata.keyvalues.description &&
                    fileData.metadata.keyvalues.description}
                </span>
              </TooltipTrigger>
              <TooltipContent className='max-w-52'>
                <span className='text-muted-foreground text-sm text-left'>
                  {fileData.metadata.keyvalues &&
                    fileData.metadata.keyvalues.description &&
                    fileData.metadata.keyvalues.description}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <span className='text-muted-foreground text-sm text-left'>
            {fileData.mime_type}
          </span> */}
        </div>
      </CardContent>
    </Card>
  );
}
