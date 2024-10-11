"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

const shareAsset = async (cid) => {
  await checkUser();

  try {
    const url = await pinata.gateways.convert(cid);

    console.log("Share link created: ", url);
    return url;
  } catch (error) {
    console.error("Error creating link:", error);
    throw new Error(`Failed to create link: ${error.message}`);
  }
};

export default shareAsset;
