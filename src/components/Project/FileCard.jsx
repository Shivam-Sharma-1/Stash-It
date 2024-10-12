'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

export default function FileCard({ fileData }) {
  const type = fileData.mime_type;
  console.log(fileData);
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
                src={fileData.url ?? ''}
                alt='file'
                width={350}
                height={350}
              />
            ) : type.startsWith('video/') ? (
              <video controls src={fileData.url} />
            ) : type.startsWith('audio/') ? (
              <audio controls src={fileData.url} />
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
