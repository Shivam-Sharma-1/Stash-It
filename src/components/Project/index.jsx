import React from "react";
import { UploadFile } from "./UploadFile";
import ProjectAssets from "./ProjectAssets";
import Header from "../Header";

const ProjectPage = ({ groupId }) => {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <div className="w-full flex flex-col gap-4 px-10 py-6">
        <div className="w-full flex justify-between items-center flex-wrap">
          <h1>My Assets</h1>
          <UploadFile groupId={groupId} />
        </div>
        <div>
          <ProjectAssets groupId={groupId} />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
