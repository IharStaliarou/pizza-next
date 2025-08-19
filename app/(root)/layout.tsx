import type { Metadata } from 'next';
import { Header } from '@/components/shared';

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
    <body>
      <main className='min-h-screen'>
        <Header />
        {children}
        {modal}
      </main>
    </body>
  );
}
