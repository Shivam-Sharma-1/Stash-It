import ProjectPage from '@/components/Project';
import React from 'react';
import { prisma } from '../../../../prisma/prisma';
import { notFound } from 'next/navigation';

const page = async ({ params }) => {
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
