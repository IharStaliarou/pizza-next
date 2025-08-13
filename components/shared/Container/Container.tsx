import { cn } from '@/lib/utils';
import React from 'react';

interface IContainerProps {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
  );
};
