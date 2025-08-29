import React from 'react';
import { Category } from '@prisma/client';

import { SortPopup } from '../SortPopup/SortPopup';
import { Categories } from '../Categories/Categories';
import { cn } from '@/lib/utils';
import { Container } from '../Container/Container';

interface ITopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar = ({ categories, className }: ITopBarProps) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
