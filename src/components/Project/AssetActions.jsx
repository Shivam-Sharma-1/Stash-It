"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { PiTrash } from "react-icons/pi";
import { deleteAsset } from "@/server/delete-asset";

const handleDelete = async (cid) => {
  const res = await deleteAsset({ cid });
  if (res) {
    console.log("Group deleted");
  } else {
    console.log("Error deleting group");
  }
};

const AssetActions = ({ cid }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>
      <PopoverContent>
        {/* <UpdateProject groupId={groupId} /> */}
        <Button onClick={() => handleDelete(cid)}>
          Delete
          <PiTrash />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AssetActions;
