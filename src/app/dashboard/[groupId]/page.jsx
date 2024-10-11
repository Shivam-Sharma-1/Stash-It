import ProjectPage from '@/components/Project';
import React from 'react';
import { prisma } from '../../../../prisma/prisma';

const page = async ({ params }) => {
  const { groupId } = params;

  const projectData = await prisma.project.findUnique({
    where: {
      groupId: groupId,
    },
  });
  return (
    <div>
      <ProjectPage projectData={projectData} groupId={groupId} />
    </div>
  );
};

export default page;
