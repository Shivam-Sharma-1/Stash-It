import React from "react";
import { prisma } from "../../../../prisma/prisma";
import { notFound } from "next/navigation";
import PublicProjectPage from "@/components/Explore/PublicProjectPage";

export const metadata = {
  title: "Explore - StashIt",
  description: "Your ultimate game assets hub and vault.",
};

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
      <PublicProjectPage
        isExplore={true}
        projectData={projectData}
        groupId={groupId}
      />
    </div>
  );
};

export default page;
