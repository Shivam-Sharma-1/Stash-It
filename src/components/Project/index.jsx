import React from 'react';
import { UploadFile } from './UploadFile';
import ProjectAssets from './ProjectAssets';
import Header from '../Navbar';
import ProjectActions from '../Dashboard/ProjectActions';
import { checkUser } from '@/lib/checkUser';
import Link from 'next/link';

const ProjectPage = async ({ groupId, projectData, isExplore }) => {
  await checkUser();

  return (
    <main className='w-full flex flex-col'>
      <Header />
      <div className='w-full flex flex-col gap-4 px-10 py-6'>
        <div className='w-full flex justify-between items-center flex-wrap'>
          <div className='flex flex-row gap-2 items-center'>
            <h1 className='text-3xl font-semibold'>
              <Link
                className='hover:text-primary'
                href={isExplore ? '/explore' : '/dashboard'}
              >
                {' '}
                Projects
              </Link>{' '}
              &gt; {projectData.name}
            </h1>
            {!isExplore && (
              <ProjectActions projectData={projectData} groupId={groupId} />
            )}
          </div>
          {!isExplore && <UploadFile groupId={groupId} />}
        </div>
        <div>
          <ProjectAssets isExplore={isExplore} groupId={groupId} />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
