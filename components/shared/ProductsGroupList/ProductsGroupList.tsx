'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from '../Title/Title';
import { ProductCard } from '../ProductCard/ProductCard';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface IProductsGroupListProps {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const { setActiveId } = useCategoryStore((state) => state);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
