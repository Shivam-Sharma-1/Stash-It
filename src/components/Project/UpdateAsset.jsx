import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateAssetForm from "./UpdateAssetForm";

const UpdateAsset = ({ cid }) => {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-500 rounded-md">
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the project name</DialogTitle>
          <DialogDescription>
            <UpdateAssetForm cid={cid} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAsset;
