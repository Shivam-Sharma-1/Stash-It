'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { SignOut } from '@phosphor-icons/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Logout = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            onClick={() => signOut({ redirectTo: '/auth' })}
          >
            <SignOut size={32} color='#ff4444' weight='duotone' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Log out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Logout;
