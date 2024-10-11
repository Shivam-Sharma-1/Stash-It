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
import { deleteProject } from "@/server/delete-project";
import UpdateProject from "./UpdateProject";

const handleDelete = async (groupId) => {
  const res = await deleteProject({ groupId });
};

const ProjectActions = ({ groupId }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>
      <PopoverContent>
        <UpdateProject groupId={groupId} />
        <Button onClick={() => handleDelete(groupId)}>
          Delete
          <PiTrash />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectActions;
