"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const handleUpload = async (formData) => {
  await checkUser();

  const file = formData.get("file");
  const groupId = formData.get("groupId");

  if (!file || !groupId) {
    throw new Error("File or groupId is missing");
  }

  try {
    const upload = await pinata.upload.file(file).group(groupId);
    console.log("uploaded", upload);

    return { success: true, data: upload };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};
