import localFont from 'next/font/local';
import './globals.css';
import AuthContext from '@/components/AuthContext';
import { Sora } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/Providers';
import NextTopLoader from 'nextjs-toploader';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

const sora = Sora({
  display: 'swap',
  variable: '--font-sora',
  subsets: ['latin'],
});

export const metadata = {
  title: 'StashIt',
  description: 'Your ultimate game assets hub and vault.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${sora.variable} ${sora.className} antialiased`}>
        <NextTopLoader color='#ff4444' showSpinner={false} />
        <AuthContext>
          <Providers>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </Providers>
        </AuthContext>
        <Toaster />
      </body>
    </html>
  );
}
