import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProjectForm from "./NewProjectForm";

const NewProject = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-500 rounded-md">
        Create Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            <NewProjectForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
