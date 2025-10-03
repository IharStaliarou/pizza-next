'use client';

import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
interface ICategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<ICategoriesProps> = ({
  items,
  className,
}) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const handleSetActiveCategory = (id: number) => {
    setTimeout(() => {
      setActiveCategoryId(id);
    }, 350);
  };
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {items.map(({ name, id }) => (
        <Link
          key={id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 transition-all duration-300 ',

            activeCategoryId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`#category-${id}`}
          onClick={() => handleSetActiveCategory(id)}
          scroll={true}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
