'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

import {
  Button,
  SheetClose,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { CartDrawerItem } from '../CartDrawerItem/CartDrawerItem';
import { Title } from '../Title/Title';
import { getCartItemDetails } from '@/lib/getCartItemDetails';
import { DoughType, PizzaSize } from '@/constants/pizza';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

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
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                Cart: <span className='font-bold'>{items.length} items</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
              <Image
                src='/assets/images/empty-box.png'
                alt='empty cart'
                width={120}
                height={120}
              />
              <Title
                text='Your cart is empty'
                size='xl'
                className='text-center font-bold my-2'
              />
              <p className='text-center text-neutral-500 mb-5'>
                Add something to your cart
              </p>

              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Back to main
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
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

                  <Link href='/checkout'>
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type='submit'
                      className='w-full h-12 text-base'
                    >
                      Checkout
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
