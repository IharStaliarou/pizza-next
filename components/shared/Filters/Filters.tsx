'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { CheckboxFiltersGroup } from '../CheckboxFiltersGroup/CheckboxFiltersGroup';
import { Title } from '../Title/Title';
import { RangeSlider, Input } from '@/components/ui';
import { useFilters, useQueryFilters, useIngredients } from '@/hooks';

interface IFilterProps {
  className?: string;
}

export const Filters: React.FC<IFilterProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = Array.isArray(ingredients)
    ? ingredients.map((item) => ({
        text: item.name,
        value: String(item.id),
      }))
    : [];

  const updataPrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        className='mt-5'
        title='Dough types'
        name='doughTypes'
        onClickCheckbox={filters.setDoughTypes}
        selected={filters.doughTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        className='mt-5'
        title='Sizes'
        name='sizes'
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 cm', value: '20' },
          { text: '30 cm', value: '30' },
          { text: '40 cm', value: '40' },
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Price range:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={5000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type='number'
            min={100}
            max={5000}
            placeholder='5000'
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 5000,
          ]}
          onValueChange={updataPrices}
        />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Ingredients'
        name='ingredients'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredientTypes}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
