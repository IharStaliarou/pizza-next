'use client';

import React from 'react';

import {
  FilterCheckbox,
  IFilterCheckboxProps,
} from '../FiltersCheckbox/FiltersCheckbox';
import { Input, Skeleton } from '@/components/ui';

type Item = IFilterCheckboxProps;

interface ICheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  loading?: boolean;
  selected: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<ICheckboxFiltersGroupProps> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  className,
  selected,
  onClickCheckbox,
  loading,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>

        {...Array.from({ length: limit }, (_, index) => (
          <Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
        ))}
        <Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className='bg-gray-50 border-none'
          />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {list.map((item) => (
          <FilterCheckbox
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className='text-primary mt-3'
          >
            {showAll ? 'Hide' : '+ Show more'}
          </button>
        </div>
      )}
    </div>
  );
};
