'use server';

import { auth } from '@/utils/auth';
import { prisma } from '../../prisma/prisma';
import { checkUser } from '@/lib/checkUser';

export async function getAllProjects() {
  const session = await auth();
  await checkUser();
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        groupId: true,
      },
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}
