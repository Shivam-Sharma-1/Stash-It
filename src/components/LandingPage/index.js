import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeatureSection from './FeatureSection';

export default function LandingPage() {
  return (
    <div className='flex flex-col w-full overflow-x-hidden'>
      <Navbar />
      <Hero />
      <FeatureSection />
    </div>
  );
}
