'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from '../InfiniteScroll';
import ProjectCard from '../Project/ProjectCard';
import getPublicProjects from '@/server/get-public-projects';

export default function PublicProjectsList({ initialData }) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['public-projects'],
    queryFn: ({ pageParam }) => getPublicProjects({ cursorId: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.cursor : undefined,
    getPreviousPageParam: (firstPage) => firstPage.cursor,
    initialData: initialData
      ? { pages: [initialData], pageParams: [''] }
      : undefined,
    staleTime: 60000, // 1 minute
  });

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='grid grid-cols-1  md:grid-cols-5 lg:grid-cols-7 gap-4'>
        {data?.pages &&
          data.pages.map((page) =>
            page.projects.map((project) => (
              <ProjectCard
                isExplore={true}
                key={project.id}
                projectData={project}
              />
            ))
          )}
      </div>
      <InfiniteScroll
        isLoading={isFetching}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        threshold={1}
      >
        <div className='w-full flex items-center justify-center text-xs text-muted-foreground'>
          {isFetching && (
            <span className='flex flex-row justify-center gap-2 items-center '>
              <span>Loading...</span>
            </span>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
