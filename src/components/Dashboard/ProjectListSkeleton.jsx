'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { FolderDashed } from '@phosphor-icons/react/dist/ssr';
import { Skeleton } from '../ui/skeleton';

export default function ProjectListSkeleton() {
  return (
    <div className='grid grid-cols-1  md:grid-cols-5 lg:grid-cols-7 gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card className='hover:bg-secondary hover:cursor-pointer border-secondary'>
          <CardContent className='p-4'>
            <div className='flex aspect-square flex-col items-center justify-center p-10'>
              <FolderDashed
                className='w-full h-full text-secondary'
                weight='duotone'
              />
            </div>
            <Skeleton className='h-4 w-full' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
