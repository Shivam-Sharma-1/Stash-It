import { pinata } from "@/utils/config";
import React from "react";

export const createProject = async () => {
  const group = await pinata.groups.create({
    name: "My Pa Group",
    isPublic: true,
  });

  console.log("Group created", group);
};
