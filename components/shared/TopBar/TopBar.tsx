import React from 'react';
import { SortPopup } from '../SortPopup/SortPopup';
import { Categories } from '../Categories/Categories';
import { cn } from '@/lib/utils';
import { Container } from '../Container/Container';

interface ITopBarProps {
  className?: string;
}

export const TopBar = ({ className }: ITopBarProps) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
