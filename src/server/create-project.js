'use server';

import { checkUser } from '@/lib/checkUser';
import { pinata } from '@/utils/config';
import { auth } from '@/utils/auth';
import { prisma } from '../../prisma/prisma';

export const createProject = async ({ project, isPublic }) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  await checkUser();

  try {
    const group = await pinata.groups.create({
      name: project,
      isPublic: isPublic,
    });

    const newProject = await prisma.project.create({
      data: {
        name: project,
        groupId: group.id,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        pinataUserId: group.user_id,
        isPublic: isPublic,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    console.log('Project saved to database', newProject);
    return { newProject };
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};
