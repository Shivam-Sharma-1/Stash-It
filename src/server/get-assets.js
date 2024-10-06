"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

const getAssets = async (groupId) => {
  await checkUser();

  const files = await pinata.listFiles().group(groupId).all();
  console.log("Got-Assets", files);

  return files;
};

export default getAssets;
