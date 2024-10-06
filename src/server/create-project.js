import { pinata } from "@/utils/config";
import React from "react";

export const createProject = async ({ project, isPublic }) => {
  const group = await pinata.groups.create({
    name: project,
    // isPublic: isPublic,
  });

  console.log("Group created", group);

  const projectData = {
    name: project,
    cid: group.id,
    size: 0,
    number_of_files: 0,
    mime_type: "application/json",
    group_id: group.id,
    keyvalues: {},
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
