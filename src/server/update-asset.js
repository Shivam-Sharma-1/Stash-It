"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const updateAsset = async ({ cid, name, description }) => {
  await checkUser();

  try {
    const updatedAsset = await pinata.updateMetadata({
      cid: cid,
      name: name,
      keyValues: {
        description: description ? description : "",
      },
    });

    console.log("Updated file:", updatedAsset);
    return { updatedAsset };
  } catch (error) {
    console.error("Error updating file:", error);
    throw new Error("Failed to update file:", error);
  }
};
