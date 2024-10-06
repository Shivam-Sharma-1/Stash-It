import { auth } from "@/utils/auth";
import { pinata } from "@/utils/config";
import { redirect } from "next/navigation";
import React from "react";

export const getProjects = async () => {
  const session = await auth();
  if (!session) redirect("/auth");

  const groupsList = await pinata.groups.list().all();

  return groupsList;
};
