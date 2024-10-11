'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { deleteProject } from '@/server/delete-project';
import UpdateProject from './UpdateProject';

import DeleteProjectButton from './DeleteProjectButton';

const ProjectActions = ({ projectData }) => {
  return (
    <DropdownMenu dialog={false}>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={(e) => e.preventDefault()}>
          <UpdateProject initialProjectData={projectData} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <DeleteProjectButton projectData={projectData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActions;
