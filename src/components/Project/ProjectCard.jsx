import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Folder, FolderLock } from '@phosphor-icons/react/dist/ssr';
import ProjectActions from '../Dashboard/ProjectActions';

export default function ProjectCard({ projectData }) {
  return (
    <Card className='hover:bg-secondary hover:cursor-pointer'>
      <CardContent className='p-4'>
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
        <div className='flex flex-row justify-between items-center text-lg font-medium'>
          <span>{projectData.name}</span>
          <ProjectActions projectData={projectData} />
        </div>
      </CardContent>
    </Card>
  );
}
