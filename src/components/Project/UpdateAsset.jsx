"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilSimple } from "@phosphor-icons/react";
import UpdateAssetForm from "./UpdateAssetForm";

const UpdateAsset = ({ cid, asset }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="w-full text-sm flex flex-row items-center justify-start hover:bg-secondary px-2 py-1.5">
        <PencilSimple className="mr-2 h-4 w-4" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the project name</DialogTitle>
        </DialogHeader>
        <UpdateAssetForm
          setIsDialogOpen={setIsDialogOpen}
          cid={cid}
          asset={asset}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAsset;
