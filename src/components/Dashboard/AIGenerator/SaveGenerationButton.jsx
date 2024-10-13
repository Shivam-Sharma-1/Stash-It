'use client';
import React, { useState } from 'react';
import ProjectSelector from './ProjectSelector';
import { Button } from '@/components/ui/button';
import { saveTextFile } from '@/server/saveTextFile';
import { toast } from 'sonner';

export const SaveGenerationButton = ({
  type = 'text',
  text,
  imageUrl,
  title,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function saveGeneration() {
    setIsLoading(true);
    if (type == 'text') {
      const res = await saveTextFile({
        text: text,
        title: title,
        groupId: selectedProject.groupId,
      });
      if (res.success) {
        toast.success('Successfully saved generation to project.');
      }
    }
    setIsLoading(false);
  }
  return (
    <div className='flex flex-col items-start gap-2 w-full'>
      <span className='text-sm font-medium'>Save generation to project</span>
      <div className='flex flex-row gap-2 items-center w-full'>
        <ProjectSelector onChange={setSelectedProject} />
        <Button
          disabled={!selectedProject || isLoading}
          onClick={saveGeneration}
        >
          {isLoading ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};
