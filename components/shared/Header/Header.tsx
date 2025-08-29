'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';
import {
  CartDrawer,
  CartButton,
  SearchInput,
  Container,
  ProfileButton,
  AuthModal,
} from '@/components/shared';

interface IHeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = ({ hasCart, hasSearch, className }: IHeaderProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  React.useEffect(() => {
    let message = '';

    if (searchParams.has('verified')) {
      message = 'Your account has been verified';
    }

    if (searchParams.has('paid')) {
      message = 'Your order has been paid! Details send to your email';
    }

    if (message) {
      setTimeout(() => {
        router.replace('/');
        toast.success(message);
      }, 500);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src={'/logo.png'} alt='logo' width={35} height={35} />
            <div>
              <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>
                The best pizza in the world
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        )}

        <div className='flex items-center gap-3'>
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          {hasCart && (
            <CartDrawer>
              <CartButton />
            </CartDrawer>
          )}
        </div>
      </Container>
    </header>
  );
};
