import getAssets from '@/server/get-assets';
import React from 'react';
import FileCard from './FileCard';
import Fancybox from './File/Fancybox';
import { getAssetUrls } from '@/server/get-asset-urls';
import AssetList from './AssetList';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';

const ProjectAssets = async ({ groupId, isExplore }) => {
  const queryClient = getQueryClient();
  const initialData = await getAssets({ groupId, page: 0 });
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      'assets',
      {
        groupId,
      },
    ],
    queryFn: ({ pageParam }) => getAssets({ groupId, page: pageParam }),
    initialPageParam: 0,
  });
  // const urls = await getAssetUrls(files.map((file) => file.ipfs_pin_hash));
  // console.log(urls);
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div className='flex flex-col w-full gap-2'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AssetList
            isExplore={isExplore}
            groupId={groupId}
            initialData={initialData}
          />
        </HydrationBoundary>
      </div>
    </Fancybox>
  );
};

export default ProjectAssets;
