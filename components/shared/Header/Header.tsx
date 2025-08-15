import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../Container/Container';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import { CartDrawer } from '../CartDrawer/CarDrawer';
import Link from 'next/link';
import { SearchInput } from '../SearchInput/SearchInput';

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
            <Button className='group relative'>
              <b>520 ₽</b>
              <span className='h-full w-[1px] bg-white/30 mx-3' />
              <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                <ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
            </Button>
          </CartDrawer>
        </div>
      </Container>
    </header>
  );
};
