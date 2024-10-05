import { pinata } from "@/utils/config";
import React from "react";

const getAssets = async (groupId) => {
  const files = await pinata.files.list().group(groupId).limit(0);
  console.log("Got-Assets", files);

  return files.files;
};

export default getAssets;
