import React from 'react';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from '../Title/Title';
import { CountButton } from '../CountButton/CountButton';

interface IProductCardProps {
  name: string;
  price: number;
  count?: number;
  imageUrl?: string;
  className?: string;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  count,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
        <img
          className='w-[215px] h-[215px]'
          src={imageUrl}
          alt={name || 'Product image'}
        />
      </div>
      <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
      <p className='text-sm text-gray-400'>
        Chicken, mozzarella, cheddar and parmesan cheeses, cheese sauce,
        tomatoes, alfredo sauce, garlic
      </p>

      <div className='flex justify-between items-center mt-4'>
        <span className='text-[20px]'>
          from <b>{price} ₽</b>
        </span>

        {count ? (
          <CountButton value={count} size='lg' />
        ) : (
          <Button variant='secondary'>
            <Plus className='w-4 h-4 mr-1' />
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};
