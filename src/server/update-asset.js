'use server';

import { checkUser } from '@/lib/checkUser';
import { pinata } from '@/utils/config';

export const updateAsset = async ({ cid, asset }) => {
  await checkUser();

  try {
    const updatedAsset = await pinata.updateMetadata({
      cid: cid,
      name: asset,
    });

    console.log('Updated file:', updatedAsset);
    return { updatedAsset };
  } catch (error) {
    console.error('Error updating file:', error);
    throw new Error('Failed to update file:', error);
  }
};
