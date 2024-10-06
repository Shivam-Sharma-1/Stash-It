"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const handleUpload = async (file, groupId) => {
  await checkUser();

  const upload = await pinata.upload.file(file).group(groupId);
  console.log("uploaded", upload);
};
