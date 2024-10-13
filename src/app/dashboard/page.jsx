import Dashboard from '@/components/Dashboard';
import { checkUser } from '@/lib/checkUser';
import React from 'react';

export const metadata = {
  title: 'Dashboard - StashIt',
  description: 'Your ultimate game assets hub and vault.',
};
const page = async () => {
  await checkUser();
  return <Dashboard />;
};

export default page;
