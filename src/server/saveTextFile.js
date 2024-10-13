'use server';

import { checkUser } from '@/lib/checkUser';
import { pinata } from '@/utils/config';

export const saveTextFile = async ({ text, groupId, title }) => {
  await checkUser();
  if (!groupId) {
    throw new Error('GroupId is missing');
  }
  try {
    const blob = new Blob([text], { type: 'text/plain' });
    const file = new File([blob], title + '.txt' ?? 'character-lore.txt', {
      type: 'text/plain',
    });
    const upload = await pinata.upload.file(file).group(groupId);
    console.log('uploaded', upload);
    return {
      success: true,
      upload,
    };
  } catch (error) {
    console.error(`Error uploading file ${key}:`, error);
    return {
      error: true,
    };
  }
};
