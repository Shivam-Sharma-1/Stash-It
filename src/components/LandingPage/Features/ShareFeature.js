'use client';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { CloudArrowUp, UserCircle } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function ShareFeature({ startRef, containerRef }) {
  const user1Ref = useRef(null);
  const user2Ref = useRef(null);
  const user3Ref = useRef(null);
  return (
    <div className='flex flex-col-reverse md:flex-row w-full items-start justify-evenly gap-10 md:gap-36 py-32'>
      <div className='flex flex-col gap-4 items-center md:items-start max-w-md'>
        <h2 className='text-5xl text-primary md:text-left text-center font-bold'>
          Share with the Community
        </h2>
        <p className='max-w-2xl text-center md:text-left'>
          Make your assets public and share them with the wider game development
          community. Let others benefit from your work while gaining exposure as
          a creator.
        </p>
      </div>
      <div className='flex flex-row items-center gap-28'>
        <Image
          ref={startRef}
          src='/images/features/file.svg'
          width={160}
          height={160}
          className='z-10'
        />
        <div className='flex flex-col items-start z-10'>
          <UserCircle
            ref={user1Ref}
            size={68}
            color='#ff4444'
            weight='duotone'
          />
          <UserCircle
            ref={user2Ref}
            size={68}
            color='#ff4444'
            weight='duotone'
          />
          <UserCircle
            ref={user3Ref}
            size={68}
            color='#ff4444'
            weight='duotone'
          />
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={user1Ref}
          toRef={startRef}
          startXOffset={-50}
          className='-z-10'
          duration={8}
          gradientStartColor='#ff4444'
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={user2Ref}
          toRef={startRef}
          startXOffset={-50}
          className='-z-10'
          duration={8}
          gradientStartColor='#ff4444'
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={user3Ref}
          toRef={startRef}
          startXOffset={-50}
          className='-z-10'
          duration={8}
          gradientStartColor='#ff4444'
        />
      </div>
    </div>
  );
}
