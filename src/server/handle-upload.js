"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";

export const handleUpload = async (formData) => {
  await checkUser();

  const groupId = formData.get("groupId");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!groupId) {
    throw new Error("GroupId is missing");
  } else if (!name) {
    throw new Error("Name is missing");
  }

  let successCount = 0;
  const errors = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("file") && value instanceof File) {
      try {
        const upload = await pinata.upload
          .file(value)
          .group(groupId)
          .addMetadata({
            name: name,
            keyValues: {
              description: description ? description : "",
            },
          });
        console.log("uploaded", upload);
        successCount++;
      } catch (error) {
        console.error(`Error uploading file ${key}:`, error);
        errors.push(`Failed to upload ${value.name}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Errors during upload:", errors);
  }

  return {
    success: successCount > 0,
    successCount,
    errorCount: errors.length,
    errors,
  };
};
