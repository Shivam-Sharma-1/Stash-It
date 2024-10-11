import React from 'react';
import { UploadFile } from './UploadFile';
import ProjectAssets from './ProjectAssets';
import Header from '../Navbar';
import ProjectActions from '../Dashboard/ProjectActions';
import { checkUser } from '@/lib/checkUser';

const ProjectPage = async ({ groupId }) => {
  await checkUser();

  return (
    <main className='w-full flex flex-col'>
      <Header />
      <div className='w-full flex flex-col gap-4 px-10 py-6'>
        <div className='w-full flex justify-between items-center flex-wrap'>
          <h1>My Assets</h1>
          <ProjectActions groupId={groupId} />
          <UploadFile groupId={groupId} />
        </div>
        <div>
          <ProjectAssets groupId={groupId} />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
