import getAssets from "@/server/get-assets";
import React from "react";
import AssetActions from "./AssetActions";

const ProjectAssets = async ({ groupId }) => {
  const files = await getAssets(groupId);

  return (
    <>
      {files.map((file) => (
        <div key={file.id} className="flex">
          {file.metadata.name}
          <AssetActions cid={file.ipfs_pin_hash} />
        </div>
      ))}
    </>
  );
};

export default ProjectAssets;
