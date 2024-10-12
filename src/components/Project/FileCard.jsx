'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { FileAudio, Video } from '@phosphor-icons/react';

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
                className='cursor-pointer border-r-2'
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
        <div className='flex flex-row justify-between items-center text-lg font-medium'>
          <span className='line-clamp-1'>{fileData.metadata.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
