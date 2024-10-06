import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import React from "react";

export const getProjects = async () => {
  checkUser();

  const groupsList = await pinata.groups.list().all();

  return groupsList;
};
