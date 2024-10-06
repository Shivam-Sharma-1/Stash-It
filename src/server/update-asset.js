import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import React from "react";

export const updateAsset = async ({ cid, asset }) => {
  checkUser();

  const response = await pinata.updateMetadata({
    cid: cid,
    name: asset,
  });

  console.log("Asset updated", response);

  return response;
};
