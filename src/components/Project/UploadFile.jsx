import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "./FileUpload";

export const UploadFile = ({ groupId }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-gray-500 rounded-md">
          Upload asset
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload an asset</DialogTitle>
            <DialogDescription>
              <FileUpload groupId={groupId} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
