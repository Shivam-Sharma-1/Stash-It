'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { FileAudio, Video } from '@phosphor-icons/react';
import AssetActions from './AssetActions';

export default function FileCard({ fileData }) {
  const type = fileData.mime_type;
  console.log(fileData);
  return (
    <Card className='hover:bg-secondary hover:cursor-pointer'>
      <CardContent className='p-4'>
        <div className='flex w-full aspect-square flex-col items-center justify-center p-2'>
          <div className='w-full h-full flex items-center justify-center'>
            {type.startsWith('image/') ? (
              <Image
                priority
                data-fancybox='gallery'
                className='cursor-pointer'
                src={fileData.url ?? ''}
                alt='file'
                width={350}
                height={350}
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
            ) : (
              <p>Unsupported file type</p>
            )}
          </div>
        </div>
        <div className='flex flex-row justify-between items-center text-lg font-medium w-full'>
          <span className='w-full truncate'>{fileData.metadata.name}</span>
          <AssetActions cid={fileData.ipfs_pin_hash} asset={fileData} />
        </div>
      </CardContent>
    </Card>
  );
}
