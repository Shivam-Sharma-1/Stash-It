import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Folder, FolderLock } from '@phosphor-icons/react/dist/ssr';
import ProjectActions from '../Dashboard/ProjectActions';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function ProjectCard({ projectData, isExplore = false }) {
  return (
    <Card className='hover:bg-secondary hover:cursor-pointer'>
      <CardContent className='p-4'>
        <Link
          href={
            isExplore
              ? `/explore/${projectData.groupId}`
              : `/dashboard/${projectData.groupId}`
          }
        >
          <div className='flex aspect-square flex-col items-center justify-center p-10'>
            {projectData.isPublic ? (
              <Folder
                className='w-full h-full'
                color='#ff4444'
                weight='duotone'
              />
            ) : (
              <FolderLock
                className='w-full h-full'
                color='#ff4444'
                weight='duotone'
              />
            )}
          </div>
        </Link>
        <div className='flex flex-row justify-between items-center text-lg font-medium'>
          <Link href={`/dashboard/${projectData.groupId}`}>
            <span className='truncate'>{projectData.name}</span>
          </Link>
          {!isExplore && <ProjectActions projectData={projectData} />}
        </div>
        {isExplore && (
          <div className='flex flex-row gap-2 items-center text-sm mt-2 text-muted-foreground'>
            <Avatar className='w-6 h-6 aspect-square'>
              <AvatarImage src={projectData.user.image ?? ''} />
              <AvatarFallback>
                {projectData.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{projectData.user.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
