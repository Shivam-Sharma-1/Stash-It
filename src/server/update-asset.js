"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const updateAsset = async ({ cid, asset }) => {
  await checkUser();

  const response = await pinata.updateMetadata({
    cid: cid,
    name: asset,
  });

  console.log("Asset updated", response);

  return response;
};
