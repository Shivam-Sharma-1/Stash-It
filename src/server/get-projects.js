'use server';

import { checkUser } from '@/lib/checkUser';
import { prisma } from '../../prisma/prisma';
import { auth } from '@/utils/auth';

export const getProjects = async ({ cursorId } = {}) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  await checkUser();

  try {
    const projects = await prisma.project.findMany({
      take: 9,
      skip: cursorId ? 1 : 0,
      cursor:
        cursorId != '' && cursorId
          ? {
              id: cursorId,
            }
          : undefined,
      where: {
        userId: session.user.id,
      },
    });

    console.log('Projects fetched from database', projects);
    let cursor = null;
    if (projects.length > 0) {
      const lastProjectinResult = projects[projects.length - 1];
      cursor = lastProjectinResult.id;
    }
    console.log(cursor);
    return {
      projects,
      cursor,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

export default getProjects;
