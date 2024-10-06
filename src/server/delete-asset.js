import { pinata } from "@/utils/config";
import React from "react";

export const deleteAsset = async ({ cid }) => {
  const response = await pinata.unpin([cid]);
  console.log("deleteAsset", response);

  if (response.error) {
    throw new Error(`Failed to delete asset: ${response.error}`);
  }

  return response;
};
