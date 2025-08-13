import React from 'react';

import { FilterCheckbox } from '../FiltersCheckbox/FiltersCheckbox';
import { CheckboxFiltersGroup } from '../CheckboxFiltersGroup/CheckboxFiltersGroup';
import { Title } from '../Title/Title';
import { RangeSlider, Input } from '@/components/ui';

interface IFilterProps {
  className?: string;
}

export const Filters: React.FC<IFilterProps> = ({ className }) => {
  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Can be assembled' value='1' />
        <FilterCheckbox text='New arrivals' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Price range:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={5000}
            defaultValue={0}
          />
          <Input type='number' min={100} max={5000} placeholder='30000' />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Format'
        limit={6}
        defaultItems={[
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
        ]}
      />
    </div>
  );
};
