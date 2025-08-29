import React from 'react';

interface IPayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<IPayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Pay for an order of <b>{totalAmount} ₽</b>. Follow{' '}
      <a href={paymentUrl}>this link</a> to pay for your order.
    </p>
  </div>
);
