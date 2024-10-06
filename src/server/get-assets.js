import { pinata } from "@/utils/config";
import React from "react";

const getAssets = async (groupId) => {
  const files = await pinata.listFiles().group(groupId).all();
  console.log("Got-Assets", files);

  return files;
};

export default getAssets;
