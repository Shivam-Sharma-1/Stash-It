import { pinata } from "@/utils/config";
import React from "react";

export const getProjects = async () => {
  const groupsList = await pinata.groups.list().all();

  console.log("Groups", groupsList);

  return groupsList;
};
