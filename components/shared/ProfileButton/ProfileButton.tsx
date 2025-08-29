import { useSession } from 'next-auth/react';
import React from 'react';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { useCartStore } from '@/store';

interface IProfileButtonProps {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<IProfileButtonProps> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession();
  const { loading } = useCartStore((state) => state);

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant='outline'
          className='flex items-center gap-1'
          loading={loading}
        >
          <User size={16} />
          Login
        </Button>
      ) : (
        <Link href='/profile'>
          <Button
            loading={loading}
            variant='secondary'
            className='flex items-center gap-2'
          >
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
