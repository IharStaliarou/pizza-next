import React from 'react';

import { getCartItemDetails } from '@/lib';
import { PizzaSize, DoughType } from '@/constants/pizza';
import { CartStateItem } from '@/lib/getCartDetails';
import {
  WhiteBlock,
  CheckoutItemSkeleton,
  CheckoutItem,
} from '@/components/shared';

interface ICheckoutCartProps {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<ICheckoutCartProps> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title='1. Cart' className={className}>
      <div className='flex flex-col gap-5'>
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.doughType as DoughType,
                  item.pizzaSize as PizzaSize
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
