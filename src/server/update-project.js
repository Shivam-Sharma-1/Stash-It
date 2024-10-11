"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/utils/auth";

export const updateProject = async ({ groupId, project, isPublic }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await checkUser();

  try {
    const group = await pinata.groups.update({
      groupId: groupId,
      name: project,
    });

    const projectData = {
      name: project,
      groupId: groupId,
      isPublic: isPublic,
    };

    const updatedProject = await prisma.project.update({
      where: { groupId: groupId },
      data: {
        ...projectData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    console.log("Project updated in database", updatedProject);
    return updatedProject;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(`Failed to update project: ${error.message}`);
  }
};
