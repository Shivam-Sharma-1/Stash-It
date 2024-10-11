import React from 'react';
import Logo from '../LandingPage/Logo';

export default function Navbar() {
  return (
    <div className='flex flex-row px-4 md:px-12 py-4 w-full justify-between'>
      <Logo />
    </div>
  );
}
