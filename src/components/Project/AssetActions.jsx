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
import UpdateAsset from "./UpdateAsset";
import ShareAsset from "./ShareAsset";

const handleDelete = async (cid) => {
  const res = await deleteAsset({ cid });
};

const AssetActions = ({ cid }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>
      <PopoverContent>
        <UpdateAsset cid={cid} />
        <Button onClick={() => handleDelete(cid)}>
          Delete
          <PiTrash />
        </Button>
        <ShareAsset cid={cid} />
      </PopoverContent>
    </Popover>
  );
};

export default AssetActions;
