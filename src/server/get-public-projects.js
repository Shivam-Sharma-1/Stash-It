'use server';

import { prisma } from '../../prisma/prisma';

export const getPublicProjects = async ({ cursorId }) => {
  try {
    const take = 10;
    const projects = await prisma.project.findMany({
      take: take + 1,
      skip: cursorId ? 1 : 0,
      cursor: cursorId ? { id: cursorId } : undefined,
      where: {
        isPublic: true,
      },
      include: {
        user: true,
      },
    });

    console.log('Projects fetched from database', projects);
    let cursor = null;
    let hasNextPage = false;
    if (projects.length > take) {
      hasNextPage = true;
      projects.pop();
      const lastProjectinResult = projects[projects.length - 1];
      cursor = lastProjectinResult.id;
    }
    console.log(cursor);
    return {
      projects,
      cursor,
      hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

export default getPublicProjects;
