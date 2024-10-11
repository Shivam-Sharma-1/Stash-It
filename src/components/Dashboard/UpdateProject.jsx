import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateProjectForm from "./UpdateProjectForm";

const UpdateProject = ({ groupId }) => {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-500 rounded-md">
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the project name</DialogTitle>
          <DialogDescription>
            <UpdateProjectForm groupId={groupId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProject;
