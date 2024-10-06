'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import UploadFeature from './Features/UploadFeature';
import ShareFeature from './Features/ShareFeature';
import { AnimatedBeam } from '../ui/animated-beam';

export default function FeatureSection() {
  const shareRef = useRef();
  const uploadEndRef = useRef();
  const mainContainerRef = useRef();
  return (
    <div
      ref={mainContainerRef}
      className='flex relative flex-col gap-2 items-center px-6 md:px-14 w-full mt-12 h-full overflow-hidden'
    >
      <UploadFeature endRef={uploadEndRef} containerRef={mainContainerRef} />
      <ShareFeature startRef={shareRef} containerRef={mainContainerRef} />
      <AnimatedBeam
        containerRef={mainContainerRef}
        fromRef={uploadEndRef}
        toRef={shareRef}
        className='z-0'
        duration={10}
        delay={-10}
        startXOffset={70}
        curvature={1}
      />
    </div>
  );
}
