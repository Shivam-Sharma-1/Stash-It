'use server';

import { checkUser } from '@/lib/checkUser';
import { pinata } from '@/utils/config';
import { prisma } from '../../prisma/prisma';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const deleteProject = async ({ groupId }) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  await checkUser();

  try {
    const pinataStatus = await pinata.groups.delete({
      groupId: groupId,
    });

    if (pinataStatus.error) {
      throw new Error(
        `Failed to delete project from Pinata: ${pinataStatus.error}`
      );
    }

    const deletedProject = await prisma.project.delete({
      where: {
        groupId: groupId,
      },
    });

    console.log('Project deleted from database', deletedProject);
    revalidatePath('/dashboard');
    return { deletedProject };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error(`Failed to delete project: ${error.message}`);
  }
};
