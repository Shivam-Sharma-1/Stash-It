'use client';

import React from 'react';
import { FlipWords } from '../ui/flip-words';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

const images = [
  { url: '/images/hero/1.png', offset: 0 },
  { url: '/images/hero/2.png', offset: 48 },
  { url: '/images/hero/3.png', offset: 72 },
  { url: '/images/hero/4.png', offset: 96 },
  { url: '/images/hero/5.jpg', offset: 72 },
  { url: '/images/hero/6.jpg', offset: 48 },
  { url: '/images/hero/1.png', offset: 0 },
];

export default function Hero() {
  const words = ['STORE', 'ORGANIZE', 'SHARE'];

  return (
    <div className='flex relative flex-col items-center justify-start gap-4 w-full min-h-screen h-[800px] py-20 overflow-y-hidden overflow-x-hidden'>
      <div className='flex flex-col w-full items-center justify-center z-20'>
        <FlipWords
          duration={200}
          className='text-6xl font-bold text-primary'
          words={words}
        />
        <h2 className='text-5xl font-bold'>YOUR ASSETS</h2>
        <p></p>
      </div>
      <div className='flex flex-row items-start justify-evenly absolute w-[120%] top-0 gap-8 md:px-8 px-4 pt-8 z-10 h-full'>
        {images.map((image, index) => (
          <div key={index} className={cn('basis-1/6 h-full relative')}>
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              whileHover={{
                scale: 1.1,
                transition: { ease: 'easeOut', duration: 0.2 },
              }}
              // whileInView={{
              //   y: image.offset * 3.5,
              //   opacity: 1,
              //   transition: {
              //     y: { type: 'spring', stiffness: 100, damping: 15 },
              //     opacity: { duration: 0.6, ease: 'easeOut' },
              //   },
              // }}
              animate={{
                y: [
                  image.offset * 3.5,
                  image.offset * 3.5 - 20,
                  image.offset * 3.5,
                ],
                opacity: 1,
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 4,
                  ease: 'easeInOut',
                  delay: index * 0.2, // Staggered delay for each image
                },
              }}
              viewport={{ once: false }}
              className={`h-96 overflow-hidden w-full rounded-xl absolute top-0`}
            >
              <Image
                src={image.url}
                fill
                className='object-cover'
                alt={`Hero image ${index + 1}`}
              />
            </motion.div>
          </div>
        ))}
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12 z-0 opacity-35'
        )}
      />
    </div>
  );
}
