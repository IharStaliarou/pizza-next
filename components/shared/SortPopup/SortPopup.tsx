import React from 'react';
import { ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

interface ISortProps {
  className?: string;
}

export const SortPopup: React.FC<ISortProps> = ({ className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'inline-flex items-center gap-2 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className
          )}
        >
          <ArrowUpDown className='w-4 h-4' />
          <b>Sort by:</b>

          <b className='text-primary'>Popular first</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[240px]'>
        <ul>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>
            Popular first
          </li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>
            Cheapest first
          </li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>
            Most expensive first
          </li>
          <li className='hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md'>
            Highest rated
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
