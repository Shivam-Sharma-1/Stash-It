'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from '../InfiniteScroll';
import getAssets from '@/server/get-assets';
import FileCard from './FileCard';

export default function AssetList({ initialData, groupId, isExplore }) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      'assets',
      {
        groupId,
      },
    ],
    queryFn: ({ pageParam }) => getAssets({ groupId, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.page,
    initialData: initialData
      ? { pages: [initialData], pageParams: [0] }
      : undefined,
    staleTime: 60000, // 1 minute
  });

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='grid grid-cols-1  md:grid-cols-5 lg:grid-cols-7 gap-4'>
        {data?.pages &&
          data.pages.map((page) =>
            page.files.map((file) => (
              <FileCard isExplore={isExplore} key={file.id} fileData={file} />
            ))
          )}
        {data.pages.length == 1 && data.pages[0].files.length == 0 && (
          <div className='col-span-full'>
            There are no assets in this project.
          </div>
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
