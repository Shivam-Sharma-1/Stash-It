import ProjectPage from '@/components/Project';
import React from 'react';
import { prisma } from '../../../../prisma/prisma';
import { notFound } from 'next/navigation';
import { checkUser } from '@/lib/checkUser';
export const metadata = {
  title: 'Dashboard - StashIt',
  description: 'Your ultimate game assets hub and vault.',
};
const page = async ({ params }) => {
  await checkUser();
  const { groupId } = params;

  const projectData = await prisma.project.findUnique({
    where: {
      groupId: groupId,
    },
  });
  if (!projectData) return notFound();
  return (
    <div>
      <ProjectPage projectData={projectData} groupId={groupId} />
    </div>
  );
};

export default page;
