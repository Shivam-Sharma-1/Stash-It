import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import React from "react";

export const deleteProject = async ({ groupId }) => {
  checkUser();

  const status = await pinata.groups.delete({
    groupId: groupId,
  });

  if (status.error) {
    throw new Error(`Failed to delete project: ${status.error}`);
  }

  const response = await fetch(`/api/projects/${groupId}`, {
    method: "DELETE",
  });

  return response;
};
