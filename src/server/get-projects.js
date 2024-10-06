"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const getProjects = async () => {
  await checkUser();

  // const groupsList = await pinata.groups.list().all();
  const response = await fetch(`${BASE_URL}/api/projects`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to get projects: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
