'use client';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { CloudArrowUp } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function ShareFeature({ startRef, containerRef }) {
  const div2Ref = useRef(null);
  return (
    <div className='flex flex-row w-full items-start justify-center gap-36 py-32'>
      <div className='flex flex-col gap-4 items-start max-w-md'>
        <h2 className='text-5xl text-primary font-bold'>
          Share with the Community
        </h2>
        <p className='max-w-2xl text-left'>
          Make your assets public and share them with the wider game development
          community. Let others benefit from your work while gaining exposure as
          a creator.
        </p>
      </div>
      <div className='relative flex flex-row items-center gap-28'>
        <Image
          ref={startRef}
          src='/images/features/file.svg'
          width={160}
          height={160}
          className='z-10'
        />
        <CloudArrowUp
          ref={div2Ref}
          size={120}
          color='#ff4444'
          weight='duotone'
          className='z-10'
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={startRef}
          toRef={div2Ref}
          className='-z-10'
          duration={8}
          endXOffset={-50}
          gradientStartColor='#ff4444'
        />
      </div>
    </div>
  );
}
