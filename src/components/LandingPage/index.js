import React from 'react';
import Hero from './Hero';
import FeatureSection from './FeatureSection';
import Navbar from '../Navbar';

export default function LandingPage() {
  return (
    <div className='flex flex-col w-full overflow-x-hidden'>
      <Navbar />
      <Hero />
      <FeatureSection />
    </div>
  );
}
