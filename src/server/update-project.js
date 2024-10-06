import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import React from "react";

export const updateProject = async ({ groupId, project }) => {
  checkUser();

  const group = await pinata.groups.update({
    groupId: groupId,
    name: project,
  });

  console.log("Group updated", group);

  const projectData = {
    name: project,
    groupId: group.id,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    pinataUserId: group.user_id,
  };

  const response = await fetch(`/api/projects/${groupId}`, {
    method: "PUT",
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
