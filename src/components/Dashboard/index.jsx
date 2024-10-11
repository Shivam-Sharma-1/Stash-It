import React, { Suspense } from 'react';
import NewProject from './NewProject';
import Header from '../Navbar';
import { checkUser } from '@/lib/checkUser';
import ProjectsList from './ProjectsList';
import ProjectListSkeleton from './ProjectListSkeleton';
import { getQueryClient } from '@/lib/get-query-client';
import getProjects from '@/server/get-projects';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Dashboard = async () => {
  await checkUser();
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) => getProjects({ pageParam }),
    initialPageParam: '',
  });
  return (
    <main className='w-full flex flex-col'>
      <Header />
      <div className='w-full flex flex-col gap-4 px-10 py-6'>
        <div className='w-full flex justify-between items-center flex-wrap'>
          <h1 className='text-3xl font-semibold'>My Projects</h1>
          <NewProject />
        </div>
        <div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProjectListSkeleton />}>
              <ProjectsList />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
