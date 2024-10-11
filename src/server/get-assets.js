"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

const getAssets = async (groupId) => {
  await checkUser();

  try {
    const files = await pinata.listFiles().group(groupId);

    console.log("Assets fetched from database", files);
    return files;
  } catch (error) {
    console.error("Error uploading assets:", error);
    throw new Error(`Failed to upload asset: ${error.message}`);
  }
};

export default getAssets;
