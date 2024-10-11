import getAssets from '@/server/get-assets';
import React from 'react';
import FileCard from './FileCard';
import Fancybox from './File/Fancybox';
import { getAssetUrls } from '@/server/get-asset-urls';

const ProjectAssets = async ({ groupId }) => {
  const files = await getAssets(groupId);
  const urls = await getAssetUrls(files.map((file) => file.ipfs_pin_hash));
  console.log(urls);
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div className='flex flex-col w-full gap-2'>
        <div className='grid grid-cols-1  md:grid-cols-5 lg:grid-cols-7 gap-4'>
          {files.map((file) => (
            <FileCard
              key={file.id}
              fileData={file}
              url={urls[file.ipfs_pin_hash]}
            />
          ))}
        </div>
      </div>
    </Fancybox>
  );
};

export default ProjectAssets;
