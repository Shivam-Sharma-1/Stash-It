"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const deleteAsset = async ({ cid }) => {
  await checkUser();

  const response = await pinata.unpin([cid]);
  console.log("deleteAsset", response);

  if (response.error) {
    throw new Error(`Failed to delete asset: ${response.error}`);
  }

  return response;
};
