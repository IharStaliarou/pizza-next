'use client';

import React from 'react';

import { CheckboxFiltersGroup } from '../CheckboxFiltersGroup/CheckboxFiltersGroup';
import { Title } from '../Title/Title';
import { RangeSlider, Input } from '@/components/ui';
import { useFilters, useQueryFilters, useIngredients } from '@/hooks';
import { useRouter } from 'next/navigation';

interface IFilterProps {
  className?: string;
}

export const Filters: React.FC<IFilterProps> = ({ className }) => {
  const router = useRouter();

  const { ingredients, loading } = useIngredients();
  const {
    sizes,
    prices,
    doughTypes,
    selectedIngredients,
    setPrices,
    setSizes,
    setIngredientTypes,
    setDoughTypes,
  } = useFilters();

  useQueryFilters({ sizes, prices, doughTypes, selectedIngredients });

  const items = Array.isArray(ingredients)
    ? ingredients.map((item) => ({
        text: item.name,
        value: String(item.id),
      }))
    : [];

  const updataPrices = (prices: number[]) => {
    setPrices('priceFrom', prices[0]);
    setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        className='mt-5'
        title='Dough types'
        name='doughTypes'
        onClickCheckbox={setDoughTypes}
        selected={doughTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        className='mt-5'
        title='Sizes'
        name='sizes'
        onClickCheckbox={setSizes}
        selected={sizes}
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
            value={String(prices.priceFrom)}
            onChange={(e) => setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            min={100}
            max={5000}
            placeholder='5000'
            value={String(prices.priceTo)}
            onChange={(e) => setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 5000]}
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
        onClickCheckbox={setIngredientTypes}
        selected={selectedIngredients}
      />
    </div>
  );
};
