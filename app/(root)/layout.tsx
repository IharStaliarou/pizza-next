import type { Metadata } from 'next';

import { Header } from '@/components/shared';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pizza Next',
  description: 'Your favorite pizza store',
};

export default function AppLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Suspense>
        <Header hasCart />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
