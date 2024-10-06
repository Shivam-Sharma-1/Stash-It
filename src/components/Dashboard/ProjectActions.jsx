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
import { deleteGroup } from "@/server/delete-group";

const handleDelete = async (groupId) => {
  const res = await deleteGroup({ groupId });
  if (res === "OK") {
    console.log("Group deleted");
  } else {
    console.log("Error deleting group");
  }
};

const ProjectActions = ({ groupId }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>
      <PopoverContent>
        <Button onClick={() => handleDelete(groupId)}>
          Delete
          <PiTrash />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectActions;