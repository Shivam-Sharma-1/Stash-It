import { pinata } from "@/utils/config";
import React from "react";

export const getGroups = async () => {
  const groupsList = await pinata.groups.list().limit(0);

  console.log("Groups", groupsList.groups);

  return groupsList.groups;
};
