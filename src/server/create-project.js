"use server";

import { checkUser } from "@/lib/checkUser";
import { auth } from "@/utils/auth";
import { pinata } from "@/utils/config";
import React from "react";

export const createProject = async ({ project, isPublic }) => {
  await checkUser();

  const group = await pinata.groups.create({
    name: project,
    // isPublic: isPublic,
  });

  console.log("Group created", group);

  const projectData = {
    name: project,
    groupId: group.id,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    pinataUserId: group.user_id,
  };

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create project: ${errorData.error}`);
  }

  const newProject = await response.json();
  console.log("Project saved to database", newProject);
  return newProject;
};
