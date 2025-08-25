import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import {
  CartDrawer,
  CartButton,
  SearchInput,
  Container,
} from '@/components/shared';

interface IHeaderProps {
  className?: string;
}

export const Header = ({ className }: IHeaderProps) => {
  return (
    <header className={cn('border border-b', className)}>
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

        <div className='mx-10 flex-1'>
          <SearchInput />
        </div>

        <div className='flex items-center gap-3'>
          <Button variant='outline' className='flex items-center gap-1'>
            <User size={16} />
            Sign in
          </Button>

          <CartDrawer>
            <CartButton />
          </CartDrawer>
        </div>
      </Container>
    </header>
  );
};
