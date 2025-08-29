import React from 'react';

import { CartItemDTO } from '@/services/dto/cart.dto';

interface IOrderSuccessTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<IOrderSuccessTemplateProps> = ({
  orderId,
  items,
}) => (
  <div>
    <h1>Thanks for your order! 🎉</h1>

    <p>Your order #{orderId} successfully payed. Details:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ x{' '}
          {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
