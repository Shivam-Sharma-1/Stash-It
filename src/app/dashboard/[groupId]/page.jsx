import ProjectPage from "@/components/Project";
import React from "react";

const page = ({ params }) => {
  const { groupId } = params;
  return (
    <div>
      <ProjectPage groupId={groupId} />
    </div>
  );
};

export default page;
