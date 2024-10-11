"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

const getAssets = async (cid) => {
  await checkUser();

  try {
    const files = await pinata.gateways.get(cid);

    console.log("Asset fetched from database", files);
    return files;
  } catch (error) {
    console.error("Error uploading asset:", error);
    throw new Error(`Failed to upload asset: ${error.message}`);
  }
};

export default getAssets;
