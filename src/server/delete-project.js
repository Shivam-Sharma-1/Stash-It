"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const deleteProject = async ({ groupId }) => {
  await checkUser();

  const status = await pinata.groups.delete({
    groupId: groupId,
  });

  if (status.error) {
    throw new Error(`Failed to delete project: ${status.error}`);
  }

  const response = await fetch(`${BASE_URL}/api/projects/${groupId}`, {
    method: "DELETE",
  });

  return response;
};
