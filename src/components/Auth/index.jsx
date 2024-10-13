'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../LandingPage/Logo';
import { GithubLogo, GoogleLogo } from '@phosphor-icons/react';

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && session.user.email) {
    console.log('Unauthorized access');
    router.push('/dashboard');
  }

  return (
    <div className='w-full flex lg:grid grid-cols-2 justify-center h-screen'>
      <div className='flex flex-col col-span-2 md:col-span-1 items-center justify-center py-12'>
        <div className='mb-12'>
          <Logo />
        </div>

        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login to your account</h1>
            <p className='text-balance text-xs text-muted-foreground'>
              Continue with one of the OAuth Providers below
            </p>
          </div>
          <div className='grid gap-4'>
            <Button
              onClick={() => signIn('google', { redirectTo: '/dashboard' })}
              variant='default'
              className='w-full flex flex-row gap-2'
            >
              <GoogleLogo size={20} color='#ffffff' weight='duotone' />
              Sign In with Google
            </Button>
            <Button
              variant='outline'
              className='w-full flex flex-row gap-2'
              onClick={() => signIn('github', { redirectTo: '/dashboard' })}
            >
              <GithubLogo size={20} color='#ff4444' weight='duotone' />
              Sign In with GitHub
            </Button>
          </div>
        </div>
      </div>
      <div className='hidden md:col-span-1 bg-muted lg:block'>
        <Image
          src='/images/auth-placeholder.png'
          alt='Image'
          width='1920'
          height='1080'
          className='h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
};

export default AuthPage;
