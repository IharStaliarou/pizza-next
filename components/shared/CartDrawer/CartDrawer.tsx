'use client';

import { Button } from '@/components/ui';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import Link from 'next/link';
import { CartDrawerItem } from '../CartDrawerItem/CartDrawerItem';
import { getCartItemDetails } from '@/lib/getCartItemDetails';
import { useEffect } from 'react';
import { useCartStore } from '@/store';
import { DoughType, PizzaSize } from '@/constants/pizza';
import { CartButton } from '../CartButton/CartButton';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    fetchCartItems,
    totalAmount,
    items,
    updateItemQuantity,
    removeCartItem,
    loading,
  } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleChangePizzaQuantity = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <CartButton />
      </SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>
            Cart:{' '}
            <span className='font-bold'>
              {items.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className='-mx-6 mt-5 overflow-auto flex-1'>
          {items.map((item) => (
            <div className='mb-2' key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.doughType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.doughType as DoughType,
                        item.pizzaSize as PizzaSize
                      )
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  handleChangePizzaQuantity(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
                disabled={item.disabled}
              />
            </div>
          ))}
        </div>

        <SheetFooter className='-mx-6 bg-white p-8'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>
                Total
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
              </span>
              <span className='font-bold text-lg'>{totalAmount} ₽</span>
            </div>

            <Link href='/cart'>
              <Button type='submit' className='w-full h-12 text-base'>
                Checkout
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
