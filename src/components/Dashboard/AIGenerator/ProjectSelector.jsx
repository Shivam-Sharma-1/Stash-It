'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAllProjects } from '@/server/get-all-projects';

export default function ProjectSelector({ onChange }) {
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      const result = await getAllProjects();
      if (result.success) {
        console.log(result.projects);
        setProjects(result.projects);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  React.useEffect(() => {
    if (onChange) {
      onChange(selectedProject);
    }
  }, [selectedProject, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selectedProject ? selectedProject.name : 'Select project...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search project...' />
          {loading ? (
            <div className='py-6 text-center text-sm'>Loading projects...</div>
          ) : error ? (
            <div className='py-6 text-center text-sm text-red-500'>{error}</div>
          ) : (
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup>
                {projects &&
                  projects.map((project) => (
                    <CommandItem
                      key={project.id}
                      value={project.groupId}
                      onSelect={() => {
                        setSelectedProject(project);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedProject?.id === project.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {project.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
