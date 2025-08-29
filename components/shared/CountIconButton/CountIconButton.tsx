import { Minus, Plus, Loader } from 'lucide-react';

import { ICountButtonProps } from '../CountButton/CountButton';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store';

interface IconButtonProps {
  size?: ICountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
}) => {
  const { loading } = useCartStore((state) => state);
  const buttonIcon =
    type === 'plus' ? (
      <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
    ) : (
      <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
    );

  return (
    <Button
      variant='outline'
      disabled={disabled || loading}
      onClick={onClick}
      type='button'
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm'
          ? 'w-[30px] h-[30px] rounded-[10px]'
          : 'w-[38px] h-[38px] rounded-md'
      )}
    >
      {loading ? <Loader className='w-4 h-4 animate-spin' /> : buttonIcon}
    </Button>
  );
};
