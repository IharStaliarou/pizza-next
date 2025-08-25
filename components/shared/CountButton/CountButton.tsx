'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CountIconButton } from '../CountIconButton/CountIconButton';
import { useCartStore } from '@/store';

export interface ICountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CountButton: React.FC<ICountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-between gap-3',
        className
      )}
    >
      <CountIconButton
        size={size}
        onClick={() => onClick?.('minus')}
        type='minus'
        disabled={value === 1}
      />
      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
      <CountIconButton
        size={size}
        onClick={() => onClick?.('plus')}
        type='plus'
      />
    </div>
  );
};
