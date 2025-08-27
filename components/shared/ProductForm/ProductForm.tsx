'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from '../ChoosePizzaForm/ChoosePizzaForm';
import { ChooseProductForm } from '../ChooseProductForm/ChooseProductForm';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.doughType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' added to cart');

      _onSubmit?.();
    } catch (err) {
      toast.error('Error adding to cart');
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
