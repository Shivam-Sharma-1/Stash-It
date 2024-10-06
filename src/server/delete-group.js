import { pinata } from "@/utils/config";
import React from "react";

export const deleteGroup = async ({ groupId }) => {
  console.log(groupId);
  const status = await pinata.groups.delete({
    groupId: groupId,
  });

  console.log("Group deleted", status);

  return status;
};
