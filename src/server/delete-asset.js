"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const deleteAsset = async ({ cid }) => {
  await checkUser();

  try {
    const status = await pinata.unpin([cid]);

    console.log("Deleted file:", status);
    return status;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file:", error);
  }
};
