'use client';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { CloudArrowUp } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function UploadFeature({ endRef, containerRef }) {
  const div1Ref = useRef(null);
  return (
    <div className='flex flex-col md:flex-row w-full items-start justify-evenly gap-10 md:gap-36 md:py-32'>
      <div className='flex flex-row items-center gap-28'>
        <Image
          ref={div1Ref}
          src='/images/features/file.svg'
          width={160}
          height={160}
          className='z-10'
        />
        <CloudArrowUp
          ref={endRef}
          size={120}
          color='#ff4444'
          weight='duotone'
          className='z-10'
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={endRef}
          className='-z-10'
          duration={8}
          endXOffset={-50}
        />
      </div>

      <div className='flex flex-col gap-4 items-center md:items-end max-w-md text-center md:text-right'>
        <h2 className='text-5xl text-primary font-bold'>
          Store your <br />
          game assets
        </h2>
        <p className='max-w-2xl text-center md:text-right'>
          Easily upload and store your game assets in organized projects. With
          Stashit, you can manage your textures, 3D models, animations, and
          more, all in one place.
        </p>
      </div>
    </div>
  );
}
