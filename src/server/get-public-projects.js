"use server";

import { checkUser } from "@/lib/checkUser";
import { prisma } from "@/prisma/prisma";

export const getPublicProjects = async () => {
  await checkUser();

  try {
    const projects = await prisma.project.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Public projects fetched from database", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export default getPublicProjects;
