"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const getProjects = async () => {
  await checkUser();

  const groupsList = await pinata.groups.list().all();

  return groupsList;
};
