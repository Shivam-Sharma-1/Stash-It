import React, { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import getPublicProjects from '@/server/get-public-projects';
import PublicProjectsList from '@/components/Explore/PublicProjectsList';
import Navbar from '@/components/Navbar';

const Explore = async () => {
  const queryClient = getQueryClient();
  const initialData = await getPublicProjects({ cursorId: '' });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['public-projects'],
    queryFn: ({ pageParam }) => getPublicProjects({ cursorId: pageParam }),
    initialPageParam: '',
  });
  return (
    <main className='w-full flex flex-col'>
      <Navbar />
      <div className='w-full flex flex-col gap-4 px-10 py-6'>
        <div className='w-full flex justify-between items-center flex-wrap'>
          <h1 className='text-3xl font-semibold'>Explore Public Projects</h1>
        </div>
        <div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PublicProjectsList initialData={initialData} />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
};

export default Explore;
