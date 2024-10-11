'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Folder, FolderLock } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

export default function FileCard({ fileData, url }) {
  const type = fileData.mime_type;

  return (
    <Card className='hover:bg-secondary hover:cursor-pointer'>
      <CardContent className='p-4'>
        <div className='flex aspect-square flex-col items-center justify-center p-2'>
          <div>
            {type.startsWith('image/') ? (
              <Image
                priority
                data-fancybox='gallery'
                className='cursor-pointer border-r-2'
                src={url}
                alt='file'
                width={350}
                height={350}
              />
            ) : type.startsWith('video/') ? (
              <video controls src={url} />
            ) : type.startsWith('audio/') ? (
              <audio controls src={url} />
            ) : (
              <p>Unsupported file type</p>
            )}
          </div>
        </div>
        <div className='flex flex-row justify-between items-center text-lg font-medium'>
          <span>{fileData.metadata.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
