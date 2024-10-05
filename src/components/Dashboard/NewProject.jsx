"use client";

import React from "react";
import { Button } from "../ui/button";
import { createProject } from "@/server/create-project";

const handleCreateProject = () => {
  console.log("Creating project");
  createProject();
};

const NewProject = () => {
  return <Button onClick={handleCreateProject}>Create Project</Button>;
};

export default NewProject;
