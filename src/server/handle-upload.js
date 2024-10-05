import { pinata } from "@/utils/config";

export const handleUpload = async (file, groupId) => {
  const upload = await pinata.upload.file(file).group(groupId);
  console.log("uploaded", upload);
};
