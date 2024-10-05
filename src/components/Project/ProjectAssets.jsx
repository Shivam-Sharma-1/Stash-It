import getAssets from "@/server/get-assets";
import React from "react";

const ProjectAssets = async ({ groupId }) => {
  const files = await getAssets(groupId);

  return (
    <>
      {files.map((file) => (
        <div key={file.id}>{file.name}</div>
      ))}
    </>
  );
};

export default ProjectAssets;
