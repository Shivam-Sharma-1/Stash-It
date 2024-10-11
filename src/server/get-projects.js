"use server";

import { checkUser } from "@/lib/checkUser";
import { prisma } from "../../prisma/prisma";
import { auth } from "@/utils/auth";

export const getProjects = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await checkUser();

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
    });

    console.log("Projects fetched from database", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export default getProjects;
