import React from 'react';

import Logout from './Logout';
import { auth } from '@/utils/auth';
import Logo from '../LandingPage/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = async () => {
  const session = await auth();
  return (
    <header className='w-full h-20 bg-background border-b border-border flex items-center justify-between px-10'>
      <Logo />
      {session && (
        <div className='flex flex-row items-center gap-4'>
          <span>{session.user.name ?? 'User'}</span>
          <Avatar>
            <AvatarImage src={session.user.image ?? ''} />
            <AvatarFallback>
              {session.user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Logout />
        </div>
      )}
    </header>
  );
};

export default Navbar;
